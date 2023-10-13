import Order from "../models/order.model.js";
import AppError from "../utils/error.util.js";
import Meal from "../models/meal.model.js";
//create new error
const newOrder = async (req, res, next) => {
  const {
    deliveryInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    deliveryPrice,
    totalPrice,
  } = req.body;
  try {
    const order = await Order.create({
      deliveryInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      deliveryPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user.id,
    });
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getSingleOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      return next(new AppError("order not found", 400));
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new AppError(error.message), 200);
  }
};
//logged in user order
const myOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
      return next(new AppError("order not found", 400));
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new AppError(error.message), 200);
  }
};

//get all orders--admin
const allOrders = async (req, res, next) => {
  let allOrders = await Order.find();
  console.log(allOrders);
  if (!allOrders) {
    return next(new AppError("order not found", 400));
  }

  let totalAmount = 0;

  allOrders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    allOrders,
  });
};
//update  orders status--admin
const updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new AppError("You have delivered this order", 404));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.meal, order.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,

    order,
  });
};

async function updateStock(id, quantity) {
  const meal = await Meal.findById(id);

  meal.Stock -= quantity;
  await meal.save({ validateBeforeSave: false });
}

//deleteing order --admin
const deleteOrder = async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("order with this id not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "order with particular is successfully deleted!!",
  });
};
export {
  newOrder,
  getSingleOrder,
  myOrder,
  allOrders,
  updateOrder,
  deleteOrder,
};
