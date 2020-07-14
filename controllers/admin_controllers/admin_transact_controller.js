const db= require('../../database/db');
const injection = require("../../check_injection/check_injection");
const con = require('../../database/db');

var sql = `
SELECT COUNT(order_id) AS count 
FROM orders 
WHERE order_status = 'chờ xét duyệt';

SELECT * 
FROM orders
INNER JOIN orderitem
ON orders.order_id = orderitem.order_id
WHERE order_status = ?
GROUP BY orders.order_id
ORDER BY orderdate DESC;

SELECT orders.order_id, user_id, price_per_1, id, ma_may, discount_from_event, quantity, event_id
FROM orders
INNER JOIN orderitem
ON orders.order_id = orderitem.order_id
WHERE order_status = "chờ xét duyệt";

SELECT brand_name, serie, ma_sku
FROM product
GROUP BY ma_sku;

SELECT event_id, title 
FROM event
WHERE status = "đang diễn ra";
`

//hiển thị giao dịch mới
module.exports.new_transact = function(req,res){
    var status = 'chờ xét duyệt'
    db.query(sql, [status,status], function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact',{
            count : (result[0])[0].count,
            transact: result[1],
            transact_item: result[2],
            product_info: result[3],
            event: result[4]
        });
    });
};

// xác nhận giao dịch mới
module.exports.new_confirm = function(req,res){

    var input = injection.checksql_html(req.body.final_input);

    if(input == true){
         res.redirect('back');
         return;
    }

    input = JSON.parse(input);
    console.log(input);

    //kiểm tra id nhập vào có bị trùng không
    var flag = 0;
    for (let i = 0; i < input.length; i++) {
        for(let j = input.length - 1; j > i; j--){
            var a = JSON.parse(input[i]);
            var b = JSON.parse(input[j]);
            console.log(a);
            console.log(b);
            if(a.product_id == b.product_id ){
                flag = 1;
                break;
            }
        }
    };
    if(flag == 1){
        console.log("Có 2 id nhập vào bị trùng");
        res.redirect('back');
        return;
    } 
    
    // lấy thông tin sản phẩm để so sánh với thông tin nhập vào
    db.query('SELECT ma_sku, product_id FROM product WHERE tinh_trang = "chưa bán"', function(err, result, fields){
        if(err) throw err;
        
        //kiểm tra xem id nhập vào có phải thuộc mã máy cần bán hay không
        for (let i = 0; i < input.length; i++) {
            var flag = 0; //không tìm thấy
            var item = JSON.parse(input[i]);
            var product_id = parseInt(item.product_id);
            var ma_may = item.ma_may;
            for(let j =0; j < result.length; j++){
                if(product_id == result[j].product_id && ma_may == result[j].ma_sku){
                    flag = 1; //tìm thấy
                    break;
                } 
            }
            // nếu có một input không hợp lệ thì báo lỗi
            if(flag == 0){
                console.log(`id thứ ${i} không khớp`);
                res.redirect('back');
                return;
            } else{
                console.log(`id thứ ${i} trùng khớp`);
            }
        }
      
        //các input đã hợp lệ
        for (let i = 0; i < input.length; i++) {
            var item = JSON.parse(input[i]);
            
            var order_id = parseInt(item.order_id);
            var orderitem_id = parseInt(item.orderitem_id);
            var product_id = parseInt(item.product_id);
            
            var confirm = `
            UPDATE product 
            SET orderitem_id =  ${orderitem_id}
            WHERE product_id = ${product_id};
            
            UPDATE orders
            SET order_status = 'Đang giao hàng', finishdate = current_timestamp 
            WHERE order_id = ${order_id};  `

            db.query(confirm,function( err, result, fields){
                if(err) throw err;
                console.log("Giao dịch được xác nhận")
            });
        }
        res.redirect('back');
    });
};


// hiển thị giao dịch đang giao hàng
module.exports.transact_delivering = function(req,res){
    
    var confirmsql = `
    SELECT COUNT(order_id) AS count 
    FROM orders 
    WHERE order_status = 'chờ xét duyệt';

    SELECT * 
    FROM orders
    WHERE order_status = 'đang giao hàng'
    ORDER BY orderdate DESC;

    SELECT * 
    FROM orders
    INNER JOIN orderitem
    ON orders.order_id = orderitem.order_id
    WHERE order_status = "đang giao hàng";

    SELECT id, orders.order_id, event_id, discount_from_event, ma_may, price_per_1, product_id, brand_name, serie, ma_sku
    FROM ((orderitem 
    INNER JOIN orders
    ON orderitem.order_id = orders.order_id) 
    INNER JOIN product 
    ON orderitem.id = product.orderitem_id)
    where orders.order_status = 'đang giao hàng';

    SELECT brand_name, serie, ma_sku
    FROM product
    GROUP BY ma_sku;

    SELECT event_id, title 
    FROM event
    WHERE status = "đang diễn ra";
    `
   
    db.query(confirmsql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact_confirm',{
            count: (result[0])[0].count,
            transact: result[1],
            transact_item: result[2],
            item_info: result[3],
            product_info: result[4],
            event: result[5]
        });
    });
};

// xác nhận đã giao hàng
module.exports.confirm_delivered = function(req,res){

    var order_id = parseInt(req.body.order_id);
    var orderitem_id = req.body.orderitem_id;
    
    console.log(typeof orderitem_id);
    if(isNaN(order_id) == true){
         res.redirect('back');
         return;
    }
    
    var confirm = `UPDATE orders 
    SET order_status = "Giao dịch hoàn tất", finishdate = current_timestamp
    WHERE order_id = ?;
    `
    db.query(confirm, [order_id], function(err, result, fields) {
        if (err) throw err;
        console.log('đã giao dịch thành công')
    });

    var confirm_product =`
    UPDATE product 
    SET tinh_trang = 'đã bán'
    WHERE orderitem_id = ?;
    `

    if(typeof orderitem_id == "object"){
        for(let i = 0; i<orderitem_id.length; i++){
            db.query(confirm_product, parseInt(orderitem_id[i]), function(err, result, fields) {
                if (err) throw err;
                console.log('update tinh trạng đã bán')
            });
        }
    } else{
        db.query(confirm_product, parseInt(orderitem_id), function(err, result, fields) {
            if (err) throw err;
            console.log('update tinh trạng đã bán')
        });
    }
   
    res.redirect('back');
};


//hiển thị giao dịch đã hoàn tất
module.exports.complete_transact = function(req,res){
    
    var confirmsql = `
    SELECT COUNT(order_id) AS count 
    FROM orders 
    WHERE order_status = 'chờ xét duyệt';

    SELECT * 
    FROM orders
    WHERE order_status = 'giao dịch hoàn tất'
    ORDER BY orderdate DESC;

    SELECT * 
    FROM orders
    INNER JOIN orderitem
    ON orders.order_id = orderitem.order_id
    WHERE order_status = "giao dịch hoàn tất";

    SELECT id, orders.order_id, event_id, discount_from_event, ma_may, price_per_1, product_id, brand_name, serie, ma_sku
    FROM ((orderitem 
    INNER JOIN orders
    ON orderitem.order_id = orders.order_id) 
    INNER JOIN product 
    ON orderitem.id = product.orderitem_id)
    where orders.order_status = 'giao dịch hoàn tất';

    SELECT brand_name, serie, ma_sku
    FROM product
    GROUP BY ma_sku;

    SELECT event_id, title 
    FROM event
    WHERE status = "đang diễn ra";
    `
   
    db.query(confirmsql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact_confirm',{
            count: (result[0])[0].count,
            transact: result[1],
            transact_item: result[2],
            item_info: result[3],
            product_info: result[4],
            event: result[5]
        });
    });
};

//hủy giao dịch
module.exports.cancel_transact = function(req,res){

    var order_id = req.body.order_id;
    
    if(isNaN(order_id) == true){
         res.redirect('back');
         return;
    }

    var cancel = `UPDATE orders 
    SET order_status = "giao dịch bị hủy", finishdate = current_timestamp 
    WHERE order_id = ?;
    
    SELECT id
    FROM orderitem 
    WHERE order_id = ?;
    `
    
    db.query(cancel, [order_id, order_id], function(err, result, fields) {
        if (err) throw err;
        console.log('đã hủy giao dịch')

        for(let i = 0; i< result[1].length; i++){

            var updateproduct = `
            UPDATE product
            SET orderitem_id = null, tinh_trang = "chưa bán"
            WHERE orderitem_id = ?
            `
            db.query(updateproduct, (result[1])[i].id, function(err, result, fields){
                if(err) throw err;
                console.log("đã xóa sản phẩm khỏi đơn hàng");
            });
        }
    });

     res.redirect('back');
};

//hiển thị giao dịch bị hủy
module.exports.cancel_transact_show = function(req,res){
    var confirmsql = `
    SELECT COUNT(order_id) AS count 
    FROM orders 
    WHERE order_status = 'chờ xét duyệt';

    SELECT * 
    FROM orders
    WHERE order_status = 'giao dịch bị hủy'
    ORDER BY orderdate DESC;

    SELECT * 
    FROM orders
    INNER JOIN orderitem
    ON orders.order_id = orderitem.order_id
    WHERE order_status = 'giao dịch bị hủy'
    ORDER BY orderdate DESC;

    SELECT id, orders.order_id, ma_may, product.discount_price as price, product_id, brand_name, serie, ma_sku
    FROM ((orderitem 
    INNER JOIN orders
    ON orderitem.order_id = orders.order_id) 
    INNER JOIN product 
    ON orderitem.id = product.orderitem_id)
    where orders.order_status = 'giao dịch bị hủy';
    
    SELECT brand_name, serie, ma_sku
    FROM product
    GROUP BY ma_sku;
    `
   
    db.query(confirmsql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact_confirm',{
            count: (result[0])[0].count,
            transact: result[1],
            transact_item: result[2],
            item_info: result[3],
            product_info: result[4]
        });
    });
};