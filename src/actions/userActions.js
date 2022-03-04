import axios from "axios";

export const registerNewUser = (newUser) => {
  return (dispatch) => {
    console.log("FETCHING new user");
    dispatch({ type: FETCH_START });
    axios
      .post(
        "https://potluck-planner-rgh.herokuapp.com/api/users/register",
        newUser
      )
      .then((res) => {
        // console.log(res);
        dispatch(fetchSuccess(res.data.results[0]));
        dispatch({ type: FETCH_SUCCESS, payload: res.data.results[0] });
      })
      .catch((err) => {
        dispatch(fetchFail(err));
      });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    console.log("GETTING new users");
    dispatch(fetchStart());
    axios
      .get("https://potluck-planner-rgh.herokuapp.com/api/users")
      .then((res) => {
        dispatch(fetchSuccess(res.data.results[0]));
      })
      .catch((err) => {
        dispatch(fetchFail(err));
      });
  };
};

export const userLogin = (payload) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .post(
        "https://potluck-planner-rgh.herokuapp.com/api/users/login",
        payload
      )
      .then((res) => {
        dispatch(
          fetchSuccess(window.localStorage.setItem("token", res.data.token))
        );
        dispatch(setMessage(res.data.message));
      })
      .catch((err) => {
        dispatch(fetchFail(err));
      });
  };
};

export const FETCH_START = "FETCH_START";
export const fetchStart = () => {
  return { type: FETCH_START };
};

export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const fetchSuccess = (fetchResp) => {
  return { type: FETCH_SUCCESS, payload: fetchResp };
};

export const FETCH_FAIL = "FETCH_FAIL";
export const fetchFail = (errorMessage) => {
  return { type: FETCH_FAIL, payload: errorMessage };
};

export const SET_MESSAGE = "SET_MESSAGE";
export const setMessage = (message) => {
  return { type: SET_MESSAGE, payload: message };
};
