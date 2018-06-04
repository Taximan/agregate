import React from 'react';
import './submission.css';
import classNames from 'classnames';

const VOTE_BUTTON_SHARED_CLASSES = ['material-icons', 'submission-vote-icon'];
const UP_VOTE_BUTTON_BASE_CLASSES = VOTE_BUTTON_SHARED_CLASSES.concat('submission-upvote-btn');
const DOWN_VOTE_BUTTON_BASE_CLASSES = VOTE_BUTTON_SHARED_CLASSES.concat('submission-downvote-btn');

class Submission extends React.Component {
    state = {
        localUserVote: this.props.userVote,
        localRating: this.props.rating
    };

    render() {
        const {
            createdAt,
            user,
            title,
            description,
            url
        } = this.props;
        
        const { localUserVote, localRating } = this.state;
        const { name } = user;
        const ratingString = localRating > 0 ? `+${localRating}` : localRating;

        const upvoteClasses = classNames(UP_VOTE_BUTTON_BASE_CLASSES, { active: localUserVote === 1 });
        const downvoteClasses = classNames(DOWN_VOTE_BUTTON_BASE_CLASSES, { active: localUserVote === -1 });

        return (
            <div className="card submission-wrapper">
                <div className="submission-vote-bar">
                    <span className="text-muted">{ratingString}</span>
                    <i className={upvoteClasses} onClick={this.handleOnUpvoteClicked}>
                        expand_less
                    </i>
                    <i className={downvoteClasses} onClick={this.handleDownVoteClicked}>
                        expand_more
                    </i>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {createdAt.toLocaleDateString()}, przez <a href="LOL">{name}</a>
                    </h6>
                    <p className="card-text">{description}</p>
                    <div className="submission-actions">
                        <a href={url} rel="noopener noreferrer" target="_blank" className="card-link submission-action">
                            <i className="material-icons">
                                open_in_new
                            </i>
                            ZOBACZ
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    handleOnUpvoteClicked = () => {
        switch (this.state.localUserVote) {
            case 1:
                this.setState({ localUserVote: 0, localRating: this.state.localRating - 1 });
                this.props.onCancelVote(this.props.id);
                break;
            case 0:
                this.setState({ localUserVote: 1, localRating: this.state.localRating + 1 });
                this.props.onUpVote(this.props.id);
                break;
            case -1:
                this.setState({ localUserVote: 1, localRating: this.state.localRating + 2 });
                this.props.onUpVote(this.props.id);
                break;
            default:
                throw new Error(`Illegal state localUserVote = ${this.state.localUserVote}`);
        }
    }

    handleDownVoteClicked = () => {
        switch (this.state.localUserVote) {
            case -1:
                this.setState({ localUserVote: 0, localRating: this.state.localRating + 1 });
                this.props.onCancelVote(this.props.id);
                break;
            case 0:
                this.setState({ localUserVote: -1, localRating: this.state.localRating - 1 });
                this.props.onDownVote(this.props.id);
                break;
            case 1:
                this.setState({ localUserVote: -1, localRating: this.state.localRating - 2 });
                this.props.onUpVote(this.props.id);
                break;
            default:
                throw new Error(`Illegal state localUserVote = ${this.state.localUserVote}`);
        }
    }

}

export default Submission;