import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { deleteQuestion } from '../../redux/actions/questionActions'


const QuestionSummary = (props) => {

    const { question } = props
    
    // If User has a profile picture, display it in the avatar icon, else, display initials
    const avatar = question.authorProfPicURL ? (
            <span to="/dashboard" className="btn-small btn-floating z-depth-0 avatar profpic-small" style={{backgroundImage: 'url(' + question.authorProfPicURL + ')'}}></span>
    ) : (
            <span to="/dashboard" className="btn-small btn-floating teal accent-1 z-depth-0 deep-orange-text text-lighten-1 avatar">{question.authorInitials}</span>
    )
    
    return (
        <div className="card white">
            <div className="card-content">
                <h3 className="card-title deep-orange-text text-lighten-1 title">{question.title}</h3>
                <div className="post-info">
                    {avatar}
                    <p className="brown-text text-darken-3">Posted by <span className="bold">{question.authorFirstName} {question.authorLastName}</span> - <span className="grey-text">{moment(question.createdAt.toDate()).calendar()}</span></p>
                </div>
                <p className="brown-text text-darken-3">{question.description.slice(0,1000)}</p>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteQuestion: (questionID) => dispatch(deleteQuestion(questionID))
    }
}
export default connect(null,mapDispatchToProps)(QuestionSummary)
