import mongoose from "mongoose";
//this line of code mean that if you ask a query that does't exist then it doest give error
mongoose.set("strictQuery", false);
const mongoConnection = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food-app")
      .then((conn) => {
        console.log(`database is connectecd at ${conn.connection.host}`);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error.msg);
    process.exit(1);
  }
};
export default mongoConnection;
