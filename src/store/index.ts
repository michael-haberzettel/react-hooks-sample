import { createStore, Store } from "redux";
import rootReducer, { IStoreData } from "../reducers";
import { devToolsEnhancer } from 'redux-devtools-extension';


export const store: Store<IStoreData> = createStore(rootReducer, devToolsEnhancer({}));

// import { connect } from 'react-redux';
// import { increment, decrement, reset } from './actionCreators'
// import { createStore } from 'redux';

// const store = createStore()
