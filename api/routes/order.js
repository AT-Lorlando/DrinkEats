const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.use(express.json());

const orderCtrl = require('../controllers/order');

router.get('/', orderCtrl.getAllOrders);
router.post('/', auth, orderCtrl.createOrder);
// router.get('/:id', orderCtrl.getOneOrder);
// router.delete('/:id', orderCtrl.deleteOrder);

module.exports = router;