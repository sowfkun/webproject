const express = require('express');
const router = express.Router();

const orderController= require('../controllers/order_controller')  // lấy kết quả từ controller


router.get('/', orderController.view);

router.post('/', orderController.buy);

router.get('/history', orderController.history);

router.get('/dealing', orderController.dealing);

router.post('/dealing', orderController.dealingPost);
module.exports = router;