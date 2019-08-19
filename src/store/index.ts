import { createStore, Store } from "redux";
import rootReducer, { IStoreData } from "../reducers";
import { devToolsEnhancer } from 'redux-devtools-extension';

export const store: Store<IStoreData> = createStore(rootReducer, devToolsEnhancer({}));