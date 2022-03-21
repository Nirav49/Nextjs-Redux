import { takeLatest, fork, call, put } from "redux-saga/effects";
import { getUserList } from "./api";
import * as actionTypes from "./constants";

function* workerGetUserList(action) {
  try {
    const response = yield call(getUserList, action.payload);
    const res_body = response;

    if (res_body) {
      yield put({
        type: actionTypes.USER_LIST_SUCCESS,
        payload: res_body,
      });
    } else {
      yield put({
        type: actionTypes.USER_LIST_FAIL,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: actionTypes.USER_LIST_FAIL });
  }
}

function* watchGetUserList() {
  yield takeLatest(actionTypes.USER_LIST_REQUEST, workerGetUserList);
}

export default [fork(watchGetUserList)];
