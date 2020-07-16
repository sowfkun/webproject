
const db= require('../../database/db');
var sql = `
SELECT COUNT(order_id) AS count 
FROM orders 
WHERE order_status = 'chờ xét duyệt';

select t1.*, t2.*, t3.* from  (SELECT brand_name, count(brand_name) as total  from product GROUP BY brand_name) as t1,
(SELECT brand_name as br, COUNT(brand_name) as non_saled 
FROM product
WHERE tinh_trang = 'chưa bán' GROUP BY brand_name) as t2,
(select brand_name, sum(orderitem.price_per_1 - discount_from_event) as sum
from orderitem right join product on orderitem.id = product.orderitem_id
group by brand_name) as t3 where t1.brand_name = t2.br and t1.brand_name = t3.brand_name and t2.br = t3.brand_name;

`

module.exports.admin_home = (req,res) => {
 
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        var sum_money = 0;
        result[1].forEach(element => {
            sum_money += element.sum;
        });
        res.render('admin_view/admin_dashboard',{
            count : (result[0])[0].count,
            Saled_report: (result[1]),
            sum_money: sum_money,
        });
    });
}