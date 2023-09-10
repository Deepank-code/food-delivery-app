import axios from "axios";
import {
  ALL_MEAL_REQUEST,
  ALL_MEAL_SUCCESS,
  ALL_MEAL_FAIL,
  CLEAR_ERRORS,
} from "../constant/mealConstant.js";

export const getMeals = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MEAL_REQUEST });
    const { data } = await axios.get("/api/v1/food/meals");

    dispatch({
      type: ALL_MEAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MEAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
