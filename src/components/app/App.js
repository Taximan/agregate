import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer'
import SubmissionsPage from '../submission/SubmissionsPage';
import NoSuchPage from '../404/NoSuchPage';
import LoginPage from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import './app.css';
import LogoutPage from '../auth/LogoutPage';
import AddSubmissionPage from '../submission/AddSubmissionPage';

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav />
                <main className="main-content-wrapper">
                    <Switch>
                        <Route path="/" component={SubmissionsPage} exact />
                        <Route path="/add-submisson" component={AddSubmissionPage} />
                        <Route path="/auth/login" component={LoginPage} />
                        <Route path="/auth/register" component={RegisterPage} />
                        <Route path="/auth/logout" component={LogoutPage} />
                        <Route component={NoSuchPage} />
                    </Switch>
                </main>
                <Footer />
            </div>
        )
    }
}