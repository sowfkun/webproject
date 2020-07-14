const db= require('../database/db');
const injection = require("../check_injection/check_injection")


var select_page = `
SELECT DISTINCT brand_name, serie
FROM product
WHERE product_status= 'active'
ORDER BY serie;

SELECT DISTINCT brand_name FROM product
WHERE product_status='active'
ORDER BY brand_name;

SELECT * FROM other_page WHERE page_type = ? AND status ="active"
`
module.exports.about_us= (req, res) => {     
  
  
  var page = "gioithieu"
  db.query(select_page, page, function(err, result, fields){
    if(err) throw err;
    res.render("other_page", {
      pagename: "Giới thiệu",
      serie: result[0],         
      menu: result[1], 
      content: result[2][0].content
    });
  });
};

module.exports.contact= (req, res) => {     
  var page = "lienhe"
  db.query(select_page, page, function(err, result, fields){
    if(err) throw err;
    res.render("other_page", {
      pagename: "Liên hệ",
      serie: result[0],         
      menu: result[1], 
      content: result[2][0].content
    });
  });
   
};
module.exports.tragop= (req, res) => {     
  var page = "tragop"
  db.query(select_page, page, function(err, result, fields){
    if(err) throw err;
    res.render("other_page", {
      pagename: "Trả góp",
      serie: result[0],         
      menu: result[1], 
      content: result[2][0].content
    });
  });
   
};
module.exports.baohanh= (req, res) => {     
   
  var page = "baohanh"
  db.query(select_page, page, function(err, result, fields){
    if(err) throw err;
    res.render("other_page", {
      pagename: "Bảo hành",
      serie: result[0],         
      menu: result[1], 
      content: result[2][0].content
    });
  });
};
module.exports.vanchuyen= (req, res) => {     
  var page = "vanchuyen"
  db.query(select_page, page, function(err, result, fields){
    if(err) throw err;
    res.render("other_page", {
      pagename: "Vận chuyển",
      serie: result[0],         
      menu: result[1], 
      content: result[2][0].content
    });
  });
   
};
module.exports.thanhtoan= (req, res) => {     
   
  var page = "thanhtoan"
  db.query(select_page, page, function(err, result, fields){
    if(err) throw err;
    res.render("other_page", {
      pagename: "Thanh toán",
      serie: result[0],         
      menu: result[1], 
      content: result[2][0].content
    });
  });
};