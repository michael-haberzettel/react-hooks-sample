export interface IStepProps {
    isFirstStep : boolean;
    isLastStep : boolean;
    actions: {
        goNextStep: () => void;
        goPreviousStep: () => void;
    }
}