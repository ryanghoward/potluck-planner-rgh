import { FETCH_START, FETCH_SUCCESS, FETCH_FAIL } from "../actions/userActions";

export const initialState = {
  user: {
    // name: '',
    // username: '',
    // password: '',
    // email: '',
    // token: ''
  },
  isFetching: false, // this is for the userPage loading
  error: "", //this error is if login fails ?
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      // console.log('fetch is happening')
      return {
        ...state,
        user: {},
        isFetching: true,
        error: "",
      };
    case FETCH_SUCCESS:
      // console.log(action.type)
      // console.log('fetch is happening')
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
      // console.log('fetch is happening')
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
