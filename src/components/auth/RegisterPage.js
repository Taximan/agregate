import React, { Component } from 'react';
import { Formik } from 'formik';
import { FormTextInput } from '../form/FormikBindings';
import './register.css';
import * as  yup from 'yup';

const schema = yup.object({
    username: yup.string()
        .matches(/^[a-zA-Z0-9]+$/, 'Nieprawidłowa nazwa użytkownika (używaj tylko znaków alfanumerycznych)')
        .required('Nazwa użytkownika jest wymagana'),
    pass: yup.string()
        .min(8, 'Hasło musi składać się z minimum 8 znaków')
        .max(64, 'Hasło nie może zawierać niż 64 znaków')
        .matches(/[A-Z]/, 'Hasło musi zawierać conajmniej 1 dużą literę')
        .matches(/[a-z]/, 'Hasło musi zawierać conajmniej 1 małą literę')
        .matches(/\d/, 'Hasło musi zawierać conajmniej 1 cyfrę')
        .matches(/\W/, 'Hasło musi zawierać conajmniej 1 nie-alfanumeryczny znak (np. #,!, @)')
        .required('Hasło jest wymagane'),
    passConfirm: yup.string()
        .oneOf([yup.ref('pass'), null], 'Hasła się nie zgadzają')
});

const initialFormValues = { username: '', pass: '', passConfirm: '' };

export default class RegisterPage extends Component {

    handleFormSubmit = (values, actions) => {
        console.log(values, actions);
    }

    render() {
        return (
            <div className="register-page-wrapper">
                <h2>Dołącz do Aggregate</h2>

                <Formik
                    initialValues={initialFormValues}
                    onSubmit={this.handleFormSubmit}
                    validationSchema={schema}
                >
                    {props =>
                        <form onSubmit={props.handleSubmit}>
                            <FormTextInput field="username" label="Login" type="text" formik={props} autoFocus />
                            <FormTextInput field="pass" label="Hasło" type="password" formik={props} />
                            <FormTextInput field="passConfirm" label="Potwierdź hasło" type="password" formik={props} />
                            <input className="btn btn-primary" type="submit" value="Zarejestruj się!" disabled={props.isSubmitting} />
                        </form>
                    }
                </Formik>
            </div>
        )
    }
}