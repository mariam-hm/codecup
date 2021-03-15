import React, { Component } from 'react'
import MyAnswers from '../answers/MyAnswers'
import MyQuestions from '../questions/MyQuestions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addAdminRole } from '../../redux/actions/authActions'


class Dashboard extends Component {

    // ------------- STATE AND FUNCTIONS -------------
    // State and functions are only used by Admin users for making others admin

    state = {
        email: ''
    }

    handleAdminChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleAdminSubmit = (e) => {
        e.preventDefault()
        this.props.addAdminRole(this.state)
        e.target.reset()
    }

    // -----------------------------------------------

    render() {
        const { questions, user, makeAdmin } = this.props

        // Dashboard can only be accessed if user is logged in
        if (!user) return <Redirect to='/signin' />

        // Form for admins to give admin rights to other users
        const adminForm = user.admin ? (
            <div className="admin" id="admin">
                <h3 className="center deep-orange-text text-lighten-1">Make users admins</h3>
                <div className="card">
                    <form onSubmit={this.handleAdminSubmit} className="card-content">
                            <div className="input-field">
                                <input onChange={this.handleAdminChange} type="text" id="email" className="validate brown-text text-darken-3"/>
                                <label htmlFor="email">User email</label>
                            </div>
                            <div className="center">
                                <button type="submit" className="btn deep-orange lighten-1 white-text waves-effect">Make admin</button>
                            </div>
                            <div className="center green-text admin-success">
                                {makeAdmin ? <p>{ makeAdmin }</p> : null}
                            </div>
                    </form>
                </div>
            </div>
        ) : (
            null
        )

        return (
            <div className="container dashboard">
                {adminForm}
                <div className="row">
                    <div className="col s12 m6">
                        <MyQuestions questions={questions} />
                    </div>
                    <div className="col s12 m6">
                        <MyAnswers />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const user = state.auth.user
    const myQuestions = state.question.questions.filter(question => {
        return question.authorID === user.uid
    })
    return {
        // Dashboard only takes the 3 most recent posts
        questions: myQuestions.slice(0,3),
        user: user,
        makeAdmin: state.auth.makeAdmin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAdminRole: (email) => {dispatch(addAdminRole(email))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);