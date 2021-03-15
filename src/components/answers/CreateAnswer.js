import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAnswer } from '../../redux/actions/answerActions'
import { isLoaded } from 'react-redux-firebase'


class CreateAnswer extends Component {

    // ------------- STATE AND FUNCTIONS -------------

    state = {
        questionID: this.props.questionID,
        answer:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createAnswer(this.state)
        // Reset state
        this.setState({
            questionID: this.props.questionID,
            answer:''
        })
        e.target.reset()
    }

    // -----------------------------------------------

    render() {
        const { profile } = this.props
        
        if (isLoaded(profile)) {
            return (
                <div className="card white lighten-4 z-depth-0">
                    <div className="card-content">
                        <p>Comment as <span className="bold ">{profile.firstName} {profile.lastName}</span></p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <textarea onChange={this.handleChange} placeholder="Write your answer..." id="answer" className="brown-text text-darken-3"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn deep-orange lighten-1 white-text waves-effect right">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return(
                null
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.auth.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAnswer: (answer) => dispatch(createAnswer(answer))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAnswer)
