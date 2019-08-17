import * as React from "react";
import { store } from "../../store";
import { addArticleInBasket } from "../../actions";
import { FaShoppingCart } from "react-icons/fa";
import { useToasts } from 'react-toast-notifications';
import { ArticleContainer, ArticleLabel } from "./atoms";
import NumericInput from "../shared/numeric-input";
import styled from "styled-components";

interface IArticleProps {
    displayName: string;
    id: string;
    price: number;
    currency: string;
    nbInBasket: number;
}

const AddBasketButton = styled.button`
    background-color: white;
    border: 1px solid silver;
    padding: 4px;
    border-radius:3px;
    margin-left: 20px;
    min-width: 130px;
    color:#222;

    svg {
        position:relative;
        top:1px;
    }

    :hover {
        filter: brightness(85%);
        cursor: pointer;
    }
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
    return (
        <ArticleContainer>
            <ArticleLabel>{displayName} -  {price} {currency}</ArticleLabel>
            <NumericInput
                step={1}
                value={numberArticlesToAdd}
                beforeValueChanged={value => checkNbArticlesInput(value)}
                onValueChanged={(oldValue, newValue) => setNumberArticlesToAdd(newValue)}
            />

            <AddBasketButton onClick={() => addArticlesToBasket(numberArticlesToAdd)}>
                <FaShoppingCart /> Au panier
                {nbInBasket > 0 && (
                    <React.Fragment>
                        <br /> (Déjà {nbInBasket})
                    </React.Fragment>
                )}
            </AddBasketButton>
        </ArticleContainer>
    );

}
