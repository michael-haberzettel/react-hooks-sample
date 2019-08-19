import styled from "styled-components";
import { darken } from 'polished';

type BadgeExtraProps = {
    value: number;
    textcolor: string;
    backgroundcolor: string;
}

const Badge = styled.span<BadgeExtraProps>`
    position:relative;
    :after {
        content:'${props => props.value}';
        position:absolute;
        top:-10px;
        right:-10px;
        font-size:.7em;
        background:${ props => props.backgroundcolor};
        color:${ props => props.textcolor};
        width:18px;height:18px;
        text-align:center;
        line-height:18px;
        border-radius:50%;
        box-shadow:0 0 1px ${props => darken(0.5, props.backgroundcolor)};
    }
`;

export default Badge;