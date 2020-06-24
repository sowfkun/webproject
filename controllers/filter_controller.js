const db= require('../database/db');
const injection = require("../check_injection/check_injection");

const sql = `SELECT DISTINCT brand_name, serie
    FROM product
    WHERE product_status= 'active'
    ORDER BY serie;

    SELECT DISTINCT brand_name FROM product
    WHERE product_status='active'
    ORDER BY brand_name;
    
    SELECT brand_name, serie, img, ma_sku, cpu, gpu, ssd, hdd, ram, monitor, discount_price
    FROM product
    WHERE product_status='active'
    GROUP BY ma_sku
    ORDER BY serie;
    
    `


module.exports.filter=function(req, res) {
  
  var brand = injection.checksql_html(req.body.brand);
  var cpu = injection.checksql_html(req.body.cpu);
  var ram = injection.checksql_html(req.body.ram);
 
  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    var productFilter =  result[2].filter(function(product) {  //lọc những product theo serie
      return product.brand_name.toLowerCase().indexOf(brand.toLowerCase()) !== -1 &&
      product.ram.toLowerCase().indexOf(ram.toLowerCase()) !== -1 &&
      product.cpu.toLowerCase().indexOf(cpu.toLowerCase()) !== -1 ;
    });
    if(productFilter.length == 0){
      searchMess = "Không tìm thấy sản phẩm"
    } else {
      searchMess = ""
    }
    
    res.render('product_list', {
      title : 'Lapcity',
      pagename: "Kết quả lọc",
      searchMess: searchMess,
      serie: result[0],       //tìm những dòng sản phẩm khác nhau để truyền vào menu
      menu: result[1],        // tìm các thương hiệu khác nhau
      product: productFilter      
    });
});
 
}
