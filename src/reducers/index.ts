import { BasketActionTypes, ADD_ARTICLE_IN_BASKET } from "../constants/action-types";
import produce from 'immer';

export interface IStoreBasketArticle {
  [key: string]: {
    idArticle: string;
    nb: number;
    unitPrice: number;
  }
}

export interface IStoreData {
  basket: IStoreBasketArticle;
}

const initialState: IStoreData = {
  basket: {}
};

function rootReducer(state: IStoreData = initialState, action: BasketActionTypes): IStoreData {
  if (action.type === ADD_ARTICLE_IN_BASKET) {
    const { idArticle, nb, unitPrice } = action.payload;
    return produce(state, stateModifier => {
      const basket = stateModifier.basket;
      basket[idArticle] != null
        ? basket[idArticle] = { ...basket[idArticle], nb: basket[idArticle].nb + nb }
        : basket[idArticle] = { idArticle, nb, unitPrice };
    });
  };

  return state;
};
export default rootReducer;