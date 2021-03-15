import React from 'react'
import AnswerList from '../answers/AnswersList'
import CreateAnswer from '../answers/CreateAnswer'
import { connect } from 'react-redux'
import moment from 'moment'
import { Redirect, Link } from 'react-router-dom'
import EditContentQuestion from './EditContentQuestion'


const QuestionDetails = (props) => {

    const { question, user } = props

    // Question Details can only be accessed if user is logged in
    if (!user) return <Redirect to='/signin' />

    // If User has a profile picture, display it in the avatar icon, else, display initials
    const avatar = question.authorProfPicURL ? (
            <span to="/dashboard" className="btn-small btn-floating z-depth-0 avatar profpic-small" style={{backgroundImage: 'url(' + question.authorProfPicURL + ')'}}></span>
    ) : (
            <span to="/dashboard" className="btn-small btn-floating teal accent-1 z-depth-0 deep-orange-text text-lighten-1 avatar">{question.authorInitials}</span>
    )
    
    // Check if question exists
    if (question) {

        return (
            <div className="container section">
                <div className="card white">
                    <div className="card-content">
                        <Link to="/">
                        <div className="back bold">
                            <p className="teal-text text-accent-1">&lt;&lt; BACK</p>
                        </div>
                        </Link>
                        <h3 className="card-title deep-orange-text text-lighten-1">{question.title}</h3>
                        <div className="post-info">
                            {avatar}
                            <p className="brown-text text-darken-3">Posted by <span className="bold">{question.authorFirstName} {question.authorLastName}</span> - <span className="grey-text">{moment(question.createdAt.toDate()).calendar()}</span></p>
                        </div>
                        <div>
                            <EditContentQuestion question={question} user={user} />
                        </div>
                        <div>
                            <CreateAnswer questionID={question.id}/>
                            <AnswerList questionID={question.id} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        // If question doesn't exist, display "No post"
        return(
            <div className="center">No post found.</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const questions = state.question.questions
    const question = questions.filter(question => { return question.id === id})[0]

    return {
        question,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(QuestionDetails)
