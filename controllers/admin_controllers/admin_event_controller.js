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

//tạo sự kiện mới
module.exports.event_create = function(req,res){
    var event = req.body;

    console.log(event);
    var img = injection.checksql_html(req.file.filename);
    var title = injection.checksql_html(event.title);
    var url = injection.checksql_html(event.URL);

    var brand = event.brand;
    var serie = event.series;
    
    //brand
    if(typeof brand == "undefined"){
        var final_brand = "";
    } else if(typeof brand == "string"){
        var final_brand = brand + "-";
        final_brand = injection.checksql_html(final_brand);
    } else {
        var final_brand = ""
        for(let i = 0; i< brand.length; i++){
            final_brand += brand[i] + "-"
        }
        final_brand = injection.checksql_html(final_brand);
    }
   

    //serie
    if(typeof serie == "undefined"){
        var final_serie = ""
    } else if(typeof serie == "string") {
        var final_serie = serie + "-";
        final_serie = injection.checksql_html(final_serie);

    } else{
        var final_serie = ""
        for(let i = 0; i<serie.length; i++){
            final_serie += serie[i] + "-";
        }
        final_serie = injection.checksql_html(final_serie);

    }
    
    //gift
    var gift = event.final_gift;
    if(gift == ""){
        var final_gift = true;
    } else {
        gift = gift.split(",");
        var final_gift = "";
        for(let i = 0; i<gift.length; i++){
            final_gift += gift[i] + "-";
        }
        final_gift = injection.checksql_html(final_gift);
    }
    //content
    var short_content = injection.checksql_html(event.short_content);
    var content = event.main_content;
    var discount = event.discount;
    
    //datestart dateend
    var datestart = event.datestart;
    var dt = Date.parse(datestart);
    var dateend = event.dateend;
    var de = Date.parse(dateend);


    if(img == true || title == true || url == true || final_brand == true || final_serie == true || 
    (final_brand == "" && final_serie =="") || final_gift == true || short_content == true || dt > de || isNaN(discount) == true){
        console.log("injection")
        res.redirect('back');
         return;
    }

    var insertsql = `
    INSERT INTO event (brand_name, serie, url, title, img, gift, short_content, content, date_start, date_end, discount, status)
    VALUES ('${final_brand}', '${final_serie}', '${url}', '${title}', '${img}','${final_gift}', '${short_content}', '${content}', 
    '${datestart}', '${dateend}', ${discount}, "sắp diễn ra");`

    db.query(insertsql, function(err, result, fields){
        if (err) throw err;
        console.log("Thêm sự kiện thành công")
        res.redirect('back');
    });
};



