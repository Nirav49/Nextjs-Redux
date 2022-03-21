import { takeLatest, fork, call, put } from "redux-saga/effects";
import { getUserList } from "./api";
import * as actionTypes from "./constants";

function* workerGetUserList(action) {
  const response = yield call(getUserList, action.payload);
  const res_body = response;

  yield put({
    type: actionTypes.USER_LIST_SUCCESS,
    payload: res_body,
  });
}

function* watchGetUserList() {
  yield takeLatest(actionTypes.USER_LIST_REQUEST, workerGetUserList);
}

export default [fork(watchGetUserList)];
