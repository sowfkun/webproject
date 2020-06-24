const db= require('../database/db');

const sql = `SELECT *
FROM product
WHERE catalog_id = (SELECT catalog_id 
					          FROM catalog 
                    WHERE name='gaming' ) AND product_status='active' AND tinh_trang = 'chưa bán'
GROUP BY ma_sku;

SELECT *
FROM product
WHERE catalog_id = (SELECT catalog_id 
					FROM catalog 
                    WHERE name='văn phòng' ) AND product_status='active' AND tinh_trang = 'chưa bán'
GROUP BY ma_sku;

SELECT *
FROM product
WHERE catalog_id = (SELECT catalog_id 
					FROM catalog 
                    WHERE name='sinh viên' ) AND product_status='active' AND tinh_trang = 'chưa bán'
GROUP BY ma_sku;

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


module.exports.index=function(req, res) {
    

    db.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.render('home', {
        title : 'LapCity Trang Chủ',
        pagename: 'Trang chủ',
        
        gaming: result[0],        //query list laptop gaming
        vanphong: result[1],      //query list laptop vanphong
        sinhvien: result[2],      //query list laptop sinh viên
        
        serie: result[3],         //query thương hiêu và dòng sản phẩm
        menu: result[4],           //query các thương hiệu

        event: result[5]          //chọn các chương trình khuyến mãi đang hoặc sắp diễn ra
      });
  });
}

