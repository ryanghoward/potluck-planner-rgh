import {
  UPDATE_POTLUCK,
  ADD_POTLUCK,
  DELETE_POTLUCK,
} from "../actions/eventActions";

export const initialState = {
  potluck: {
    potluck_id: 1,
    potluck_name: "4th of July",
    date: "2022-07-04T00:00:00.000Z",
    time: "12:00:00",
    location: "U.S.A",
    user_id: 1,
  },
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
