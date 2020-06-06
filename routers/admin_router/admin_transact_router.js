const express = require('express');
const router = express.Router();


const adminTransactController = require('../../controllers/admin_controllers/admin_transact_controller')


router.get('/new', adminTransactController.new_transact);
router.post('/new', adminTransactController.new_confirm);

router.get('/confirm', adminTransactController.confirm_transact);

router.get('/complete', adminTransactController.complete_transact);

router.get('/cancel', adminTransactController.cancel_transact);



module.exports=router; 