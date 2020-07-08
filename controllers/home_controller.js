const db= require('../database/db');

const sql = `
SELECT * FROM catalog WHERE status = "active";

SELECT *
FROM product
WHERE product_status='active' AND tinh_trang = 'chưa bán'
GROUP BY ma_sku
ORDER BY brand_name;

SELECT DISTINCT brand_name, serie 
FROM product
WHERE product_status='active'
ORDER BY serie;

SELECT DISTINCT brand_name from product
WHERE product_status='active'
ORDER BY brand_name;

SELECT *
FROM event
WHERE status='Đang diễn ra' OR status="sắp diễn ra";


`
module.exports.index = function(req, res) {
    
    db.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.render('home', {
        title : 'LapCity Trang Chủ',
        pagename: 'Trang chủ',
        
        catalog: result[0],
        product: result[1],
        
        serie: result[2],         //query thương hiêu và dòng sản phẩm
        menu: result[3],           //query các thương hiệu

        event: result[4]          //chọn các chương trình khuyến mãi đang hoặc sắp diễn ra
      });
    });
}

