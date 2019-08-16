import { BasketActionTypes, ADD_ARTICLE_IN_BASKET } from "../constants/action-types";
import produce from 'immer';

export interface IStoreBasketArticle {
  [key: string]: number;
}

export interface IStoreData {
  basket: IStoreBasketArticle;
}

const initialState: IStoreData = {
  basket: {}
};

function rootReducer(state: IStoreData = initialState, action: BasketActionTypes): IStoreData {
  if (action.type === ADD_ARTICLE_IN_BASKET) {
    const { idArticle, nb } = action.payload;
    return produce(state, stateModifier => {
      state.basket[idArticle] != null
        ? stateModifier.basket[idArticle] = state.basket[idArticle] + nb
        : stateModifier.basket[idArticle] = nb;
    });
  };

  return state;
};
export default rootReducer;