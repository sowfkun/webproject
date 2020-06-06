const express = require('express');
const router = express.Router();

const adminController= require('../../controllers/admin_controllers/admin_controller')  // lấy kết quả từ controller
const adminProductController = require('../../controllers/admin_controllers/admin_product_controller')

var multer  = require('multer');        //upload file

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/upload/images');
    },
    filename: function (req, file, callback) {
    
    callback(null, file.originalname + Date.now());
    }
  })
  
var upload = multer({ storage: storage })


router.get('/', adminController.admin_home);


//product router

router.get('/product',  adminProductController.ad_product );

router.get('/product/:param', adminProductController.ad_product_param);

router.get('/product_search', adminProductController.ad_product_search);

router.post('/product_delete', adminProductController.ad_product_delete);

router.post('/product_update', upload.single('img'), adminProductController.ad_product_update);



router.get('/product_create', adminProductController.ad_product_create);
router.post('/product_create', upload.single('img'), adminProductController.ad_product_create_post);
router.post('/create_exist', adminProductController.ad_product_create_exist);



module.exports=router; 