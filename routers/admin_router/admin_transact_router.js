const express = require('express');
const router = express.Router();


const adminTransactController = require('../../controllers/admin_controllers/admin_transact_controller')


router.get('/new', adminTransactController.new_transact);           // hiển thị giao dịch mới
router.post('/new', adminTransactController.new_confirm);           // xác nhận giao dịch

router.get('/delivering', adminTransactController.transact_delivering);         // hiển thị giao dịch đang giao hàng
router.post('/delivering', adminTransactController.confirm_delivered);        // xác nhận đã giao hàng thành công

router.get('/complete', adminTransactController.complete_transact);     // hiển thị danh sách giao dịch thành công

router.get('/cancel', adminTransactController.cancel_transact_show);         // hiển thị hủy giao dịch
router.post('/transact_cancel', adminTransactController.cancel_transact);


module.exports=router; 