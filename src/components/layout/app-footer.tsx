import * as React from "react";
import { IStoreData } from "../../reducers";
import { connect } from "react-redux";
import { FooterContainer, FooterTotalPrice, FooterCopyright } from "./atoms";

interface IAppFooterPropsFromStore {
    totalPrice: number;
}

const AppFooter: React.FC<IAppFooterPropsFromStore> = props => {
    return (
        <FooterContainer>
            <FooterCopyright>No Copyright</FooterCopyright>
            <FooterTotalPrice> Prix total : <strong style={{color:'#900'}}>{props.totalPrice.toFixed(2)}€</strong></FooterTotalPrice>
        </FooterContainer>
    );
}

function reduxMapStateToProps(appState: IStoreData): IAppFooterPropsFromStore {
    return {
        totalPrice: Object.values(appState.basket)
            .reduce((acc, value) => acc + value.nb * value.unitPrice, 0)
    }
}

const reduxComponentWrapper = connect(reduxMapStateToProps);
export default reduxComponentWrapper(AppFooter);