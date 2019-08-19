import * as React from "react";
import { store } from "../../store";
import { addArticleInBasket } from "../../actions";
import { FaShoppingCart } from "react-icons/fa";
import { useToasts } from 'react-toast-notifications';
import { ArticleContainer, ArticleLabel } from "./atoms";
import NumericInput from "../_shared/numeric-input";
import styled from "styled-components";
import { BorderedButton } from "../_layout/atoms";

interface IArticleProps {
    displayName: string;
    id: string;
    price: number;
    currency: string;
    nbInBasket: number;
}

const AddBasketButton = styled(BorderedButton)`
    margin-left:16px;
    color:#222;
`;

export const Article: React.FC<IArticleProps> = props => {
    const { addToast } = useToasts();
    const [numberArticlesToAdd, setNumberArticlesToAdd] = React.useState(0);

    const displayTimedToast = (message: string, appearance: string) => addToast(message, {
        appearance: appearance,
        autoDismiss: true,
        pauseOnHover: false
    });

    const checkNbArticlesInput = (newValue: number) => {
        const isPositiveNumber = newValue >= 0;
        if (!isPositiveNumber) {
            displayTimedToast('Quantité négative impossible', 'error');
        }

        return isPositiveNumber;
    }

    const addArticlesToBasket = (numberArticlesToAdd: number) => {
        if (numberArticlesToAdd === 0) {
            displayTimedToast('Veuillez ajouter au moins un article', 'error');
            return;
        }

        store.dispatch(addArticleInBasket({
            idArticle: props.id,
            nb: numberArticlesToAdd,
            unitPrice: props.price
        }));
        displayTimedToast('Article ajouté au panier', 'info');
        setNumberArticlesToAdd(0);
    }

    const { displayName, price, currency, nbInBasket } = props
    const displayBasketQuantityIfAny = (nbInBasket: number) => nbInBasket > 0 && <><br />(Déjà {nbInBasket})</>;

    return (
        <ArticleContainer>
            <ArticleLabel>{displayName} -  {price} {currency}</ArticleLabel>
            <NumericInput
                step={1}
                value={numberArticlesToAdd}
                beforeValueChanged={value => checkNbArticlesInput(value)}
                onValueChanged={(_, newValue) => setNumberArticlesToAdd(newValue)}
            />

            <AddBasketButton onClick={() => addArticlesToBasket(numberArticlesToAdd)}>
                <FaShoppingCart /> Au panier
                {displayBasketQuantityIfAny(nbInBasket)}
            </AddBasketButton>
        </ArticleContainer>
    );

}
