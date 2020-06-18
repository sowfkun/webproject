const express = require('express');
const router = express.Router();

const filterController= require('../controllers/filter_controller')  // lấy kết quả từ controller

router.post('/', filterController.filter);         //tìm kiếm sản phẩm


module.exports=router;  //export để sử dụng ở index