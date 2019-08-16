import { AddArticleInBasket, IArticlePayload, ADD_ARTICLE_IN_BASKET, RemoveArticleInBasket, REMOVE_ARTICLE_IN_BASKET } from "../constants/action-types";


export function addArticleInBasket(payload: IArticlePayload): AddArticleInBasket {
    return { type: ADD_ARTICLE_IN_BASKET, payload }
};

export function removeArticleInBasket(payload: IArticlePayload): RemoveArticleInBasket {
    return { type: REMOVE_ARTICLE_IN_BASKET, payload }
};