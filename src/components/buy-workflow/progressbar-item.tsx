import * as React from 'react';
import styled from 'styled-components';

export interface IProgressBarProps {
    steps: IProgressBarItemProps[];
}

export interface IProgressBarItemProps {
    label: string
    isActive: boolean;
}

const StyledProgressBar = styled.ul` 
    height:76px;
    counter-reset: step;

    li {
        list-style-type: none;
        width: 25%;
        float: left;
        font-size: 12px;
        position: relative;
        text-align: center;
        text-transform: uppercase;
        color: #7d7d7d;
    }
    li:before {
        width: 30px;
        height: 30px;
        content: counter(step);
        counter-increment: step;
        line-height: 30px;
        border: 2px solid #7d7d7d;
        display: block;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-color: white;
    }
    li:after {
        width: 100%;
        height: 2px;
        content: '';
        position: absolute;
        background-color: #7d7d7d;
        top: 15px;
        left: -50%;
        z-index: -1;
    }
    li:first-child:after {
        content: none;
    }
    li.active {
        color: green;
    }
    li.active:before {
        border-color: #55b776;
    }
    li.active + li:after {
        background-color: #55b776;
    }
`;

const ProgressBarItem: React.FC<IProgressBarItemProps> = props => {
    return <li className={props.isActive ? 'active' : ''}>{props.label}</li>
}

const ProgressBar: React.FC<IProgressBarProps> = props => {
    return <StyledProgressBar>
        {props.steps.map(step => <ProgressBarItem key={step.label} label={step.label} isActive={step.isActive} />)}
    </StyledProgressBar>
}


export default ProgressBar;