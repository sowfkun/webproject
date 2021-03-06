const db= require('../database/db');
const injection = require("../check_injection/check_injection");

module.exports.view= (req, res) => {
  
    res.render('shopping_cart',{
        mess: ''
    });
};

module.exports.buy= (req, res) => {     

    var name = injection.checksql_html(req.body.name);
    var phone = injection.checkphone(req.body.phone);
    var email = injection.checkemail(req.body.email);
    var address = injection.checksql_html(req.body.address);
    if(req.body.note == "") {
        var note = ""
    } else {
        var note = injection.checksql_html(req.body.note);
    }
    console.log(req.body.item);
    var item = injection.checksql_html(req.body.item);

    //check if injection == true => return
    if( name == true || phone == true || email == true || address ==true || note == true || item == true){
         res.redirect('back');
         return;
    }

    var item = JSON.parse(item);
    var total_price = getprice(item);

        function getprice(item){        // tính tổng giá trị đơn hàng
            var total_price = 0;
            for(let i = 0; i < item.length; i++){
                if(item[i].event == ""){
                    var discount = 0;
                } else {
                    var discount = parseInt((item[i].event).split("_/")[1]);
                }
         
                total_price += (item[i].price * item[i].quantity) - (discount * item[i].quantity);
            }
            return total_price;
        };

    var insertOrders;
    if(res.locals.user_id>0){       // nếu là đã đăng kí tài khoản thì có userid
        insertOrders=`
        INSERT INTO orders (fullname, user_id, phone, email, address, note, total_price, order_status, orderdate )
        VALUES('${name}','${res.locals.user_id}','${phone}','${email}','${address}','${note}','${total_price}','Chờ xét duyệt', current_timestamp)
        `
    } else{                     //nếu không thì không cho id vào
        insertOrders=`              
        INSERT INTO orders (fullname, phone, email, address, note, total_price, order_status, orderdate )
        VALUES('${name}','${phone}','${email}','${address}','${note}','${total_price}','Chờ xét duyệt', current_timestamp)
        `
    }
    db.query(insertOrders, function (err, result, fields) {
        if (err) throw err;
        var orderId = result.insertId;      // tạo order và get id order
        
        for(let i = 0; i < item.length; i++){
            
            if(item[i].event == ""){
                var event_id = null;
                var discount = 0;
            } else {
                var event_id = parseInt((item[i].event).split("_/")[0]);
                var discount = parseInt((item[i].event).split("_/")[1]);
            }
            var insertOrderitem=`               
            INSERT INTO orderitem (order_id, ma_may, quantity, price_per_1, event_id, discount_from_event)
            VALUES('${orderId}','${item[i].ma_may}','${item[i].quantity}',${item[i].price}, ${event_id}, ${discount} )
            `
            console.log(insertOrderitem)
            db.query(insertOrderitem, function (err, result, fields) {      // tạo orderitem
                if (err) throw err;
                console.log('mua hàng thành công');
                res.render('shopping_cart',{
                    mess: 'mua xong, xóa order'
                });

            });
        }
    });

}
    
 var userHistory = `SELECT *
 FROM orders
 WHERE user_id = ? AND order_status = ?
 ORDER BY finishdate DESC;
 
SELECT id, orders.order_id, ma_may, price_per_1 as price, discount_from_event as discount, event_id, quantity, user_id, 
fullname, phone, address, orderdate, finishdate, total_price, brand_name, serie, img, cpu, gpu, ram, ssd, hdd
FROM ((orderitem 
INNER JOIN orders
ON orderitem.order_id = orders.order_id) 
INNER JOIN product 
ON orderitem.id = product.orderitem_id)
WHERE user_id = ? AND orders.order_status = ? AND tinh_trang = "đã bán"
GROUP BY id;

SELECT event_id, title 
FROM event
WHERE status = "đang diễn ra";
`

module.exports.history= (req, res) => {
  
    var user_id = res.locals.user_id;

    if((user_id == "" || isNaN(user_id) == true ) && user_id !== 0){
         res.redirect('/');
         return;
    }
    var status = 'giao dịch hoàn tất';
   
    if(user_id >0){
        db.query(userHistory,[user_id, status, user_id, status], function (err, result, fields) {
            if (err) throw err;
            if(result[0].length){
                var mess = '';
            }else {
                var mess ='Bạn chưa có lịch sử giao dịch. Tìm sản phẩm?'
            }            
            res.render('shopping_history',{
                mess: mess,  
                whichBtn: 'history',
                orders: result[0],
                item: result[1],
                event: result[2]
             });
        });
    } else {
        res.render('shopping_history',{
            mess: "Vui lòng đăng nhập để xem lịch sử giao dịch",  
            whichBtn: 'history',
            orders: [] ,
            item:[]
         });
    }
};


var userdealing = `
SELECT *
FROM orders
WHERE user_id = ? AND (order_status = 'Chờ xét duyệt' or order_status = 'Đang giao hàng');

SELECT distinct id, orders.order_id, ma_may, price_per_1 as price, discount_from_event as discount, event_id, quantity,
user_id, fullname, phone, address, orderdate, finishdate, total_price, brand_name, serie, img, cpu, gpu, ram, ssd, hdd
FROM ((orderitem 
      INNER JOIN orders
      ON orderitem.order_id = orders.order_id) 
         INNER JOIN product 
         ON orderitem.ma_may = product.ma_sku)
WHERE user_id = ? AND (orders.order_status = 'Chờ xét duyệt' OR orders.order_status = 'Đang giao hàng') AND tinh_trang = "chưa bán" ;

SELECT event_id, title 
FROM event
WHERE status = "đang diễn ra";
`
module.exports.dealing= (req, res) => {
  
    var user_id = res.locals.user_id;

    if((user_id == "" || isNaN(user_id) == true ) && user_id !== 0){
        res.redirect('/');
        return;
    }
    if(user_id >0){
        db.query(userdealing,[user_id, user_id], function (err, result, fields) {
            if (err) throw err;

            console.log(result[1]);
            if(result[0].length){
                var mess = '';
            }else {
                var mess ='Bạn chưa có giao dịch. Tìm sản phẩm?'
            }
             res.render('shopping_history',{
                 mess: mess,
                 whichBtn: 'dealing',
                 orders: result[0],
                 item: result[1],
                 event: result[2]
             });
        });
    } else{
        res.render('shopping_history',{
            mess: "Vui lòng đăng nhập để xem lịch sử giao dịch", 
            whichBtn: 'dealing',
            orders: [],
            item: []
        });
    }

};


var deleteOrder = `
DELETE FROM orderitem
WHERE order_id = ?;

DELETE FROM orders
WHERE order_id = ?;
`
module.exports.dealingPost= (req, res) => {     //xóa đơn hàng
  
    var order_id = req.body.orderid
    if( order_id == "" || isNaN(order_id) == true){
        res.redirect('/');
        return;
    }
        db.query(deleteOrder,[order_id, order_id], function (err, result, fields) {
            if (err) throw err;
             res.redirect('/shopping/dealing');
        });
    
};