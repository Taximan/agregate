import React, { Component } from 'react';
import Submission from './Submission';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLoggedIn } from '../../reducers';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import { createCanvasElement } from './Bang';


class SubmissionsPage extends Component {
    state = {
        submissions: [],
        errorMsg: null,
        isFetching: true
    }

    constructor(props) {
        super(props);

        this.bangMount = null;
        this.setBangMount = element => {
            this.bangMount = element;
        };
    }

    async componentDidMount() {
        try {
            const resp = await Axios.get('Agregate/Api/Submission/ListSubmissions.php')
            this.setState({ isFetching: false, submissions: resp.data });
        } catch (ex) {
            this.setState({ errorMsg: 'Nie udało się pobrać linków!', isFetching: false });
            console.log(ex);
        }
        this.refs.bang.appendChild(createCanvasElement());
        this.list = window.addEventListener("resize", () => {
            console.log(this.bangMount);
            this.refs.bang.innerHTML = '';
            this.refs.bang.appendChild(createCanvasElement());
        })
    }

    componentWillUnmount() {
        window.removeEventListener(this.list);
    }

    redirectUnloggedUser = () => {
        this.props.history.push('/auth/login');
    }

    vote = async (vote, submissionId) => {
        try {
            await Axios.post('/Agregate/Api/Submission/VoteOnSubmission.php', {
                submissionId,
                vote
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    handleSubmissionUpvote = (submissionId) => {
        if (this.props.isLoggedIn) {
            this.vote(true, submissionId);
        } else {
            this.redirectUnloggedUser();
        }
    }

    handleSubmissionDownVote = (submissionId) => {
        if (this.props.isLoggedIn) {
            this.vote(false, submissionId);
        } else {
            this.redirectUnloggedUser();
        }
    }

    handleVoteCancelation = (submissionId) => {
        if (this.props.isLoggedIn) {
            this.vote(null, submissionId);
        } else {
            this.redirectUnloggedUser();
        }
    }

    render() {
        const {
            errorMsg,
            isFetching,
            submissions
        } = this.state;

        return (
            <div>
                {isFetching && <div className="alert alert-info" role="alert">
                    Pobieram
                </div>}
                {errorMsg && <div className="alert alert-warning" role="alert">
                    {errorMsg}
                </div>}
                <div ref="bang">
                </div>
                {submissions.map(sub => (
                    <Submission
                        key={sub.id}
                        id={sub.id}
                        userVote={sub.userVote}
                        rating={sub.rating}
                        createdAt={new Date(sub.createdAt)}
                        user={sub.user}
                        title={sub.title}
                        description={sub.description}
                        url={sub.url}
                        onCancelVote={this.handleVoteCancelation}
                        onUpVote={this.handleSubmissionUpvote}
                        onDownVote={this.handleSubmissionDownVote}
                    />
                ))}
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(getLoggedIn)
)(SubmissionsPage);