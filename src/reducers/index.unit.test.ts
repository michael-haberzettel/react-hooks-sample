import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer, { IStoreData } from '.';
import { addArticleInBasket, removeArticleInBasket } from '../actions';


describe('shopping reducer', () => {
    const add2ArticlesPayload = { idArticle: "5", nb: 3, unitPrice: 0.1 };
    const add2ArticlesAction = addArticleInBasket(add2ArticlesPayload);
    const reducerWith3Articles = rootReducer({ basket: {} }, add2ArticlesAction);

    it('should add 3 articles in empty reducer', () => {
        const expectedData: IStoreData = {
            basket: { "5": { idArticle: "5", nb: 3, unitPrice: 0.1 } }
        }
        expect(reducerWith3Articles).toMatchObject(expectedData);
    })

    const remove1ArticleAction = removeArticleInBasket({ idArticle: "5", nb: 1 });
    const reducerWith2Articles = rootReducer(reducerWith3Articles, remove1ArticleAction);
    it('should decrement articles on remaining', () => {
        const expectedData: IStoreData = {
            basket: { "5": { idArticle: "5", nb: 2, unitPrice: 0.1 } }
        }
        expect(reducerWith2Articles).toMatchObject(expectedData);
    })

    const remove2ArticleAction = removeArticleInBasket({ idArticle: "5", nb: 2 });
    const reducerWith0Article = rootReducer(reducerWith2Articles, remove2ArticleAction);
    it('should delete articles on leftover', () => {
        const expectedData: IStoreData = {
            basket: {  }
        }
        expect(reducerWith0Article).toMatchObject(expectedData);
    })
})
