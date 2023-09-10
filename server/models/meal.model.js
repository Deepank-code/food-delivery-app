import mongoose, { Schema, model, mongo } from "mongoose";

const mealSchema = new Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description field is required"],
  },
  price: {
    type: Number,
    required: [true, "price field is required"],
    maxLength: [6, "max 6 digit price is required"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter meal category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numofreviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: [true, "name is required"] },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Meal = new model("Meal", mealSchema);
export default Meal;
