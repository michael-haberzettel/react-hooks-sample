import * as React from 'react';
import { IArticle, getArticles } from '../../services/articlesApi';
import { store } from '../../store';
import { connect } from 'react-redux';
import { IStoreData } from '../../reducers';
import { Article } from './article';
import styled from 'styled-components';

export interface IArticlesPropsFromStore {
    nbTotal: number;
}

const ArticlesContainer = styled.div`
    margin:5px;
    border:1px solid gray;
    padding:5px;
    display:flex;
    flex-direction:column;
`;

const TotalNumberArticles = styled.div`
    margin-top:40px;
`;

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
            nbInBasket={articlesInStore[article.id] != null ? articlesInStore[article.id] : 0}
            currency="€" />
        )}
        <TotalNumberArticles>Nombre total : {props.nbTotal}</TotalNumberArticles>
    </ArticlesContainer>
}

function select(appState: IStoreData) : IArticlesPropsFromStore {
    return {
        nbTotal: Object.entries(appState.basket)
            .map(entry => entry[1])
            .reduce((acc, value) => acc + value, 0)
    }
}

// here we call `connect` and pass it our select function
// which in turn returns a function.
const ourWrapperFunction = connect(select);

// now we pass our component to this new function which
// will return a connected component that can now be
// used by other components.
export default ourWrapperFunction(Articles);