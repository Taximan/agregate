import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getSession } from '../../reducers';

class Nav extends Component {

    handleUserLogoutRequest = () => {
        this.props.history.push('/auth/logout');
    }

    render() {
        const { isLoggedIn } = this.props;
        const authButton = this.renderAuthButton(isLoggedIn);

        return (
            <nav className="navbar navbar-light bg-light">
                <Link className="navbar-brand" to="/">Aggregate</Link>
                <ul className="navbar-nav navbar-items-container-custom">
                    <li className="nav-item active">
                        {authButton}
                    </li>
                </ul>
            </nav>
        );
    }

    renderAuthButton(isLoggedIn) {
        if (isLoggedIn) {
            return (
                <button className="btn btn-primary" onClick={this.handleUserLogoutRequest}>
                    Wyloguj się
                </button>
            )
        } else {
            return (
                <Link className="btn btn-primary" role="button" to="/auth/login">
                    Zaloguj się
                </Link>
            );
        }
    }

}

export default compose(
    withRouter,
    connect(getSession)
)(Nav);