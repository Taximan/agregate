import React, { Component } from 'react';
import Submission from './Submission';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLoggedIn } from '../../reducers';
import { withRouter } from 'react-router-dom';

class SubmissionsPage extends Component {
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
        return (
            <div>
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