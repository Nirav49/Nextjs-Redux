import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage:storage,
  whitelist: ["users"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const reducer = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      return nextState;
    } else {
      return persistedReducer(state, action);
    }
  };

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  store.__persistor = persistStore(store);

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore);
