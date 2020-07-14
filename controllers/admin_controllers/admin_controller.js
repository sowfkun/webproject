
const db= require('../../database/db');
var sql = `
SELECT COUNT(order_id) AS count 
FROM orders 
WHERE order_status = 'chờ xét duyệt';

select t1.*, t2.* from  (SELECT brand_name, count(brand_name) as total  from product GROUP BY brand_name) as t1,
(SELECT brand_name as br, COUNT(brand_name) as non_saled 
FROM product
WHERE tinh_trang = 'chưa bán' GROUP BY brand_name) as t2 where t1.brand_name = t2.br;

`

module.exports.admin_home = (req,res) => {
 
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        console.log(result);
        res.render('admin_view/admin_dashboard',{
            count : (result[0])[0].count,
            Saled_report: (result[1]),
        });
    });
}