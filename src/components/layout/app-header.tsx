import * as React from "react";
import { FaHome, FaShoppingBasket, FaUser } from "react-icons/fa";
import { IStoreData } from "../../reducers";
import { connect } from "react-redux";
import Badge from "../shared/badge";
import { HeaderContainer, HeaderLeftSide, HeaderLink, HeaderCenterSide, HeaderRightSide, LinkUser } from "./atoms";


interface IAppHeaderPropsFromStore {
    nbDifferentArticles: number;
}

const AppHeader: React.FC<IAppHeaderPropsFromStore> = props => {

    //const { displayName, price, currency, nbInBasket } = props
    return (
        <HeaderContainer>
            <HeaderLeftSide>
                <HeaderLink hovercolor="#CCC" to="/"><FaHome /></HeaderLink>
            </HeaderLeftSide>
            <HeaderCenterSide>
                Site de test
            </HeaderCenterSide>
            <HeaderRightSide>
                <HeaderLink hovercolor="#FCC" to="/">
                    <FaShoppingBasket />
                    <Badge 
                        textcolor="white" 
                        backgroundcolor="#fc0000" 
                        value={props.nbDifferentArticles} 
                        style={{ top: '24px', left: '2px' }} />
                </HeaderLink>
                <LinkUser hovercolor="#FCC" to="/profil"><FaUser /></LinkUser>
            </HeaderRightSide>
        </HeaderContainer>
    );
}

function reduxMapStateToProps(appState: IStoreData): IAppHeaderPropsFromStore {
    return {
        nbDifferentArticles: Object.values(appState.basket)
            .reduce((acc, value) => acc + 1, 0)
    }
}

const reduxComponentWrapper = connect(reduxMapStateToProps);
export default reduxComponentWrapper(AppHeader);