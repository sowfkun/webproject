const db= require('../database/db');


// biến lưu các query
const sql = `SELECT DISTINCT brand_name, serie
    FROM product
    WHERE product_status= 'active'
    ORDER BY serie;

    SELECT DISTINCT brand_name FROM product
    WHERE product_status='active'
    ORDER BY brand_name;
    
    SELECT DISTINCT brand_name, serie, img, ma_sku, cpu, gpu, ssd, hdd, ram, monitor, discount_price
    FROM product
    WHERE product_status='active' AND tinh_trang = 'chưa bán'
    GROUP BY ma_sku
    ORDER BY brand_name;
    
    SELECT *
    FROM product
    WHERE serie = ? AND ma_sku =? AND tinh_trang = 'chưa bán'
    LIMIT 1;
    
    SELECT *
    FROM event
    WHERE  (brand_name ='tất cả' OR serie = ? OR brand_name =? ) AND (status='đang diễn ra' OR status='Sắp diễn ra')
    ORDER BY date_start DESC;
    `

// tất cả sản phẩm
module.exports.product_all =(req, res) => {     
  
 
    db.query(sql,[0,1,2,3], function (err, result, fields) {
      if (err) throw err;
      
      res.render('product_list', {
        title : "LapCity",
        pagename: 'Tất cả sản phẩm',
        searchMess: "",

        serie: result[0],       //tìm những dòng sản phẩm khác nhau để truyền vào menu
        menu: result[1],  
              // tìm các thương hiệu khác nhau
        product: result[2]   //các sản phẩm cùng thườn hiệu     
      });
  });
};


//sản phẩm theo thương hiệu
module.exports.product_brand = (req, res) => {     
  
  var brand = req.params.brand.toString().toLowerCase();  //route parameter
    db.query(sql,[0,1,2,3], function (err, result, fields) {
      if (err) throw err;
      var productbrand =  result[2].filter(function(product) {  //lọc những product theo serie
        return product.brand_name.toLowerCase() == brand;
      });

      res.render('product_list', {
        title : "LapCity",
        pagename: brand.toUpperCase(),
        searchMess: "",
        serie: result[0],       //tìm những dòng sản phẩm khác nhau để truyền vào menu
        menu: result[1],        // tìm các thương hiệu khác nhau
        product: productbrand   //các sản phẩm cùng thườn hiệu     
      });
  });
};


//sản phẩm theo serie
module.exports.product_serie= (req, res) => {     
  
  var brand= req.params.brand.toString().toLowerCase()
  var serie = req.params.serie.toString().toLowerCase();  //route parameter
    db.query(sql,[0,1,2,3], function (err, result, fields) {
      if (err) throw err;
      var productSerie =  result[2].filter(function(product) {  //lọc những product theo serie
        return (product.serie.toLowerCase() == serie & product.brand_name.toLowerCase() == brand);
      });
      
      res.render('product_list', {
        title : "LapCity",
        pagename: brand.toUpperCase() +' '+ serie.toUpperCase(),
        searchMess: "",

        serie: result[0],       //tìm những dòng sản phẩm khác nhau để truyền vào menu
        menu: result[1],        // tìm các thương hiệu khác nhau
        product: productSerie     
      });
  });
};

  //thông tin một máy cụ thể
  module.exports.product_detail= (req, res) => { 

    var brand= req.params.brand.toString().toLowerCase();
    var serie = req.params.serie.toString().toLowerCase();
    var ma_sku = req.params.ma_sku.toString().toLowerCase();  //route parameter
  
      db.query(sql,[serie,ma_sku,serie,brand], function (err, result, fields) {
        if (err) throw err;
        var productdetail =  result[3].filter(function(product) {  //lọc những product theo serie
          return product.ma_sku.toLowerCase() == ma_sku ;
        });
        
        var productSame =  result[2].filter(function(product) {  //lọc những product theo serie
          return (product.serie.toLowerCase() == serie  & product.ma_sku.toLowerCase() !=ma_sku);
        });

        res.render('product_detail', {
          title : "LapCity",
          pagename: brand.toUpperCase() + ' ' + serie.toUpperCase(),
          
          serie: result[0],       //tìm những dòng sản phẩm khác nhau để truyền vào menu
          menu: result[1],        // tìm các thương hiệu khác nhau
          product: productdetail,
          productSame: productSame,

          event: result[4]
          
        });

        console.log(res.locals.orderid);
    });
  };


 
