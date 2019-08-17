import * as React from 'react';
import { IArticle, getArticles } from '../../services/articlesApi';
import { store } from '../../store';
import { connect } from 'react-redux';
import { IStoreData } from '../../reducers';
import { Article } from './article';
import { ArticlesContainer, TotalNumberArticles, ArticlesBuyArea, ArticlesList } from './atoms';
import produce from 'immer';
import ArticlesFilters from './articles-filters';

interface IArticlesPropsFromStore {
    nbTotal: number;
}

interface IFIlters {
    [name: string]: {
        label: string;
        name: string;
        isChecked: boolean;
    }
}

const useOneTimeEffect = (callback: React.EffectCallback) => React.useEffect(callback, []);

const Articles: React.FC<IArticlesPropsFromStore> = props => {
    const [allArticles, setAllArticles] = React.useState<Array<IArticle>>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [filters, setFilters] = React.useState<IFIlters>({});

    useOneTimeEffect(() => {
        getArticles().then(fetchedArticles => {
            const defaultFilters = fetchedArticles.reduce<IFIlters>((acc, currentValue) => {
                if (acc[currentValue.category] == null) {
                    acc[currentValue.category] = {
                        isChecked: true,
                        label: currentValue.category,
                        name: currentValue.category
                    }
                }
                return acc;
            }, {});
            setFilters(defaultFilters);
            setAllArticles(fetchedArticles);
            setIsLoading(false);
        });
    });

    const changeFilterCheck = (filterName: string, newState: boolean) => {
        const newFiltersState = produce(filters, modifier => { modifier[filterName].isChecked = newState; });
        setFilters(newFiltersState);
    }

    const filteredArticles = allArticles.filter(article => filters[article.category].isChecked);

    if (isLoading) {
        return (<>Chargement en cours...</>);
    }

    const articlesInStore = store.getState().basket;
    return <ArticlesContainer>
        <ArticlesBuyArea>
            <ArticlesFilters
                filters={filters}
                onChangeFilter={(filterName, newState) => changeFilterCheck(filterName, newState)}
            />
            <ArticlesList>
                {filteredArticles.map(article => <Article
                    key={article.id}
                    id={article.id}
                    displayName={article.name}
                    price={article.price}
                    nbInBasket={articlesInStore[article.id] != null ? articlesInStore[article.id].nb : 0}
                    currency="€" />
                )}
            </ArticlesList>
        </ArticlesBuyArea>
        <TotalNumberArticles>Nombre total : {props.nbTotal}</TotalNumberArticles>
    </ArticlesContainer>
}

function mapStateToProps(appState: IStoreData): IArticlesPropsFromStore {
    return {
        nbTotal: Object.values(appState.basket)
            .reduce((acc, value) => acc + value.nb, 0)
    }
}

const reduxWrappedComponent = connect(mapStateToProps);
export default reduxWrappedComponent(Articles);