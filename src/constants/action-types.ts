export const ADD_ARTICLE_IN_BASKET = "ADD_ARTICLE_IN_BASKET";
export const REMOVE_ARTICLE_IN_BASKET = "REMOVE_ARTICLE_IN_BASKET";

export interface IArticleAddPayload {
    idArticle :string;
    nb : number;
    unitPrice: number;
}

export interface IArticleDeletePayload {
    idArticle :string;
    nb : number;
}

export  interface AddArticleInBasket {
    type: typeof ADD_ARTICLE_IN_BASKET
    payload: IArticleAddPayload
}

export  interface RemoveArticleInBasket {
    type: typeof REMOVE_ARTICLE_IN_BASKET
    payload: IArticleDeletePayload
}

export type BasketActionTypes = AddArticleInBasket | RemoveArticleInBasket