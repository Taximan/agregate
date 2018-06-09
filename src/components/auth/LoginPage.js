import React, { Component } from 'react';
import { Link,  withRouter } from 'react-router-dom';
import './login.css';
// eslint-disable-next-line
import { Formik, FormikActions, withFormik } from 'formik';
import { FormTextInput } from '../form/FormikBindings';
import  { connect } from 'react-redux';
import { login } from '../../actions';
import { compose } from 'redux';
import { getSession } from '../../reducers';

class LoginPage extends Component {

    componentWillReceiveProps(props) {
        const { session, history } = props;
        if (session.user != null) {
            history.push('/');
        }
    }

    componentDidMount() {
        const { session, history } = this.props;
        if (session.user != null) {
            history.push('/');
        }
    }

    /**
     * @param {object} values
     * @param {FormikActions} actions
     */
    handleFormSubmit = async (values, actions) => {
        this.props.dispatch(login({ username: values.username, password: values.pass }));
        actions.setSubmitting(false);
    }

    render() {
        const { session } = this.props;
        const { isFetching, lastLoginErrorMessage } = session;

        return (
            <div className="login-page-wrapper">
                {lastLoginErrorMessage && <div className="alert alert-warning" role="alert">
                    {lastLoginErrorMessage}
                </div>}
                <div className="alert alert-secondary" role="alert">
                    <strong>Brak konta?</strong> Utwórz je <Link to="/auth/register">tutaj</Link>.
                </div>
                <Formik
                    initialValues={{ username: '', pass: '' }}
                    onSubmit={this.handleFormSubmit}
                >
                    {props =>
                        <form onSubmit={props.handleSubmit}>
                            <FormTextInput field="username" label="Login" type="text" formik={props} autoFocus disabled={isFetching} />
                            <FormTextInput field="pass" label="Hasło" type="password" formik={props} disabled={isFetching} />
                            <input 
                                className="btn btn-primary"
                                type="submit"
                                value="Zaloguj sie!"
                                disabled={isFetching}
                             />
                        </form>
                    }
                </Formik>
            </div>
        )
    }
}


export default compose(
    withRouter,
    connect(getSession),
)(LoginPage)