import * as React from 'react';
import { IStepProps } from './typing';
import { BorderedButton } from '../../layout/atoms';

export interface IStepDisplayMessageProps extends IStepProps {
    contentOfStep: string;
}

export const StepDisplayGenericMessage: React.FC<IStepDisplayMessageProps> = props => {

    return <>
        <p>
            {props.contentOfStep}
        </p>
        <br />
        {!props.isFirstStep && (
            <BorderedButton
                disabled={props.isFirstStep}
                style={{marginRight: '40px'}}
                onClick={() => props.actions.goPreviousStep()}>
                Etape précédente
            </BorderedButton>
        )}

        {!props.isLastStep && (
            <BorderedButton
                onClick={() => props.actions.goNextStep()}>
                Etape suivante
            </BorderedButton>
        )}
    </>;
}

export default StepDisplayGenericMessage;