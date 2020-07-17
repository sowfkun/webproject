const db= require('../database/db');

var sql= `SELECT * FROM customer WHERE email = ?`

module.exports.userCheck= function(req,res,next){
    
    if(!req.signedCookies.email && !req.user){            // kiểm tra xem người dùng đã đăng nhập chưa, 
        res.locals.name= 'Đăng nhập';       // nếu chưa thì cho người dùng xem giỏ hàng trong locla storeage
        res.locals.usertype='Guest';
        res.locals.user_id = 0;
        next();
        return;
    }  

    if(req.signedCookies.email && !req.user){
        db.query(sql,req.signedCookies.email, function (err, result) {
            if (err) throw err;
            
            var user = result[0];
    
            if(!user.email.length){
              res.locals.name= 'Đăng nhập';  // kiểm tra cookie xem có phải là người dùng thật
              res.locals.usertype='Guest'; 
              res.locals.user_id = 0;
              next();
              return;
            }
    
            res.locals.user = user;
            res.locals.user_id = user.user_id;
            next();
        });
    }

    if(!req.signedCookies.email && req.user){
        
        if(req.user.usertype !== "admin") {
            res.locals.user = req.user;
            res.locals.user_id = req.user.user_id;
            next();
        }
    }
}

module.exports.adminCheck= function(req,res,next){
   
    if(!req.signedCookies.ad_email && !req.user){            // kiểm tra xem người dùng đã đăng nhập chưa, 
        res.cookie('mess', 'Vui lòng đăng nhập với quyền admin')
        res.redirect('/user/sign-in')
        return;
    }  

    if(req.signedCookies.ad_email && !req.user){
        db.query(sql,req.signedCookies.ad_email, function (err, result) {
            if (err) throw err;
            
            var user = result[0];
            if(!user.email.length){
                res.cookie('mess', 'Vui lòng đăng nhập với quyền admin')
                res.redirect('/user/sign-in')
                return;
            }
    
            next();
        });
    }

    if(!req.signedCookies.email && req.user){
        
        if(req.user.usertype == "admin") {
            res.locals.user = "";
            res.locals.user_id = "";
            next();
        }
    }
}