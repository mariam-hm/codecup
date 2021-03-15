import React from 'react'
import Answer from './Answer'
import { connect } from 'react-redux'
import { useEffect } from 'react'

import { store } from '../../index'
import { loadAnswersByQuestion } from '../../redux/actions/answerActions'


const AnswerList = (props) => {

    const { questionID, answers } = props

    // Load the answers corresponding to the question
    useEffect(() => {
        store.dispatch(loadAnswersByQuestion(questionID))
    })

    // Build answer list
    const answersList = answers.length ? (
        answers.map(answer => {
            return (
                <Answer answer={answer} key={answer.id} />
            )
        })
    ) : (
        <div className="center brown-text text-darken-3">
            <p>Be the first one to help ^^ !</p>
        </div>
    )

    return (
        <div className="question-list section">
            {answersList}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        answers: state.answer.answers
    }
}

export default connect(mapStateToProps)(AnswerList)