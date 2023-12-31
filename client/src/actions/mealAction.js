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

export const getMeals =
  (keyword = "", currentPage = 1, price = [20, 3000], category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_MEAL_REQUEST });
      let link = `/api/v1/food/meals?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      if (category) {
        link = `/api/v1/food/meals?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }
      const { data } = await axios.get(link);

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
