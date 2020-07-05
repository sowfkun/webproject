const db= require('../../database/db');
const injection = require("../../check_injection/check_injection");

var sql = `
SELECT COUNT(order_id) AS count 
FROM orders 
WHERE order_status = 'chờ xét duyệt';

SELECT DISTINCT brand_name 
FROM product
WHERE product_status = "active";

SELECT DISTINCT brand_name , serie 
FROM product
WHERE product_status = "active";
`
module.exports.new_event = function(req,res){
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_event',{
            count : result[0].count,
            serie: result[2],
            brand: result[1]
        });
    });
};

module.exports.event_create = function(req,res){
    var event = req.body;

    console.log(event);
    var img = req.file.filename;
    var title = injection.checksql_html(event.title);
    var url = injection.checksql_html(event.URL);

    var brand = event.brand;
    var serie = event.series;
    
    console.log(typeof brand);
    console.log(typeof serie)
    if(typeof brand == "undefined"){
        var final_brand = "";
    } else if(typeof brand == "string"){
        var final_brand = brand + "-";
    } else {
        var final_brand = ""
        for(let i = 0; i< brand.length; i++){
            final_brand += brand[i] + "-"
        }
    }
        
    if(typeof serie == "undefined"){
        var final_serie = ""
    } else if(typeof serie == "string") {
        var final_serie = serie + "-";
    } else{
        var final_serie = ""
        for(let i = 0; i<serie.length; i++){
            final_serie += serie[i] + "-"
        }
    }
    
    var gift = event.final_gift;
    if(gift == ""){
        var final_gift = true;
    } else {
        gift = gift.split(",");
        var final_gift = "";
        for(let i = 0; i<gift.length; i++){
            final_gift += gift[i] + "-"
        }
    }

    var short_content = injection.checksql_html(event.short_content);
    var content = event.main_content;
    var datestart = event.datestart;
    var dateend = event.dateend;

    var insertsql = `
    INSERT INTO event (brand_name, serie, url, title, img, gift, short_content, content, date_start, date_end, status)
    VALUES ('${final_brand}', '${final_serie}', '${url}', '${title}', '${img}','${final_gift}', '${short_content}', '${content}', '${datestart}', '${dateend}', "sắp diễn ra");`


    db.query(insertsql, function(err, result, fields){
        if (err) throw err;
         res.redirect('back');
    });
};



