import * as React from 'react';
import PageTitle from '../shared/page-title';
import { getArticles } from '../../services/articlesApi';
import { useOneTimePromise } from '../../hooks/use-onetime-promise';
import { useToasts } from 'react-toast-notifications';
import { IStoreData, IStoreBasketArticle } from '../../reducers';
import { connect } from 'react-redux';
import { store } from '../../store';
import { removeArticleInBasket } from '../../actions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const TitleAndMainContent = <>
    <PageTitle>Panier personnel</PageTitle>
    <p>
        Espace qui permet de consulter le panier et ainsi supprimer des articles. Les éléments déjà ajoutés dans le panier
        sont synchronisés via Redux. Il est possible d'ajouter de nouveaux articles via <Link to="/shopping">le magasin</Link>.
    </p>
</>;

const Basket: React.FC<IBasketPropsFromStore> = props => {
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
        return (<>{TitleAndMainContent} Une erreur est survenue lors du chargement</>);
    }
    if (isLoading || data == null) {
        return (<>{TitleAndMainContent} Chargement en cours...</>);
    }

    const userArticles = Object.values(props.articles).map(articleInBasket => {
        const articleNameIfExists = data.find(articleInApi => articleInApi.id === articleInBasket.idArticle);
        return { ...articleInBasket, name: articleNameIfExists != null ? articleNameIfExists.name : 'Article inconnu' }
    })

    if (userArticles.length === 0) {
        return (<>{TitleAndMainContent} Aucun article dans le panier.</>);
    }

    return <>
        {TitleAndMainContent}
        <BasketTable>
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
                        <td>{article.unitPrice}</td>
                        <td>{(article.unitPrice * article.nb).toFixed(2)}</td>
                        <td><button onClick={() => removeArticle(article.idArticle, article.nb)}>Supprimer</button></td>
                    </tr>)
                )}
            </tbody>
        </BasketTable>
    </>
}

function mapStateToProps(appState: IStoreData): IBasketPropsFromStore {
    return {
        articles: appState.basket
    }
}

const reduxWrappedComponent = connect(mapStateToProps);
export default reduxWrappedComponent(Basket);
