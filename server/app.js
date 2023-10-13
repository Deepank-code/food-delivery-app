import express from "express";
import userRoute from "./routes/user.routes.js";
import mealRoute from "./routes/meal.routes.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.routes.js";
import dotenv from "dotenv";
import mongoConnection from "./config/database.connection.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
// the body of request comming from the client will parse into json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

mongoConnection();
app.use(cookieParser());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/food", mealRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/pay", paymentRoute);
app.all("*", (req, res) => {
  return res.status(404).send("OOPs this page doest exist");
});

app.use(errorMiddleware);
export default app;
