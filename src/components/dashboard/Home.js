import React, { Component } from 'react'
import QuestionsList from '../questions/QuestionsList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Header from '../../images/header.jpg'


class Home extends Component {
    
    render() {
        const { questions, user } = this.props

        // Home can only be accessed if user is logged in
        if (!user) return <Redirect to='/signin' />
        
        return (
            <div className="">
                <header>
                    <img src={Header} alt="header" className="header"/>
                </header>
                <div className="container">
                    <QuestionsList questions={questions} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.question.questions,
        user: state.auth.user 
    }
}

export default connect(mapStateToProps)(Home)