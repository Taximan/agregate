import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './submission.css';
import { Formik } from 'formik';
import { FormTextInput, FormTextArea } from '../form/FormikBindings';
import * as yup from 'yup';

// eslint-disable-next-line
const urlRegex = /^[a-zA-Z0-9]+\:\/\/[a-zA-Z0-9]+\.[-a-zA-Z0-9]+\.?[a-zA-Z0-9]+$|^[a-zA-Z0-9]+\.[-a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const schema = yup.object({
    description: yup.string().min(12, 'Zbyt krótki opis'),
    title: yup.string().min(3, 'Zbyt krótki tytuł'),
    url: yup.string().matches(urlRegex, 'Nieprawidłowy URL')
});

class SubmissionsPage extends Component {

    handleSubmit = async (values, actions) => {
        try {

            await Axios.post('/Agregate/Api/Submission/AddSubmission.php', {
                title: values.title,
                url: values.url,
                description: values.description
            });

            actions.setSubmitting(false);

            this.props.history.push('/');

        } catch(ex) {
            console.log(ex);
        }
    }

    render() {
        return (
            <div className="add-submission-page-wrapper">
                <h3>Dodaj</h3>
                <Formik
                    validationSchema={schema}
                    onSubmit={this.handleSubmit}
                    initialValues={{ description: '', url: '', title: '' }}
                >
                    {props =>
                        <form onSubmit={props.handleSubmit}>
                            <FormTextInput field="title" label="Tytuł" type="text" autoFocus={true} formik={props} />
                            <FormTextInput field="url" label="URL" type="text" formik={props} />
                            <FormTextArea field="description" label="Opis" type="text" formik={props} />
                            <input
                                className="btn btn-primary"
                                type="submit"
                                value="Dodaj!"
                                disabled={props.isSubmitting}
                            />
                        </form>
                    }
                </Formik>
            </div>
        );
    }
}

export default compose(
    withRouter
)(SubmissionsPage);