import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLoggedIn } from '../../reducers';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions';

class LogoutPage extends Component {

    componentWillReceiveProps(props) {
        if (!props.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    async componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.dispatch(logout());
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>wylogowywanie się...</div>
        );
    }
}

export default compose(
    withRouter,
    connect(getLoggedIn)
)(LogoutPage);