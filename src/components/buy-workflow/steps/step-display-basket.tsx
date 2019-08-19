import * as React from 'react';
import BasketContent from '../../profil-area/basket-content';
import { IStepProps } from './typing';
import { IStoreData, IStoreBasketArticle } from '../../../reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BorderedButton } from '../../layout/atoms';

interface IStepDisplayBasketPropsFromStore {
    basket: IStoreBasketArticle;
}

interface IStepDisplayBasketProps extends IStepDisplayBasketPropsFromStore, IStepProps {

}

const StepDisplayBasket: React.FC<IStepDisplayBasketProps> = props => {

    const hasNoArticleInBasket = Object.values(props.basket).length === 0;
    return <>
        <BasketContent />

        {hasNoArticleInBasket && <p style={{color:'red'}}>Veuillez acheter au moins un article <Link to="/shopping">en boutique</Link> pour continuer</p>}

        <br/>
        <BorderedButton disabled={hasNoArticleInBasket} onClick={() => props.actions.goNextStep()}>Etape suivante</BorderedButton>
    </>;
}

function mapStateToProps(appState: IStoreData): IStepDisplayBasketPropsFromStore {
    return {
        basket: appState.basket
    }
}

const reduxWrappedComponent = connect(mapStateToProps);
export default reduxWrappedComponent(StepDisplayBasket);