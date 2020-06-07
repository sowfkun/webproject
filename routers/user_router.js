const express = require('express')
const app = express()
const router = express.Router();
const userController= require('../controllers/user_controller')  // lấy kết quả từ controller
  
const passport = require('passport');

//đăng kí tài khoản
router.get('/sign-up', userController.sign_up);

router.post('/sign-up',userController.sign_upPost);



//đăng nhập
router.get('/sign-in', userController.sign_in);

router.post('/sign-in', userController.sign_inPost);


router.get('/auth/fb', passport.authenticate('facebook',{scope: ['email']}));
router.get('/auth/fb/cb', passport.authenticate('facebook', {
    failureRedirect: '/user/sign-in/', successRedirect: '/'
}) );

router.get('/auth/gg', passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/gg/cb', passport.authenticate('google', {
    failureRedirect: '/user/sign-in/', successRedirect: '/'
}) );


router.post('/update_user', userController.update_user);
router.post('/update_pass', userController.update_password);

router.get('/sign-out', userController.sign_out);


module.exports=router; 