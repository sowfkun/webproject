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


router.get('/list_event', adminEventController.list_event);           // hiển thị list_event


router.get('/:event_id', adminEventController.event_detail);           // hiển thị event cụ thể
router.post('/edit_event', upload.single('img'), adminEventController.edit_event);           // chỉnh sửa event


router.post('/delete', upload.single('img'), adminEventController.delete_event); 


router.post('/set_banner', adminEventController.set_banner);
router.post('/unset_banner', adminEventController.unset_banner);

module.exports=router; 