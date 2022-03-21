import { all } from "redux-saga/effects";
import userSagas from "./users/saga";

export default function* rootSaga() {
  yield all([
    ...userSagas
  ]);
}