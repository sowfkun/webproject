const express = require('express');
const router = express.Router();

const homeController= require('../controllers/home_controller')  // lấy kết quả từ controller
const eventController= require('../controllers/event_controller')
const searchController= require('../controllers/search_controller')
const other_pageController = require('../controllers/other_page')


router.get('/', homeController.index );      //request '/' thì gọi controller


router.get('/event', eventController.list);    //request đến trang sự kiện
router.get('/event/:url', eventController.event);


router.get('/search/', searchController.search);         //tìm kiếm sản phẩm


router.get('/about_us', other_pageController.about_us);
router.get('/contact', other_pageController.contact);
router.get('/tragop', other_pageController.tragop);
router.get('/vanchuyen', other_pageController.vanchuyen);
router.get('/thanhtoan', other_pageController.thanhtoan);
router.get('/baohanh', other_pageController.baohanh);
module.exports=router;  //export để sử dụng ở index