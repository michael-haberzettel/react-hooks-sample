import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer, { IStoreData } from '.';
import { addArticleInBasket, removeArticleInBasket } from '../actions';

function addArticlesInState(currentState: IStoreData, articleInfo: { id: string; nb: number }) {
    const addArticlesPayload = { idArticle: articleInfo.id, nb: articleInfo.nb, unitPrice: 0.1 };
    const addArticlesAction = addArticleInBasket(addArticlesPayload);
    return rootReducer(currentState, addArticlesAction);
}

function removeArticleInState(currentState: IStoreData, articleInfo: { id: string; nb: number }) {
    const removeArticlesPayload = { idArticle: articleInfo.id, nb: articleInfo.nb };
    const removeArticlesAction = removeArticleInBasket(removeArticlesPayload);
    return rootReducer(currentState, removeArticlesAction);
}

function createStoreWithArticle(articleInfo: { idArticle: string; nb: number }) : IStoreData {
    const store :IStoreData = { basket:{} };
    store.basket[articleInfo.idArticle] = { idArticle : articleInfo.idArticle, nb:articleInfo.nb,  unitPrice: 0.1 }
    return store;
}

describe('shopping reducer', () => {

    const stateWith3Articles = addArticlesInState({ basket: {} }, { id: '5', nb: 3 });
    it('should add 3 articles in empty state', () => {
        const expectedData = createStoreWithArticle({ idArticle: "5", nb: 3});
        expect(stateWith3Articles).toMatchObject(expectedData);
    });
 
    const stateWith5Articles = addArticlesInState(stateWith3Articles, { id: "5", nb: 2});
    it('should add 2 more articles in existing article', () => {
        const expectedData = createStoreWithArticle({ idArticle: "5", nb: 5});
        expect(stateWith5Articles).toMatchObject(expectedData);
    })

    const stateWith2Articles = removeArticleInState(stateWith5Articles, { id: "5", nb: 3 });
    it('should decrement articles on remaining', () => {
        const expectedData = createStoreWithArticle({ idArticle: "5", nb: 2});
        expect(stateWith2Articles).toMatchObject(expectedData);
    })

    const stateWith0Article = removeArticleInState(stateWith2Articles, { id: "5", nb: 2 });
    it('should delete articles on leftover', () => {
        expect(Object.values(stateWith0Article.basket).length).toEqual(0);
    })

    const stateWith0ArticleBis = removeArticleInState(stateWith0Article, { id: "5", nb: 2 });
    it('should do nothing when remove unkwown article', () => {
        expect(Object.values(stateWith0ArticleBis.basket).length).toEqual(0);
    })
})
