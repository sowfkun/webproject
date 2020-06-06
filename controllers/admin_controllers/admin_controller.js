const db= require('../../database/db');


var sql = `
SELECT COUNT(order_id) AS count 
FROM orders 
WHERE order_status = 'chờ xét duyệt';`
module.exports.admin_home = function(req,res){
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].count);
        res.render('admin_view/admin_menu',{
            count : result[0].count
        });
    });
};