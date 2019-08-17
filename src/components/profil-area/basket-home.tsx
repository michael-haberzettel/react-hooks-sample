import * as React from 'react';
import PageTitle from '../shared/page-title';
import BasketContent from './basket-content';
import { Link } from 'react-router-dom';

export const BasketHome: React.FC = () => {

    return <>
        <PageTitle>Panier personnel</PageTitle>
        <p>
            Espace qui permet de consulter le panier et ainsi supprimer des articles. Les éléments déjà ajoutés dans le panier
        sont synchronisés via Redux et il est possible d'ajouter de nouveaux articles via <Link to="/shopping">le magasin</Link>.
        </p>
        <BasketContent />
    </>
}
export default BasketHome;