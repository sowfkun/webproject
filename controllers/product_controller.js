const db= require('../database/db');
const injection = require("../check_injection/check_injection");
const con = require('../database/db');

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
    WHERE serie = ? AND ma_sku = ? AND tinh_trang = 'chưa bán'
    LIMIT 1;
    
    SELECT *
    FROM event
    WHERE (status='đang diễn ra')
    ORDER BY date_start DESC;

    SELECT COUNT(ma_sku) AS conlai
    FROM product
    WHERE tinh_trang = 'chưa bán' AND ma_sku = ?;
    `

// tất cả sản phẩm
module.exports.product_all =(req, res) => {     
  
    db.query(sql,[0,1,2,3,4], function (err, result, fields) {
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
  
  var brand = injection.checksql_html(req.params.brand.toLowerCase());  //route parameter

  //check injection == true => return
  if( brand == true ){
     res.redirect('back');
     return;
  }

    db.query(sql,[0,1,2,3,4], function (err, result, fields) {
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
  
  var brand= injection.checksql_html(req.params.brand.toLowerCase());
  var serie = injection.checksql_html(req.params.serie.toLowerCase());  //route parameter

  if( brand == true || serie == true){
     res.redirect('back');
     return;
  }
    db.query(sql,[0,1,2,3,4], function (err, result, fields) {
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

    var brand= injection.checksql_html(req.params.brand.toLowerCase());
    var serie = injection.checksql_html(req.params.serie.toLowerCase());
    var ma_sku = injection.checksql_html(req.params.ma_sku.toLowerCase());  //route parameter

    if( brand == true || serie == true || ma_sku == true){
       res.redirect('back');
       return;
    }
  
      db.query(sql,[serie, ma_sku, serie, brand, ma_sku], function (err, result, fields) {
        if (err) throw err;
        var productdetail =  result[3].filter(function(product) {  //lọc những product theo serie
          return product.ma_sku.toLowerCase() == ma_sku ;
        });
        
        var productSame =  result[2].filter(function(product) {  //lọc những product theo serie
          return (product.serie.toLowerCase() == serie  & product.ma_sku.toLowerCase() !=ma_sku);
        });

        //search event for product
        var event = result[4];
        var final_event = [];
        for(let i=0; i< event.length; i++){
          var brandlist = event[i].brand_name.split("-");
          var serielist = event[i].serie.split("-");

          if(brandlist.indexOf(req.params.brand) !== -1 || serielist.indexOf(req.params.serie) !== -1){
            final_event.push(event[i]);
          };
        }

        //tìm event giảm giá cao nhất
        if(final_event.length != 0){
          var max_event = final_event[0].discount;
          var index = 0;
  
          for(let i = 1; i<final_event.length; i++){
            if(max_event < final_event[i].discount){
              max_event = final_event[i].discount;
              index = i;
            }
          }
        }


        console.log(final_event[index]);
        res.render('product_detail', {
          title : "LapCity",
          pagename: brand.toUpperCase() + ' ' + serie.toUpperCase(),
          
          serie: result[0],       //tìm những dòng sản phẩm khác nhau để truyền vào menu
          menu: result[1],        // tìm các thương hiệu khác nhau
          product: productdetail,
          productSame: productSame,

          event: final_event[index],
          conlai: (result[5])[0].conlai
          
        });
    });
  };


 
