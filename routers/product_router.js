const express = require('express');
const router = express.Router();

const controller= require('../controllers/product_controller')  // lấy kết quả từ controller

router.get('/', controller.product_all);                                        //hiển thị tất cả sản phẩm

router.get('/:brand', controller.product_brand);                                //hiển thị theo thương hiệu

router.get('/:brand/:serie', controller.product_serie);                         //hiển thị một dòng sản phẩm cụ thể

router.get('/:brand/:serie/:ma_sku', controller.product_detail);                //hiển thị thông tin một sản phẩm cụ thể



module.exports=router;                                          //export để sử dụng ở index