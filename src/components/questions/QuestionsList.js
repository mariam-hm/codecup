import React from 'react'
import QuestionSummary from './QuestionSummary'
import { Link } from 'react-router-dom'

const QuestionsList = ({questions}) => {

    // Build questions list
    const questionsList = questions.length ? (
        questions.map(question => {
            return (
                <Link to={'/question/' + question.id} key={question.id} >
                    <QuestionSummary question={question} />
                </Link>
            )
        })
    ) : (
        <p className="center">No questions for now...</p>
    )
    return (
        <div className="question-list section">
            {questionsList}
        </div>
    )
}

export default QuestionsList
