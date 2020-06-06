const express = require('express');
const router = express.Router();

const homeController= require('../controllers/home_controller')  // lấy kết quả từ controller
const eventController= require('../controllers/event_controller')
const searchController= require('../controllers/search_controller')

router.get('/', homeController.index );      //request '/' thì gọi controller


router.get('/event', eventController.list);    //request đến trang sự kiện
router.get('/event/:url', eventController.event);


router.get('/search/', searchController.search);         //tìm kiếm sản phẩm


module.exports=router;  //export để sử dụng ở index