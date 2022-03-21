import * as actionTypes from "./constants";
import getUserList from "./api";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  data: false,
  userList: [],
};

const userStart = (state, action) => {
  getUserList();
  return {
    userList: [],
  };
};

const userSuccess = (state, action) => {
  return {
    userList: action.payload,
    data: true,
  };
};

const userFail = (state, action) => {
  return {
    data: false,
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LIST_REQUEST:
      return userStart(state, action);

    case actionTypes.USER_LIST_SUCCESS:
      return userSuccess(state, action);

    case actionTypes.USER_LIST_FAIL:
      return userFail(state, action);

    default:
      return state;
  }
};

export default userReducer;
