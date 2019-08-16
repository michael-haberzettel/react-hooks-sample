import * as React from "react";
import { store } from "../../store";
import { addArticleInBasket } from "../../actions";
import { FaMinusCircle, FaPlusCircle, FaShoppingCart } from "react-icons/fa";
import LabelButton from "../shared/label-button";
import { useToasts } from 'react-toast-notifications'
import { ArticleContainer, ArticleLabel, ArticleLabelInBasket } from "./atoms";

interface IArticleProps {
    displayName: string;
    id: string;
    price: number;
    currency: string;
    nbInBasket: number;
}

export const Article: React.FC<IArticleProps> = props => {

    const { addToast } = useToasts();

    const [numberArticlesToAdd, setNumberArticlesToAdd] = React.useState(0);
    const incrementNbArticlesToAdd = (newValue: number) => {

        if (newValue < 0) {
            addToast('Quantité négative impossible', {
                appearance: 'error', 
                autoDismiss: true,
                pauseOnHover: false
            })
        }

        const newEffectiveValue = newValue >= 0 ? newValue : 0;
        setNumberArticlesToAdd(newEffectiveValue);
    }

    const modifyFromTextNbArticlesToAdd = (newValue: string) => {
        const parsedValue = parseInt(newValue);
        incrementNbArticlesToAdd(parsedValue);
    }

    const addArticlesToBasket = (numberArticlesToAdd: number) => {
        store.dispatch(addArticleInBasket({
            idArticle: props.id,
            nb: numberArticlesToAdd,
            unitPrice : props.price
        }))

        setNumberArticlesToAdd(0);
    }

    const { displayName, price, currency, nbInBasket } = props
    return (
        <ArticleContainer>

            <ArticleLabel>{displayName} -  {price} {currency}</ArticleLabel>
            <LabelButton onClick={() => incrementNbArticlesToAdd(numberArticlesToAdd - 1)}><FaMinusCircle style={{ color: 'red' }} /></LabelButton>
            <input type="text"
                value={numberArticlesToAdd}
                onChange={e => modifyFromTextNbArticlesToAdd(e.target.value)}
                style={{ width: 40 }} />
            <LabelButton onClick={() => incrementNbArticlesToAdd(numberArticlesToAdd + 1)}><FaPlusCircle style={{ color: 'green' }} /></LabelButton>

            <LabelButton style={{ marginLeft: 10 }} onClick={() => addArticlesToBasket(numberArticlesToAdd)}><FaShoppingCart style={{ color: 'gray' }}/></LabelButton>

            <ArticleLabelInBasket>Panier : {nbInBasket}</ArticleLabelInBasket>
        </ArticleContainer>
    );

}
