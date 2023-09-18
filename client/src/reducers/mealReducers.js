import {
  ALL_MEAL_REQUEST,
  ALL_MEAL_SUCCESS,
  ALL_MEAL_FAIL,
  CLEAR_ERRORS,
  MEAL_DETAIL_REQUEST,
  MEAL_DETAIL_SUCCESS,
  MEAL_DETAIL_FAIL,
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
        meals: action.payload.allMeals,
        mealsCount: action.payload.mealCount,
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
const mealDetailReducer = (state = { meal: {} }, action) => {
  switch (action.type) {
    case MEAL_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case MEAL_DETAIL_SUCCESS:
      return {
        loading: false,
        meal: action.payload.meal,
      };
    case MEAL_DETAIL_FAIL:
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

export { mealReducer, mealDetailReducer };
