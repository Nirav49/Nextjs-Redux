import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper,HYDRATE } from 'next-redux-wrapper';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export const makeStore = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  const reducer = (state, action) => {
    if(action.type === HYDRATE){
      const nextState = {
        ...state,
        ...action.payload
      }
      return nextState;
    }else{
      return rootReducer(state, action);
    }
  }

  // 2: Add an extra parameter for applying middleware
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  // 3: Run your sagas on server
  store.sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store
  return store;
};


export const wrapper = createWrapper(makeStore);