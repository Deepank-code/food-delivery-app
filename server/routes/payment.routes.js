import express from "express";
import { isLoggedin } from "../middleware/auth.middleware.js";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController.js";
const router = express.Router();

router.route("/payment/process").post(isLoggedin, processPayment);

router.route("/stripeapikey").get(isLoggedin, sendStripeApiKey);

export default router;
