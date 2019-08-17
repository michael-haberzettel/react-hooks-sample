import * as React from 'react';
import Articles from './articles';
import PageTitle from '../shared/page-title';


const Shopping: React.FC = () => {
    return <>
        <PageTitle>Magasin</PageTitle>
        <p>
            Espace qui permet de placer des articles dans le panier. Les éléments déjà ajoutés dans le panier 
            sont synchronisés via Redux.
        </p>
        <Articles />
    </>
}

export default Shopping;