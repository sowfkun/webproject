const db= require('../database/db');
const injection = require("../check_injection/check_injection")

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
module.exports.search= (req, res) => {     
   
    var keyword = req.query.keyword;        //lấy keyword từ search

    //kiểm tra lại dữ liệu nhập vào
    if(injection.checksql_html(keyword) == true){
       res.redirect('back');
       return;
    }

    console.log(keyword);
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        var productSearch =  result[2].filter(function(product) {  //lọc những product theo serie

          return product.brand_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || 
          product.serie.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
          (keyword.toLowerCase().indexOf(product.brand_name.toLowerCase()) !== -1 && keyword.toLowerCase().indexOf(product.serie.toLowerCase()) !== -1);
        });

        if(productSearch.length == 0){
          searchMess = "Không tìm thấy sản phẩm"
        } else {
          searchMess = ""
        }
        console.log(productSearch);
        res.render('product_list', {
          title : "LapCity: Tìm kíếm",
          pagename: keyword.toUpperCase(),
          searchMess: searchMess,
  
          serie: result[0],       //tìm những dòng sản phẩm khác nhau để truyền vào menu
          menu: result[1],        // tìm các thương hiệu khác nhau
          product: productSearch   //các sản phẩm cùng thườn hiệu     
        });
    });
};