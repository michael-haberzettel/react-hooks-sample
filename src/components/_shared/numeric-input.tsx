import * as React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import LabelButton from "./label-button";
import styled from "styled-components";

interface NumericInputProps {
    value: number;
    step: number;
    beforeValueChanged(newValueAttempt: number): boolean
    onValueChanged: (oldValue: number, newValue: number) => void;
}

const radiusSize = 5;
const MinusButton = styled(LabelButton)`
    border: 1px solid gray;
    border-right: none;
    border-top-left-radius: ${radiusSize}px;
    border-bottom-left-radius: ${radiusSize}px;

    svg {
        color:red;
    }
`;

const PlusButton = styled(LabelButton)`
    border: 1px solid gray;
    border-left: none;
    border-top-right-radius: ${radiusSize}px;
    border-bottom-right-radius: ${radiusSize}px;

    svg {
        color:green;
    }
`;

const InternalNumericInput = styled.input`
    padding-left: 5px;
    padding-right: 5px;
    text-align: right;
    width:40px;
    border: 1px solid gray;
`;

const NumericInput: React.FC<NumericInputProps> = props => {

    const incrementNumber = (newValue: number) => {
        if (props.beforeValueChanged(newValue)) {
            props.onValueChanged(props.value, newValue);
        }
    }

    const modifyFromText = (newValue: string) => {
        const parsedValue = parseInt(newValue);
        incrementNumber(parsedValue);
    }

    return (
        <>
            <MinusButton onClick={() => incrementNumber(props.value - props.step)}><FaMinusCircle /></MinusButton>
            <InternalNumericInput type="text"
                value={props.value}
                onChange={e => modifyFromText(e.target.value)} />
            <PlusButton onClick={() => incrementNumber(props.value + props.step)}><FaPlusCircle /></PlusButton>
        </>
    );

}

export default NumericInput;