const express = require('express');
const router = express.Router();


const adminEventController = require('../../controllers/admin_controllers/admin_event_controller')


var multer  = require('multer');        //upload file

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'public/upload/event_images');
    },
    filename: function (req, file, callback) {
    
    callback(null, file.originalname + Date.now());
    }
  })
  
var upload = multer({ storage: storage })

router.get('/new', adminEventController.new_event);           // hiển thị giao dịch mới

router.post('/new', upload.single('img'), adminEventController.event_create);


module.exports=router; 