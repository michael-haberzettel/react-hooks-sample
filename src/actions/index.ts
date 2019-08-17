import { AddArticleInBasket, IArticleAddPayload, ADD_ARTICLE_IN_BASKET, RemoveArticleInBasket, REMOVE_ARTICLE_IN_BASKET, IArticleDeletePayload } from "../constants/action-types";


export function addArticleInBasket(payload: IArticleAddPayload): AddArticleInBasket {
    return { type: ADD_ARTICLE_IN_BASKET, payload }
};

export function removeArticleInBasket(payload: IArticleDeletePayload): RemoveArticleInBasket {
    return { type: REMOVE_ARTICLE_IN_BASKET, payload }
};