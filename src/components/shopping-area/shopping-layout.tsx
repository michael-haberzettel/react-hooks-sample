import * as React from 'react';
import Articles from './articles';
import PageTitle from '../shared/page-title';
import { Link } from 'react-router-dom';
import { BorderedLink } from '../layout/atoms';
import { FaShoppingCart } from 'react-icons/fa';


const ShoppingLayout: React.FC = () => {
    return <>
        <PageTitle>Magasin</PageTitle>
        <p>
            Espace qui permet de placer des articles dans le panier. Les éléments déjà ajoutés dans le panier 
            sont synchronisés via Redux. Il est possible de supprimer les articles dans <Link to="/basket">le panier personnel</Link>.
        </p>
        <Articles />
        <p>
            <BorderedLink to="/buy"><FaShoppingCart/> Effectuer l'achat</BorderedLink>
        </p>
    </>
}

export default ShoppingLayout;