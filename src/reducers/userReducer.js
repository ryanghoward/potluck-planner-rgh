import { FETCH_START, FETCH_SUCCESS, FETCH_FAIL } from "../actions/userActions";

export const initialState = {
  user: {},
  isFetching: false,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        user: {},
        isFetching: true,
        error: "",
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        // user: action.payload,
        user: {
          username: action.payload.username,
          password: action.payload.password,
        },
        isFetching: false,
        error: "",
      };
    case FETCH_FAIL:
      return {
        ...state,
        user: {},
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
