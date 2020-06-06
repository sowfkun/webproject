const db= require('../../database/db');


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

SELECT * 
FROM orders
INNER JOIN orderitem
ON orders.order_id = orderitem.order_id
WHERE order_status = ?
ORDER BY orderdate DESC;

SELECT brand_name, serie, ma_sku
FROM product
GROUP BY ma_sku;

`


module.exports.new_transact = function(req,res){
    var status = 'chờ xét duyệt'
    db.query(sql, [status,status], function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact',{
            count : (result[0])[0].count,
            transact: result[1],
            transact_item: result[2],
            product_info: result[3]
        });
    });
};

module.exports.new_confirm = function(req,res){

    var input = JSON.parse(req.body.final_input);

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
        SET order_status = 'Đang giao hàng'
        WHERE order_id = ${order_id};
        `
        db.query(confirm, function (err, result, fields) {
            if (err) throw err;
            console.log('đã xác nhận')
        });
        
    }
    res.redirect('/admin/transact/new');
};




module.exports.confirm_transact = function(req,res){
    
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
    WHERE order_status = 'đang giao hàng'
    ORDER BY orderdate DESC;

    SELECT id, orders.order_id, ma_may, product.discount_price as price, product_id, brand_name, serie, ma_sku
    FROM ((orderitem 
    INNER JOIN orders
    ON orderitem.order_id = orders.order_id) 
    INNER JOIN product 
    ON orderitem.id = product.orderitem_id)
    where orders.order_status = 'đang giao hàng'
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

module.exports.complete_transact = function(req,res){
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact',{
            count : result[0].count
        });
    });
};

module.exports.cancel_transact = function(req,res){
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_transact',{
            count : result[0].count
        });
    });
};