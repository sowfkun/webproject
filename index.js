const express = require('express')
const app = express()
const port = 3000;

//import router
const homeRoute= require('./routers/home_router')       //router home
const productRoute= require('./routers/product_router')     //router product
const userRoute= require('./routers/user_router')           //router user
const shoppingRouter = require('./routers/order_router')    //router giỏ hàng
const filterRouter = require('./routers/filter_router')

//import admin router
const adminRouter = require('./routers/admin_router/admin_router')
const ad_transact_router = require('./routers/admin_router/admin_transact_router')

//import middleware
const userCheck =require('./middleware/userCheck_middleware')

//cookie parser
var cookieParser = require('cookie-parser')
app.use(cookieParser('6c6db7dce8f333143dcff0e91077bb29'))


// body parser
const bodyParser =require('body-parser')    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//view template ejs
app.use(express.static("public"));


app.set('view engine', 'ejs');
app.set('views', './views');


//đăng nhập với facebook
//passport để đang nhập với fb
const passport = require('passport');
const passportfb = require('passport-facebook')
const session = require('express-session')
const passportgg = require('passport-google-oauth20').Strategy;

const db= require('./database/db')

app.use(session({
    secret: "TTHHNDT",
    saveUninitialized: true,
    resave: true
}));
;

app.use(passport.initialize());
app.use(passport.session());


//google login
passport.use(new passportgg(
    {
        clientID: "791603067804-e1ecpn9dnlu5bvqj1ea2dp88ec9j5d3j.apps.googleusercontent.com",
        clientSecret: "kqJHgImMTNlPjXw4W7O74i9G",
        callbackURL: "https://localhost:3000/user/auth/gg/cb",
    },
    (accessToken, refreshToken, profile, done) => {
        
        console.log(profile);
     
        let user= {"google_id": profile.id, "name": profile.displayName, "email": profile.emails[0].value};
        
        db.query('select * from customer where google_id = ?', user.google_id, function(err, result){	
            if(err) return done(err);       //nếu lỗi thỉ return
     
            if(result[0]) {return done(null, profile)};         //nếu tìm thấy google_id thì trả về profile (chắc chắn email đã được sử dụng)
            
            db.query('select * from customer where email = ?', user.email, function(err, result){	//kiểm tra email đã được dùng chưa.
                if(err) return done(err);       //nếu lỗi thỉ return
                if(typeof result[0] == "undefined") {    //nếu email chưa được sử dụng thì tạo mới
              
                    db.query('insert into customer set ?', user , function(err, result){	
                        if(err) return done(err);
                        return done(null, profile);

                    });

                } else {         // nếu rồi thì gán google_id vào để tránh email bị sử dụng 2 lần
                    db.query('update customer set google_id = ? where email = ?', [user.google_id, user.email] , function(err, result){	
                        if(err) return done(err);
                        return done(null, profile)
                       
                    });
                }     
            });
        }) 
    }
));

//lấy user từ facebook
passport.use(new passportfb(
    {
        clientID: "179978530073805",
        clientSecret: "50569e4e5085608a6132e727c3d731a0",
        callbackURL: "https://localhost:3000/user/auth/fb/cb",
        profileFields: ['email', 'displayName']
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        
        let user= {"fb_id": profile.id, "name": profile.displayName, "email": profile.emails[0].value};

        db.query('select * from customer where fb_id = ?', user.fb_id, function(err, result){	
            if(err) return done(err);       //nếu lỗi thỉ return
           
            if(result[0]) {return done(null, profile)};         //nếu tìm thấy fb_id thì trả về profile (chắc chắn email đã được sử dụng)
            
            db.query('select * from customer where email = ?', user.email, function(err, result){	//kiểm tra email đã được dùng chưa.
                if(err) return done(err);       //nếu lỗi thỉ return
                if(typeof result[0] == "undefined") {    //nếu email chưa được sử dụng thì tạo mới
                  
                    db.query('insert into customer set ?', user , function(err, result){	
                        if(err) return done(err);
                        return done(null, profile);
                    });

                } else {         // nếu rồi thì gán fb_id vào để tránh email bị sử dụng 2 lần
                    db.query('update customer set fb_id = ? where email = ?', [user.fb_id, user.email] , function(err, result){	
                        if(err) return done(err);
                       
                        return done(null, profile)
                        
                    });
                }     
            });
        })
    }
))


passport.serializeUser((user, done) => {
    done(null, user.id)

})

passport.deserializeUser((id, done) => {
    db.query(`select * from customer where fb_id = ${id} or google_id = '${id}'` , function(err, result){	
        done(null, result[0]);
        
    })
})


//Client router
app.use('', userCheck.userCheck, homeRoute);
app.use('/product', userCheck.userCheck, productRoute);
app.use('/user', userRoute);
app.use('/shopping', userCheck.userCheck, shoppingRouter);
app.use('/filter', userCheck.userCheck, filterRouter);


//Admin router

app.use('/admin', adminRouter);     //bao gồm product
app.use('/admin/transact', ad_transact_router);     //router giao dich


// const fs = require('fs')

// const https = require("https");

// const key = fs.readFileSync("./https/selfsigned.key")
// const cert = fs.readFileSync("./https/selfsigned.crt")
// var options = {
//     key: key,
//     cert: cert
//   };

// let Server;

// Server =https.createServer(options, app)

// Server.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// });

var server = app.listen(8080, () => {
    console.log(`Server started on port`);
});
module.exports = {
    server : server,
    app : app
};