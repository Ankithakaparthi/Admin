
import express from 'express'

import { getUserOrders, placeOrder } from '../controllers/user/user.controller.js'

const router = express.Router()

router.post('/order', placeOrder);
router.post('/getOrders', getUserOrders);

export default router