import {
  ALL_MEAL_REQUEST,
  ALL_MEAL_SUCCESS,
  ALL_MEAL_FAIL,
  CLEAR_ERRORS,
} from "../constant/mealConstant.js";

const mealReducer = (state = { meals: [] }, action) => {
  switch (action.type) {
    case ALL_MEAL_REQUEST:
      return {
        loading: true,
        meal: [],
      };
    case ALL_MEAL_SUCCESS:
      return {
        loading: false,
        meal: action.payload.meals,
        mealsCount: action.payload.mealsCount,
      };
    case ALL_MEAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default mealReducer;
