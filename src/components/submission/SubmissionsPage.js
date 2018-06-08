import React, { Component } from 'react';
import Submission from './Submission';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLoggedIn } from '../../reducers';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { sleep } from '../../lib/util';

class SubmissionsPage extends Component {
    state = {
        submissions: [],
        errorMsg: null,
        isFetching: true
    }

    async componentDidMount() {
        try {
            await sleep(500);
            const resp = await Axios.get('Agregate/Api/Submission/ListSubmissions.php')
            this.setState({ isFetching: false, submissions: resp.data });
        } catch (ex) {
            this.setState({ errorMsg: 'Nie udało się pobrać linków!', isFetching: false });
            console.log(ex);
        }
    }

    redirectIfNotLoggedIn = () => {
        if (!this.props.isLoggedIn) {
            this.props.history.push('/auth/login');
        }
    }

    handleSubmissionUpvote = (submissionId) => {
        this.redirectIfNotLoggedIn();
        console.log('upvote btn has been pressed', submissionId);
    }

    handleSubmissionDownVote = (submissionId) => {
        this.redirectIfNotLoggedIn();
        console.log('downvote pbnt pressed', submissionId);
    }

    handleVoteCancelation = (submissionId) => {
        this.redirectIfNotLoggedIn();
        console.log('vote to be cancelled', submissionId);
    }

    render() {
        const {
            errorMsg,
            isFetching
        } = this.state;

        return (
            <div>
                {isFetching && <div className="alert alert-info" role="alert">
                    Pobieram
                </div>}
                {errorMsg && <div className="alert alert-warning" role="alert">
                    {errorMsg}
                </div>}
                <Submission
                    id={3}
                    userVote={-1}
                    rating={13}
                    createdAt={new Date()}
                    user={{ name: 'dawid' }}
                    title="Jakaś tam sobie wyszukiwarka"
                    description="Ayoo"
                    url="http://google.pl"
                    onCancelVote={this.handleVoteCancelation}
                    onUpVote={this.handleSubmissionUpvote}
                    onDownVote={this.handleSubmissionDownVote}
                />
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(getLoggedIn)
)(SubmissionsPage);