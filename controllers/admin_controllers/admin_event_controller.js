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
            count: result[0][0].count,
            serie: result[2],
            brand: result[1],
            event: {},
            type: "create"
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



//list event
module.exports.list_event = function(req,res){

    var select_event = `
    SELECT COUNT(order_id) AS count 
    FROM orders 
    WHERE order_status = 'chờ xét duyệt';

    SELECT * FROM event;`

    db.query(select_event, function(err, result, fields){
        if(err) throw err;
        res.render("admin_view/admin_event_list", {
            count: result[0][0].count,
            event: result[1]
        });
    });
}

//chi tiết sự kiện
module.exports.event_detail = function(req,res){
    var event_id = req.params.event_id;
    
    var select_event = `
    SELECT COUNT(order_id) AS count 
    FROM orders 
    WHERE order_status = 'chờ xét duyệt';

    SELECT DISTINCT brand_name 
    FROM product
    WHERE product_status = "active";

    SELECT DISTINCT brand_name , serie 
    FROM product
    WHERE product_status = "active";

    SELECT * FROM event WHERE event_id = ?;`

    db.query(select_event, event_id, function( err, result, fields){
        if(err) throw err;
        res.render("admin_view/admin_event",{
            count: result[0][0].count,
            serie: result[2],
            brand: result[1],
            event: result[3][0],
            type: "edit"
        });
    });
}

//chỉnh sửa event
module.exports.edit_event = function(req,res){

    if( typeof req.file == "undefined"){
        var img = ""
    } else {
        var img = injection.checksql_html(req.file.filename);
    }
    var event = req.body;

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
    
    console.log(req.body)
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

    if(img == ""){
        var update = `
        UPDATE event 
        SET brand_name = '${final_brand}', serie ='${final_serie}', url = '${url}', title = '${title}', gift = '${final_gift}', 
        short_content = '${short_content}', content = '${content}', date_start = '${datestart}', date_end = '${dateend}', 
        discount = ${discount} 
        WHERE event_id = ${event.event_id};`
    } else {
        var update = `
        UPDATE event 
        SET brand_name = '${final_brand}', serie ='${final_serie}', url = '${url}', title = '${title}', gift = '${final_gift}', 
        short_content = '${short_content}', content = '${content}', date_start = '${datestart}', date_end = '${dateend}', 
        discount = ${discount}, img = '${img}'
        WHERE event_id = ${event.event_id};`
    }

    db.query(update, function(err, result, fields){
        if(err) throw err;
        console.log("Update sự kiện thành công");
        res.redirect('back');
    });
}


//xóa event
module.exports.delete_event = function(req,res){

    var event_id = req.body.event_id;

    var deletesql = `
    DELETE FROM event
    WHERE event_id = ?`

    db.query(deletesql, event_id, function(err, result, fields){
        if(err) throw err;
        console.log("xóa sự kiện thành công");
         res.redirect('back');
    })
}



//set banner
module.exports.set_banner = function(req,res){
    var banner = req.body.set_banner;

    var set_banner = `
    UPDATE event 
    SET banner = "true"
    WHERE event_id = ?;
    `
    db.query(set_banner, banner, function(err, result, fields){
        if(err) throw err;
        console.log(" set banner thành công")
    });

    res.redirect('back');
}

//unset_banner
module.exports.unset_banner = function(req,res){
    var banner = req.body.unset_banner;

    var unset_banner = `
    UPDATE event 
    SET banner = "false"
    WHERE event_id = ?;
    `
    db.query(unset_banner, banner, function(err, result, fields){
        if(err) throw err;
        console.log(" unset banner thành công")
    });

     res.redirect('back');
}


// auto update thời gian diễn ra sự kiện 
var schedule = require('node-schedule');
var dateFormat = require('dateformat');

var rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 1;

var j = schedule.scheduleJob(rule, function(){
  var getdate = Date.now();
  var date = dateFormat(getdate, "yyyy-mm-dd");

  var update_event =  `
  SET SQL_SAFE_UPDATES = 0;

  UPDATE event 
  SET status = "đang diễn ra" 
  WHERE date_start <= '${date}' AND date_end >= '${date}';

  UPDATE event 
  SET status = "sắp diễn ra" 
  WHERE date_start > '${date}';

  UPDATE event 
  SET status = "đã kết thúc", banner = "false"
  WHERE date_end < '${date}';
  `

  db.query(update_event, function(err, result, fields){
    if(err) throw err;
    console.log("update event time");
  });
});
