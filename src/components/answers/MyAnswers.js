import React from 'react'
import Answer from './Answer'
import { useEffect } from 'react'
import { loadAnswersByUser } from '../../redux/actions/answerActions'
import { store } from '../../index'
import { connect } from 'react-redux'


const MyAnswers = ({answers}) => {

    // Load the answers corresponding to the user
    useEffect(() => {
        store.dispatch(loadAnswersByUser())
    })
    
    // Build the answers list
    const answersList = answers.length ? (
        answers.map(answer => {
            return (
                <Answer answer={answer} key={answer.id} />
            )
        })
    ) : (
        <div className="center">
            <p className="brown-text text-darken-3">I haven't helped yet !</p>
        </div>
    )

    return (
        <div className="answer-list section">
        <h3 className="center deep-orange-text text-lighten-1">My answers</h3>
            <div className="card">
                <div className="card-content">
                    {answersList}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        answers: state.answer.answers.slice(0,3)
    }
}


export default connect(mapStateToProps)(MyAnswers)