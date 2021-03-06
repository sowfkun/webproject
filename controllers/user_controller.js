const md5 =require('md5');
const db= require('../database/db');
const injection = require("../check_injection/check_injection")

//chuyển tới trang tạo tài khoản
module.exports.sign_up= (req, res) => {     
  
  res.render('sign_up', {
      values: req.body,
      error: ""
        });
};

// gửi thông tin tạo tài khoản
module.exports.sign_upPost= (req, res) => {     
  
  var name = injection.checksql_html(req.body.name);
  var phone = injection.checkphone(req.body.phone);
  var email = injection.checkemail(req.body.email);
  var pass = injection.checksql_html(req.body.password);
  var passConfirm = injection.checksql_html(req.body.re_password);

  // check injection
  if(name == true || phone == true || email == true || pass.length < 4 || pass !== passConfirm){
         res.redirect('back');
         return;
  }

  var passwordHash= md5(req.body.password); 
  var sqlsign_up=`
  SELECT email FROM customer where email = ?;
  SELECT phone FROM customer where phone = ?;
  `
  db.query(sqlsign_up,[email,phone], function (err, result) {
      if (err) throw err;
      var err = [];
      if(result[0].length){          // email trùng
            if(result[1].length){       // email trùng, phone trùng
                err = ['Email đã được sử dụng', 'Số điện thoại đã được sử dụng'];
            } else {
                err = ['Email đã được sử dụng'];
            }
      } else {      //email không trùng
            if(result[1].length){       //email không trùng, số điện thoại trùng    
                err = ['Số điện thoại đã được sử dụng'];
            } else{            // email không trùng, số điện thoại không trùng,
                err = [];
            }
        }
      
      if(err.length){                //nếu đã được sử dụng thì hiển thị thông báo 
            console.log(err);
            res.render('sign_up',{
                  values: req.body,
                  error: err
            });
            return;
      }     

      var insert=`INSERT INTO customer (name, password, email, phone) VALUES ('${name}','${passwordHash}', '${email}', ${phone})`

      db.query(insert, function (err, result) {             // nếu không thì thêm user vào database
            if (err) throw err;
            res.cookie('mess', 'Bạn đã đăng kí thành công, hãy đăng nhập!')
            res.redirect('/user/sign-in');
            
      });     
     
});
}

//Đăng nhập
module.exports.sign_in= (req, res) => {     
  
    var mess="";
    if(req.cookies.mess){
        mess =req.cookies.mess;
        console.log(mess);
    }
    res.render('sign_in', {
        values: req.body,
        mess: mess
    });
};
  
var sqlsignin=`SELECT password, usertype FROM customer where email = ?;`
module.exports.sign_inPost= (req, res) => {     
  
    var email = injection.checkemail(req.body.email);
    var pass = injection.checksql_html(req.body.password);

    //check injection 
    if(email == true || pass == true){
         res.redirect('back');
         return;
    }

    var passwordHash = md5(pass);
    db.query(sqlsignin,[email], function (err, result) {
        if (err) throw err;
        if(!result.length){
            res.render('sign_in',{
                values: req.body,
                mess: 'Email chưa được đăng kí'
            });
            return;
        }

        if(result[0].password != passwordHash){
            res.render('sign_in', {
                values: req.body,
                mess: 'Password không đúng'
            });
            return;
        }

        if(result[0].usertype == "admin"){
            res.cookie('ad_email', email,{
                signed: true
            });
            res.clearCookie('mess')     //xóa mess thông báo đăng kí tài khoản thành công
            res.redirect('/admin/');
        } else {
            res.cookie('email', email,{
                signed: true
            });
            res.clearCookie('mess')     //xóa mess thông báo đăng kí tài khoản thành công
            res.redirect('/');
        }
    });

};


//cập nhật user
module.exports.update_user = (req,res) => {

    var user_id = req.body.user_id;
    var name = injection.checksql_html(req.body.name);
    var email = injection.checkemail(req.body.email);
    var phone = injection.checkphone(req.body.phone);
    var address = injection.checksql_html(req.body.address);

    if(isNaN(user_id) == true || name == true || email == true || phone == true | address == true){
         res.redirect('back');
         return;
    }
    console.log(isNaN(""));
    db.query('Select * from customer where user_id = ?', user_id, function (err, result){
        if (err) throw err;
                                                 //kiểm tra xem người dùng có thay đổi email không
        if(email == result[0].email){      //nếu không thì cập nhật bình thường nhưng ko cần cập nhật mail
            console.log(' không thay đổi email')
            var updatesql = `
            UPDATE customer 
            SET name = '${name}', phone = ${phone}, address = '${address}'
            WHERE user_id = ${user_id};
            `
            db.query(updatesql, function (err, result){
                if (err) throw err;
                 res.redirect('/');
            });
        } else {                //nếu có thì kiểm tra email mới đã được sử dụng hay chưa
            db.query('SELECT count(email) AS count FROM customer where email =  ?', email, function (err, result){
                console.log('có thay đổi email')
                if (result[0].count == 1) {     // nếu rồi thì không cho cập nhật
                    console.log('email bị trùng, hủy cập nhật')
                    res.redirect('/');
                } else {                        // nếu chưa thì cập nhật bình thường
                    console.log(' email không bị trùng, cập nhật')
                    var updatesql = `
                    UPDATE customer 
                    SET name = '${name}', email = '${email}', phone = ${phone}, address = '${address}'
                    WHERE user_id = ${user_id};
                    `
                    db.query(updatesql, function (err, result){
                        if (err) throw err;
                         res.redirect('/');
                    });
                }
            });
        }
    });

    res.clearCookie('email');
    res.clearCookie('ad_email');

    res.cookie('email', email,{
        signed: true
    });

}

//cập nhật mật khẩu
module.exports.update_password = (req,res) => {

    var user_id = req.body.user_id;
    var newpass = injection.checksql_html(req.body.new_pass);
    var passConfirm = injection.checksql_html(req.body.confirm);

    //check injection = true => return
    if( isNaN(user_id) == true || user_id == "" || newpass !== passConfirm || newpass == true || passConfirm == true)  {
        res.redirect('/');
        return;
    };

    var newpassHash = md5(newpass);

    if(typeof req.body.old_pass == "undefined") {   //người dùng chưa đk tài khoản mà đăng nhập bàng facebook thì khong có password
        db.query(`UPDATE customer SET password = '${newpassHash}' WHERE user_id =  ?`, user_id, function (err, result){
            console.log('thêm mới mật khẩu thành công')
            if (err) throw err;
             res.redirect('/');
        });
    } else {            //đã có pass word
        var old_pass = injection.checksql_html(req.body.old_pass);
        if(old_pass == true){
             res.redirect('back');
             return;
        }
        var oldpassHash= md5(old_pass);
        db.query('SELECT password FROM customer where user_id =  ?', user_id, function (err, result){
            if (err) throw err;
            if(oldpassHash === result[0].password){     //mật khẩu cũ đúng, cập nhật mật khẩu mới
                console.log('password cũ trùng khớp, cập nhật lại')
                db.query(`UPDATE customer SET password = '${newpassHash}' WHERE user_id =  ?`, user_id, function (err, result){
                    if (err) throw err;
                     res.redirect('/');
                });
            } else{         //mật khẩu cũ sai
                console.log('Nhập lại mật khẩu')
                res.redirect('/');
            }
        });
    }

}
module.exports.sign_out= (req, res) => {
    
    res.clearCookie('email');
    res.clearCookie('ad_email');
    res.clearCookie('connect.sid');
    res.redirect('/user/sign-in');
}


//admin login

