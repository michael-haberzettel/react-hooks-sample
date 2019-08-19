import * as React from 'react';
import { getArticles } from '../../services/articlesApi';
import { useOneTimePromise } from '../../hooks/use-onetime-promise';
import { useToasts } from 'react-toast-notifications';
import { IStoreData, IStoreBasketArticle } from '../../reducers';
import { connect } from 'react-redux';
import { store } from '../../store';
import { removeArticleInBasket } from '../../actions';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { BorderedButton } from '../_layout/atoms';

interface IBasketPropsFromStore {
    articles: IStoreBasketArticle
}

const BasketTable = styled.table`
    border-collapse: collapse;   
    td, th {
        padding:5px;
        border:1px solid silver;
    }
`;

const RemoveBasketButton = styled(BorderedButton)`
    color:red;
`;

const BasketContent: React.FC<IBasketPropsFromStore> = props => {
    const { data, isError, isLoading } = useOneTimePromise(() => getArticles());
    const { addToast } = useToasts();

    const removeArticle = (articleId: string, nb: number) => {
        store.dispatch(removeArticleInBasket({
            idArticle: articleId,
            nb: nb,
        }));
        addToast('Article supprimé du panier', {
            appearance: 'info',
            autoDismiss: true,
            pauseOnHover: false
        });
    }

    if (isError) {
        return (<>Une erreur est survenue lors du chargement</>);
    }
    if (isLoading || data == null) {
        return (<>Chargement en cours...</>);
    }

    const userArticles = Object.values(props.articles).map(articleInBasket => {
        const articleNameIfExists = data.find(articleInApi => articleInApi.id === articleInBasket.idArticle);
        return { ...articleInBasket, name: articleNameIfExists != null ? articleNameIfExists.name : 'Article inconnu' }
    })

    if (userArticles.length === 0) {
        return (<>Aucun article dans le panier.</>);
    }

    return <BasketTable>
        <thead>
            <tr>
                <th>Nom d'article</th>
                <th>Nombre</th>
                <th>Prix unitaire</th>
                <th>Total</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {userArticles.map(article => (
                <tr key={article.idArticle}>
                    <td>{article.name}</td>
                    <td>{article.nb}</td>
                    <td>{article.unitPrice}€</td>
                    <td>{(article.unitPrice * article.nb).toFixed(2)}€</td>
                    <td>
                        <RemoveBasketButton onClick={() => removeArticle(article.idArticle, article.nb)}>
                            <FaTimes/> Supprimer
                        </RemoveBasketButton>
                    </td>
                </tr>)
            )}
        </tbody>
    </BasketTable>
}

function mapStateToProps(appState: IStoreData): IBasketPropsFromStore {
    return {
        articles: appState.basket
    }
}

const reduxWrappedComponent = connect(mapStateToProps);
export default reduxWrappedComponent(BasketContent);
