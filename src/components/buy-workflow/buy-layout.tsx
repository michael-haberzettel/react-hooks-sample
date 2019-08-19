import * as React from 'react';
import PageTitle from '../shared/page-title';
import { Link } from 'react-router-dom';
import ProgressBar, { IProgressBarItemProps } from './progressbar-item';
import StepDisplayBasket from './step-display-basket';
import StepDisplayMessage from './step-display-message';

const step1: IProgressBarItemProps = { isActive: true, label: 'Panier' };
const step2: IProgressBarItemProps = { isActive: false, label: 'Résumé' };
const step3: IProgressBarItemProps = { isActive: false, label: 'Confirmation d\'achat' };

const BuyLayout: React.FC = () => {


    const [currentStep, setCurrentStep] = React.useState(step1);
    const [buySteps, setBuySteps] = React.useState([step1, step2, step3]);

    const indexCurrentStep = buySteps.findIndex(step => step.label === currentStep.label);
    const defineNewCurrentStep = (newCurrentStep: IProgressBarItemProps) => {
        const newBuyStates = buySteps.map(step => ({ ...step, isActive: step.label === newCurrentStep.label }));
        debugger;
        setCurrentStep(newCurrentStep);
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

    const isFirstStep = indexCurrentStep === 0;
    const isLastStep = indexCurrentStep === buySteps.length - 1;
    const actions = {
        goNextStep: () => goToNextStep(),
        goPreviousStep: () => goToPreviousStep()
    }

    return <>
        <PageTitle>Etapes d'achat</PageTitle>
        <p>
            Espace qui permet d'acheter les articles sélectionnés du <Link to="/basket">panier personnel</Link>.
        </p>

        <ProgressBar steps={buySteps} />

        {currentStep.label === step1.label && <StepDisplayBasket isFirstStep={isFirstStep} isLastStep={isLastStep} actions={actions} />}
        {currentStep.label === step2.label && <StepDisplayMessage contentOfStep="Etape 2" isFirstStep={isFirstStep} isLastStep={isLastStep} actions={actions} />}
        {currentStep.label === step3.label && <StepDisplayMessage contentOfStep="Etape 3" isFirstStep={isFirstStep} isLastStep={isLastStep} actions={actions} />}

    </>
}

export default BuyLayout;