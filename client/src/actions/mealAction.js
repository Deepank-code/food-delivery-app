import axios from "axios";
import {
  ALL_MEAL_REQUEST,
  ALL_MEAL_SUCCESS,
  ALL_MEAL_FAIL,
  CLEAR_ERRORS,
  MEAL_DETAIL_REQUEST,
  MEAL_DETAIL_SUCCESS,
  MEAL_DETAIL_FAIL,
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
export const getMealDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/v1/food/meal/${id}`);

    dispatch({
      type: MEAL_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
