const db= require('../../database/db');
const injection = require("../../check_injection/check_injection");

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

SELECT orders.order_id, user_id, fullname, phone, address, note, orderdate, finishdate, 
price_per_1, id, ma_may, brand_name, serie, product_id, discount_from_event, quantity, event_id
FROM ((orders
INNER JOIN orderitem
ON orders.order_id = orderitem.order_id)
INNER JOIN product
ON orderitem.ma_may = product.ma_sku)
WHERE order_status = ?
GROUP BY ma_may;

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

     //kiểm tra xem id nhập vào có phải thuộc mã máy cần bán hay không
    var check_ma_may_id = `
    select product_id, ma_sku 
    from product;
            `

    for (let i = 0; i < input.length; i++) {
        var item = JSON.parse(input[i]);
        
        var order_id = parseInt(item.order_id);
        var orderitem_id = parseInt(item.orderitem_id);
        var product_id = parseInt(item.product_id);
       
        var confirm = `
        UPDATE product 
        SET orderitem_id =  ${orderitem_id}, tinh_trang = 'đã bán'
        WHERE product_id = ${product_id};
        
        UPDATE orders
        SET order_status = 'Đang giao hàng', finishdate = current_timestamp 
        WHERE order_id = ${order_id};
        `
        db.query(confirm, function (err, result, fields) {
            if (err) throw err;
            console.log('đã xác nhận')
        });
        
    }
    res.redirect('/admin/transact/new');
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

    SELECT orders.order_id, user_id, fullname, phone, address, note, orderdate, finishdate, 
    price_per_1, id, ma_may, brand_name, serie, product_id, discount_from_event, quantity, event_id
    FROM ((orders
    INNER JOIN orderitem
    ON orders.order_id = orderitem.order_id)
    INNER JOIN product
    ON orderitem.ma_may = product.ma_sku)
    WHERE order_status = "đang giao hàng"
    GROUP BY ma_may;

    SELECT id, orders.order_id, event_id, discount_from_event, ma_may, price_per_1, product_id, brand_name, serie, ma_sku
    FROM ((orderitem 
    INNER JOIN orders
    ON orderitem.order_id = orders.order_id) 
    INNER JOIN product 
    ON orderitem.id = product.orderitem_id)
    where orders.order_status = 'đang giao hàng';

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
            event: result[4]
        });
    });
};

// xác nhận đã giao hàng
module.exports.confirm_delivered = function(req,res){

    var order_id = req.body.order_id;
    
    if(isNaN(order_id) == true){
         res.redirect('back');
         return;
    }

    var confirm = `UPDATE orders 
    SET order_status = "Giao dịch hoàn tất", finishdate = current_timestamp 
    WHERE order_id = ?`
    
    db.query(confirm, order_id, function(err, result, fields) {
        if (err) throw err;
        console.log('đã giao dịch thành công')
    });

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

    SELECT orders.order_id, user_id, fullname, phone, address, note, orderdate, finishdate, 
    price_per_1, id, ma_may, brand_name, serie, product_id, discount_from_event, quantity, event_id
    FROM ((orders
    INNER JOIN orderitem
    ON orders.order_id = orderitem.order_id)
    INNER JOIN product
    ON orderitem.ma_may = product.ma_sku)
    WHERE order_status = "giao dịch hoàn tất"
    GROUP BY ma_may;

    SELECT id, orders.order_id, event_id, discount_from_event, ma_may, price_per_1, product_id, brand_name, serie, ma_sku
    FROM ((orderitem 
    INNER JOIN orders
    ON orderitem.order_id = orders.order_id) 
    INNER JOIN product 
    ON orderitem.id = product.orderitem_id)
    where orders.order_status = 'giao dịch hoàn tất';

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
            event: result[4]
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
    where orders.order_status = 'giao dịch bị hủy'
    `
   
    db.query(confirmsql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact_confirm',{
            count: (result[0])[0].count,
            transact: result[1],
            transact_item: result[2],
            item_info: result[3]
        });
    });
};