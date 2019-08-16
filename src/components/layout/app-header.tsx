import * as React from "react";
import { FaHome, FaShoppingBasket, FaUser } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IStoreData } from "../../reducers";
import { connect } from "react-redux";
import Badge from "../shared/badge";

type HeaderLinkExtraProps = {
    hovercolor: string;
}

export interface IAppHeaderPropsFromStore {
    nbDifferentArticles: number;
}

const HeaderContainer = styled.header`
    background-color:#444;
    color:white;
    font-size:1.2em;
    display:flex;
    width:100%;
    align-items:stretch;
`;

const HeaderLeftSide = styled.div`
    background-color:#222;
    padding: 10px;
`;

const HeaderCenterSide = styled.div`
    flex-grow:1;
    padding: 10px;
`;

const HeaderRightSide = styled.div`
    background-color:#733;
    padding: 10px;
`;

const HeaderLink = styled(Link) <HeaderLinkExtraProps>`
  :visited { color:white;  }
  :hover   { color: ${props => props.hovercolor};   }
  svg {
      color:white;
  }
`;

const LinkUser = styled(HeaderLink)`
    margin-left:20px;
`;

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
        nbDifferentArticles: Object.entries(appState.basket)
            .reduce((acc, value) => acc + 1, 0)
    }
}

const reduxComponentWrapper = connect(reduxMapStateToProps);
export default reduxComponentWrapper(AppHeader);