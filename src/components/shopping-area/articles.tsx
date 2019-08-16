import * as React from 'react';
import { IArticle, getArticles } from '../../services/articlesApi';
import { store } from '../../store';
import { connect } from 'react-redux';
import { IStoreData } from '../../reducers';
import { Article } from './article';
import { ArticlesContainer, TotalNumberArticles } from './atoms';

interface IArticlesPropsFromStore {
    nbTotal: number;
}

const Articles: React.FC<IArticlesPropsFromStore> = props => {

    const [currentArticles, setArticles] = React.useState<Array<IArticle>>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        getArticles().then(fetchedArticles => {
            setArticles(fetchedArticles)
            setIsLoading(false);
        });
    }, []);


    if (isLoading) {
        return (<>Chargement en cours...</>);
    }

    const articlesInStore = store.getState().basket;
    return <ArticlesContainer>
        {currentArticles.map(article => <Article
            key={article.id}
            id={article.id}
            displayName={article.name}
            price={article.price}
            nbInBasket={articlesInStore[article.id] != null ? articlesInStore[article.id].nb : 0}
            currency="€" />
        )}
        <TotalNumberArticles>Nombre total : {props.nbTotal}</TotalNumberArticles>
    </ArticlesContainer>
}

function mapStateToProps(appState: IStoreData) : IArticlesPropsFromStore {
    return {
        nbTotal: Object.values(appState.basket)
            .reduce((acc, value) => acc + value.nb, 0)
    }
}

const reduxWrappedComponent = connect(mapStateToProps);
export default reduxWrappedComponent(Articles);