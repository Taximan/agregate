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

    handleOpenAddSubmissionFormRequest = () => {
        this.props.history.push('/add-submisson');
    }

    render() {
        const { isLoggedIn, session } = this.props;
        const authButton = this.renderAuthButton(isLoggedIn);
        const userString = session && session.user && `/${session.user.username}`;

        return (
            <nav className="navbar navbar-light bg-light">
                <Link className="navbar-brand" to="/">Aggregate{userString}</Link>
                <ul className="navbar-nav navbar-items-container-custom">
                    {isLoggedIn && <li className="nav-item">
                        <button className="btn btn-success" onClick={this.handleOpenAddSubmissionFormRequest}>
                            Dodaj
                        </button>
                    </li>}
                    <li className="nav-item">
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