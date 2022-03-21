import React from "react";
import { END } from "redux-saga";
import { actionFetchUserList } from "../store/users/actions";
import { useSelector } from "react-redux";
import UserList from "../components/userList";
import { wrapper } from "../store/ConfigureStore";

const Index = () => {
  const list = useSelector((state) => state.users.userList);
  return <UserList list={list} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(actionFetchUserList());
      await store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Index;
