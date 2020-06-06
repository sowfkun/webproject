const db= require('../../database/db');


const sql = `
SELECT DISTINCT brand_name FROM product
ORDER BY brand_name;

SELECT DISTINCT brand_name, serie
FROM product
ORDER BY serie;

SELECT *
FROM product
INNER JOIN catalog
ON product.catalog_id = catalog.catalog_id
WHERE tinh_trang = 'chưa bán'
GROUP BY ma_sku
ORDER BY brand_name; 

SELECT ma_sku, COUNT(ma_sku) As soluong
FROM product
WHERE tinh_trang = 'đã bán'
GROUP BY ma_sku; 

SELECT ma_sku, COUNT(ma_sku) As soluong
FROM product
WHERE tinh_trang = 'chưa bán'
GROUP BY ma_sku; 

SELECT *
FROM catalog;

SELECT COUNT(order_id) AS count 
FROM orders 
WHERE order_status = 'chờ xét duyệt';

SELECT ma_may
FROM (orderitem 
      INNER JOIN product
      ON orderitem.ma_may = product.ma_sku) 
WHERE tinh_trang = 'chưa bán'
group by ma_may;
`
module.exports.ad_product = function(req,res){
    
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_product',{
            title: 'Quản lý sản phẩm',
            brand: result[0],
            serie: result[1],

            keyword: '',
            name: 'Tất cả sản phẩm',
            product: result[2],         //list tất cả
            daban: result[3],
            conlai: result[4],
            inOrder: result[7],
            catalog: result[5],

            count: (result[6])[0].count   //đếm số giao dịch mới
        });
    });
};

module.exports.ad_product_param = (req, res) => {     
  
    var param = req.params.param.toString().toLowerCase();  //route parameter
    
      db.query(sql, function (err, result, fields) {
        if (err) throw err;
        var product =  result[2].filter(function(product) {     // list theo serie
          return (product.serie.toLowerCase() == param) || (product.brand_name.toLowerCase() == param);
        });
  
        res.render('admin_view/admin_product',{
            title: 'Quản lý sản phẩm',
            brand: result[0],
            serie: result[1],

            keyword: '',
            name: param.toUpperCase(),
            product: product,        
            daban: result[3],
            conlai: result[4],
            inOrder: result[7],
            catalog: result[5],

            count: (result[6])[0].count   //đếm số giao dịch mới
        });
    });
  };

  module.exports.ad_product_search = (req, res) => {
    
    var keyword = req.query.keyword;        //lấy keyword từ search
    db.query(sql, function (err, result, fields) {
        if (err) throw err;

        var productSearch =  result[2].filter(function(product) {  //lọc những product theo keyword

          return product.brand_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || 
          product.serie.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
          (keyword.toLowerCase().indexOf(product.brand_name.toLowerCase()) !== -1 && keyword.toLowerCase().indexOf(product.serie.toLowerCase()) !== -1);
        });
        
        res.render('admin_view/admin_product',{
            title: 'Quản lý sản phẩm',
            brand: result[0],
            serie: result[1],

            keyword: keyword,
            name: keyword.toUpperCase(),
            product: productSearch,        
            daban: result[3],
            conlai: result[4],
            inOrder: result[7],
            catalog: result[5],

            count: (result[6])[0].count   //đếm số giao dịch mới
        });
    });
  };
  


  //xóa sản phẩm
  module.exports.ad_product_delete = (req, res) => {
        
     var ma_sku = req.body.ma_sku;

     var checkcart = `
      SELECT orders.order_id as order_id
      FROM ((orderitem 
      INNER JOIN orders
      ON orderitem.order_id = orders.order_id) 
         INNER JOIN product 
         ON orderitem.ma_may = product.ma_sku)
      WHERE ma_sku = ?
      LIMIT 1;
     `
     var deletesql = `
     SET SQL_SAFE_UPDATES=0;
     DELETE FROM product WHERE ma_sku= ?;
     SET SQL_SAFE_UPDATES=1;
     `
     db.query(checkcart,ma_sku, function (err, result, fields) {
      if (err) throw err;
      console.log(deletesql);

      if(result[0] == null){
        db.query(deletesql,ma_sku, function (err, result, fields) {
          if (err) throw err;
           res.redirect('/admin/product');
        });
      } else{
        res.redirect('back');
      }
      
     });
    
  };

    //update sản phẩm
  module.exports.ad_product_update = (req, res) => {
        
   var update = req.body;
  
   if(typeof req.file !== "undefined"){
     update.img = req.file.filename;
   } else {
     update.img = req.body.old_img;
   }
   
   console.log(update);
   var updatesql = `
    SET SQL_SAFE_UPDATES=0;

    UPDATE product
    SET catalog_id = ${parseInt(update.catalog)}, img= '${update.img}', brand_name = '${update.brand}', serie = '${update.serie}', 
    ma_sku = '${update.ma_sku}', price = ${update.price}, discount_price = ${update.dis_price}, cpu = '${update.cpu}',
    gpu = '${update.gpu}', ram = '${update.ram}', ssd = '${update.ssd}', hdd = '${update.hdd}', monitor = '${update.monitor}', 
    webcam = '${update.webcam}', interface = '${update.interface}', connect = '${update.connect}', 
    bluetooth = '${update.bluetooth}', pin = '${update.pin}', os = '${update.os}', color = '${update.color}', 
    weight = '${update.weight}', size = '${update.size}', product_status = '${update.status}'
    WHERE ma_sku = '${update.change}' AND tinh_trang = 'chưa bán';
    
    SET SQL_SAFE_UPDATES=1;
   `
   console.log(updatesql);
   db.query(updatesql, function (err, result, fields) {
    if (err) throw err;
    console.log('update thành công')
    res.redirect(`/admin/product/${update.serie}`);
   
  });
    
 };


//View trang tạo sản phaamr mới
 module.exports.ad_product_create = (req, res) => {
        
  db.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.render('admin_view/admin_product_create',{
      title: 'Thêm sản phẩm',
      catalog: result[5],
      product: result[2],
      mess: '',

      count: (result[6])[0].count   //đếm số giao dịch mới
    });
  });
};


//POST dât để tạo sản phẩm
 module.exports.ad_product_create_post = (req, res) => {
        
  var insert = req.body;
  insert.img = req.file.filename;

  var insertsql = `
  INSERT INTO product (img, catalog_id, brand_name, serie, ma_sku, price, discount_price, 
  cpu, gpu, ram, ssd, hdd, monitor, webcam, interface, connect, bluetooth, pin, os, color, 
  weight, size, product_status, tinh_trang)
  VALUES ('${insert.img}', ${insert.catalog}, '${insert.brand}', '${insert.serie}', '${insert.ma_sku}', ${insert.price}, 
  ${insert.dis_price}, '${insert.cpu}', '${insert.gpu}', '${insert.ram}','${insert.ssd}', '${insert.hdd}', '${insert.monitor}', 
  '${insert.webcam}', '${insert.interface}', '${insert.connect}', '${insert.bluetooth}', '${insert.pin}', '${insert.os}', 
  '${insert.color}', ${insert.weight}, '${insert.size}', '${insert.status}', '${insert.tinh_trang}');

  SELECT *
  FROM catalog;

  SELECT COUNT(order_id) AS count 
  FROM orders 
  WHERE order_status = 'chờ xét duyệt';
  `
  db.query(insertsql, function (err, result, fields) {
    if (err) throw err;
    res.render('admin_view/admin_product_create',{
      title: 'Thêm sản phẩm',
      catalog: result[1],

      mess: 'Thêm sản phẩm thành công',
      count: (result[2])[0].count   //đếm số giao dịch mới
    });
  });
};


//thêm sản phẩm cố sẵn
module.exports.ad_product_create_exist = (req, res) => {
        
  var insert = req.body.product;
  var quant = parseInt(req.body.quantity);
  
  if(quant < 1 ) return;

  var insertsql = `
  INSERT INTO product (img, catalog_id, brand_name, serie, ma_sku, price, discount_price, 
    cpu, gpu, ram, ssd, hdd, monitor, webcam, interface, connect, bluetooth, pin, os, color, 
    weight, size, product_status, tinh_trang)
  SELECT 	img, catalog_id, brand_name, serie, ma_sku, price, discount_price, 
    cpu, gpu, ram, ssd, hdd, monitor, webcam, interface, connect, bluetooth, pin, os, color, 
    weight, size, product_status, tinh_trang
  FROM product
    WHERE ma_sku = ?
  LIMIT 1;
  `


  for (let i = 0; i < quant; i++) {
    db.query(insertsql, insert, function (err, result, fields) {
      if (err) throw err;
      console.log("thêm sản phẩm thành công");
    });
  }  

  var sql = `
  SELECT *
  FROM catalog;

  SELECT COUNT(order_id) AS count 
  FROM orders 
  WHERE order_status = 'chờ xét duyệt';
  
  SELECT *
  FROM product
  INNER JOIN catalog
  ON product.catalog_id = catalog.catalog_id
  GROUP BY ma_sku
  ORDER BY brand_name; 
  `


  db.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.render('admin_view/admin_product_create',{
      title: 'Thêm sản phẩm',
      catalog: result[0],
      product: result[2],

      mess: 'Thêm sản phẩm thành công',
      count: (result[1])[0].count   //đếm số giao dịch mới
    });
  });
};