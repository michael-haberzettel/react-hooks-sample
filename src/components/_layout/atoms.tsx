import styled from "styled-components";
import { Link } from "react-router-dom";

type HeaderLinkExtraProps = {
    hovercolor: string;
}

export const HeaderContainer = styled.header`
    background-color:#444;
    color:white;
    font-size:1.2em;
    display:flex;
    width:100%;
    align-items:stretch;
`;

export const HeaderLeftSide = styled.div`
    background-color:#222;
    padding: 10px;
`;

export const HeaderCenterSide = styled.div`
    flex-grow:1;
    padding: 10px;
`;

export const HeaderRightSide = styled.div`
    background-color:#733;
    padding: 10px;
    padding-right:18px;
    padding-left:14px;
`;

export const HeaderLink = styled(Link) <HeaderLinkExtraProps>`
  :visited { color:white;  }
  :hover   { color: ${props => props.hovercolor};   }
  svg {
      color:white;
  }
`;

export const LinkUser = styled(HeaderLink)`
    margin-left:20px;
`;


export const FooterContainer = styled.footer`
    background-color:#DDD;
    color:#222;
    display:flex;
    width:100%;
    align-items:stretch;
`;

export const FooterCopyright = styled.div`
    flex-grow:1;
    font-weight: bold;
    padding:10px;
`;

export const FooterTotalPrice = styled.div`
    width:200px;
    text-align:right;
    background-color: #AAA;
    padding:10px;
`;

export const BorderedLink = styled(Link)`
    background-color: white;
    border: 1px solid silver;
    padding: 4px;
    border-radius:3px;
    color:black;
    svg {
        position:relative;
        top:1px;
    }

    &:hover {
        filter: brightness(85%);
        cursor: pointer;
    }

    &[disabled] {
        background-color: silver;
    }
`;

export const BorderedButton = styled.button`
    background-color: white;
    border: 1px solid silver;
    padding: 4px;
    border-radius:3px;

    svg {
        position:relative;
        top:1px;
    }

    &:hover {
        filter: brightness(85%);
        cursor: pointer;
    }

    &[disabled] {
        background-color: silver;
    }
`;