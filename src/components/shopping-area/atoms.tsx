import styled from "styled-components";

export const ArticlesContainer = styled.div`
    padding:5px;
`;

export const ArticlesList = styled.div`
    background-color:#FFF;
    border:1px solid silver;
    padding:4px;
    flex:1;
`;

export const ArticlesBuyArea = styled.div`
    display:flex;
    flex-direction:column;
`;

export const BlocArticlesFilters = styled.div`
    background-color:#EEE;
    border:1px solid silver;
    width:auto;
    padding:4px;
`;

export const FiltersList = styled.div`
    display:flex;
    flex-flow:row;

    * {
        /* marge pour décaler les filtres. */
        margin-left:10px;
    }
`;

export const TotalNumberArticles = styled.div`
    margin-top:20px;
`;

export const ArticleContainer = styled.div`
    display:flex;
    margin-top:4px;
`;

export const ArticleLabel = styled.span`
    width:200px;
`;