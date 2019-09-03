import * as React from "react";
import * as yup from "yup"; // for everything
import useForm from "react-hook-form";
import styled from "styled-components";
import { ObjectErrorMessages } from "react-hook-form/dist/types";
import { FaCheck, FaTimes } from "react-icons/fa";

interface ICreateProfileFormData {
    name: string;
    email: string;
    confirmEmail: string;
    password: string;
    acceptConditions: boolean;
}

const regexContainsAtLeastOneLowerCharacter = /(?=.*[a-z])/;
const regexContainsAtLeastOneUpperCharacter = /(?=.*[A-Z])/;
const regexContainsAtLeastOneDigit = /(?=.*[0-9])/;
const regexContainsAtLeastOneSpecialCharacter = /(?=.[!@#\$%\^&])/;

const createUserSchema = yup.object<ICreateProfileFormData>({
    name: yup.string()
        .trim()
        .required("Le nom est requis"),
    email: yup.string()
        .trim()
        .email("La saisie doit correspondre à une adresse email")
        .matches(/(org)|(com)|(fr)$/, "L'adresse email doit se terminer en .org, .com ou .fr")
        .required("L'adresse email est requise"),
    confirmEmail: yup.string()
        .test("same-email", "L'adresse email doit être identique", function (value: string): boolean {
            return this.parent.email === value;
        }),
    password: yup.string()
        .min(6, "La longueur du mot de passe doit faire minimum 6 caractères")
        .max(50, "La longueur du mot de passe ne peut pas excéder 50 caractères")
        .matches(regexContainsAtLeastOneLowerCharacter, "Le mot de passe doit contenir au moins une minuscule")
        .matches(regexContainsAtLeastOneUpperCharacter, "Le mot de passe doit contenir au moins une majuscule")
        .matches(regexContainsAtLeastOneDigit, "Le mot de passe doit contenir au moins un chiffre")
        .matches(regexContainsAtLeastOneSpecialCharacter, "Le mot de passe doit contenir au moins un caractère spécial"),
    acceptConditions: yup.boolean()
        .required("Les conditions générales doivent être acceptées pour continuer")
        .oneOf([true], "Les conditions générales doivent être acceptées pour continuer")
});

const FormRow = styled.div`
    margin-top:10px;
    width:800px;
    display:flex;
`;
const FormLabel = styled.div`
    width:250px;
`;
const FormInlineErrorMessage = styled.div`
    width:800px;
    color:red;
`;

interface IFieldErrorProps {
    errors: ObjectErrorMessages<ICreateProfileFormData>;
    fieldName: string;
}
export const FieldError: React.FC<IFieldErrorProps> = ({ errors, fieldName }) => {
    if (errors[fieldName]) { console.error(errors[fieldName]); }
    return <>
        {errors && errors[fieldName] && errors[fieldName] && errors[fieldName].message &&
            <FormInlineErrorMessage>{errors[fieldName].message}</FormInlineErrorMessage>
        }
    </>;
}

export const CreateProfile: React.FC = () => {

    const { register, handleSubmit, errors, watch } = useForm<ICreateProfileFormData>({
        mode: "onBlur",
        validationSchema: createUserSchema
    });
    const passwordData = watch("password", "");
    const [completedData, setCompletedData] = React.useState<ICreateProfileFormData>(null);

    // tslint:disable-next-line:typedef
    const afterSubmit = (data: any) => {
        setCompletedData(data);
    };

    const checkCriteria = (testRegex: RegExp, value: string, label: string) => {
        const isValid = testRegex.test(value);
        return <span style={{ color: isValid ? "green" : "red", marginRight: "10px" }}>
            {!isValid && <FaTimes />}
            {isValid && <FaCheck />}
            {label}
        </span>
    }

    if (completedData) {
        return <>
            <p>Formulaire complété</p>
            <pre>{JSON.stringify(completedData, undefined, 3)}</pre>
        </>
    }

    return (
        <form onSubmit={handleSubmit(afterSubmit)}>
            <FormRow>
                <FormLabel>Nom</FormLabel>
                <input ref={register} name="name" type="text" />
            </FormRow>
            <FieldError errors={errors} fieldName="name" />

            <FormRow>
                <FormLabel>Email</FormLabel>
                <input ref={register} name="email" type="text" />
            </FormRow>
            <FieldError errors={errors} fieldName="email" />

            <FormRow>
                <FormLabel>Confirmation email</FormLabel>
                <input ref={register} name="confirmEmail" type="text" />
            </FormRow>
            <FieldError errors={errors} fieldName="confirmEmail" />


            <FormRow>
                <FormLabel>Mot de passe</FormLabel>
                <input ref={register} name="password" type="text" />
            </FormRow>

            {/* Du flexbox aurait été plus adapté */}
            <table>
                <tr>
                    <td>{checkCriteria(/^.{6,}$/, passwordData, "Minimum 6 caractères")}</td>
                    <td>{checkCriteria(/^.{0,20}$/, passwordData, "Maximum 20 caractères")}</td>
                    <td>{checkCriteria(regexContainsAtLeastOneSpecialCharacter, passwordData, "Caractère spécial")}</td>
                </tr>
                <tr>
                    <td>{checkCriteria(regexContainsAtLeastOneDigit, passwordData, "Caractère numérique")}</td>
                    <td>{checkCriteria(regexContainsAtLeastOneLowerCharacter, passwordData, "Caractère minuscule")}</td>
                    <td>{checkCriteria(regexContainsAtLeastOneUpperCharacter, passwordData, "Caractère majuscule")}</td>
                </tr>
            </table>

            <FormRow>
                <FormLabel>Accepter les conditions</FormLabel>
                <input ref={register} name="acceptConditions" type="checkbox" />
            </FormRow>
            <FieldError errors={errors} fieldName="acceptConditions" />

            <FormRow>
                <input type="submit" />
            </FormRow>
        </form>
    );
};
export default CreateProfile;

