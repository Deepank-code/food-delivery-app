import { Router } from "express";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrder,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { authorizedRoles, isLoggedin } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/new").post(isLoggedin, newOrder);
router.route("/:id").get(isLoggedin, getSingleOrder);
router.route("/orders/me").get(isLoggedin, myOrder);
router
  .route("/admin/all_Orders")
  .get(isLoggedin, authorizedRoles("ADMIN"), allOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedin, authorizedRoles("ADMIN"), updateOrder)
  .delete(isLoggedin, authorizedRoles("ADMIN"), deleteOrder);

export default router;
