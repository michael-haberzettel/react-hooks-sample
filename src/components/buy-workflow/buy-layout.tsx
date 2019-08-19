import * as React from 'react';
import PageTitle from '../shared/page-title';
import { Link } from 'react-router-dom';
import ProgressBar, { IProgressBarItemProps } from './progressbar-item';
import StepDisplayBasket from './steps/step-display-basket';
import StepDisplayGenericMessage from './steps/step-display-message';
import { IStepProps } from './steps/typing';

const step1: IProgressBarItemProps = { isActive: true, label: 'Panier' };
const step2: IProgressBarItemProps = { isActive: false, label: 'Résumé' };
const step3: IProgressBarItemProps = { isActive: false, label: 'Confirmation d\'achat' };

const BuyLayout: React.FC = () => {
    const [buySteps, setBuySteps] = React.useState([step1, step2, step3]);

    const currentStep = buySteps.find(step => step.isActive) || step1;
    const indexCurrentStep = buySteps.findIndex(step => step.label === currentStep.label);
    const isStep = (stepToCompare: IProgressBarItemProps) => currentStep.label === stepToCompare.label;
    const defineNewCurrentStep = (newCurrentStep: IProgressBarItemProps) => {
        const newBuyStates = buySteps.map(step => ({ ...step, isActive: step.label === newCurrentStep.label }));
        setBuySteps(newBuyStates);
    }

    const goToPreviousStep = () => {
        if (indexCurrentStep > 0) {
            defineNewCurrentStep(buySteps[indexCurrentStep - 1]);
        }
    }
    const goToNextStep = () => {
        if (indexCurrentStep + 1 < buySteps.length) {
            defineNewCurrentStep(buySteps[indexCurrentStep + 1]);
        }
    }

    const commonStepProps: IStepProps = {
        isFirstStep: indexCurrentStep === 0,
        isLastStep: indexCurrentStep === buySteps.length - 1,
        actions : {
            goNextStep: () => goToNextStep(),
            goPreviousStep: () => goToPreviousStep()
        }
    }
    return <>
        <PageTitle>Etapes d'achat</PageTitle>
        <p>
            Espace qui permet d'acheter les articles sélectionnés du <Link to="/basket">panier personnel</Link>.
        </p>

        <ProgressBar steps={buySteps} />

        {isStep(step1) && <StepDisplayBasket {...commonStepProps} />}
        {isStep(step2) && <StepDisplayGenericMessage contentOfStep="Etape de résumé" {...commonStepProps} />}
        {isStep(step3) && <StepDisplayGenericMessage contentOfStep="Etape de fin" {...commonStepProps} />}
    </>
}

export default BuyLayout;