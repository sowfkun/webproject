const db= require('../../database/db');

var sql = `
SELECT COUNT(order_id) AS count 
FROM orders 
WHERE order_status = 'chờ xét duyệt';

SELECT * FROM other_page where page_type = ?;
`

module.exports.other_page = function(req,res){

    var page_type = req.params.page;
    db.query(sql, page_type, function (err, result, fields) {
        if (err) throw err;
        res.render('admin_view/admin_other_page',{
            count : result[0][0].count,
            type: page_type,
            list: result[1]
        });
    });
};

module.exports.create = function(req,res){

    if(req.body.type !=="tragop" && req.body.type !=="thanhtoan" && req.body.type !=="vanchuyen" && req.body.type !=="baohanh" &&
    req.body.type !=="lienhe" && req.body.type !=="gioithieu"){
         res.redirect('back');
         return;
    }
    
    var create = `
    INSERT INTO other_page (page_type, content, status) VALUE ('${req.body.type}', '${req.body.main_content}', 'inactive'); 
    `

    db.query(create, function(err, result, fields){
        if(err) throw err;
        console.log("tạo thành công")
        res.redirect('back');
    });
};

//chọn bài sẽ được hiển thị
module.exports.active_page = function(req,res){
    var page_id = req.body.page_id;
    var page_type = req.body.page_type;

    var active = `
    UPDATE other_page 
    SET status = "inactive"
    WHERE page_type = ?;

    UPDATE other_page 
    SET status = "active"
    WHERE id = ?;
    `

    db.query(active,[page_type,page_id], function(err, result, fields){
        if(err) throw err;
        console.log("active thành công");
    });

     res.redirect('back');
}

//chỉnh sửa bài viết
module.exports.update_page = function(req,res){
    var page_id = req.body.page_id;
    var content = req.body.update_content;

    var active = `
    UPDATE other_page 
    SET content = ?
    WHERE id = ?;
    `

    db.query(active,[content,page_id], function(err, result, fields){
        if(err) throw err;
        console.log("update thành công");
    });

     res.redirect('back');
}

