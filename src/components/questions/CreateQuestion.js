import { Component } from 'react'
import { connect } from 'react-redux'
import { createQuestion } from '../../redux/actions/questionActions'
import { Redirect } from 'react-router-dom'


class CreateQuestion extends Component {

    // ------------- STATE AND FUNCTIONS -------------

    state = {
        title: '',
        description: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createQuestion(this.state)
        // Reset state after submit
        this.setState({
            title: '',
            description: ''
        })
        // Users get redirected to home
        this.props.history.push('/')
    }

    // -----------------------------------------------

    render() {
        const { user } = this.props

        // Create Question Component can only be accessed if user is logged in
        if (!user) return <Redirect to='/signin' />

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="card white ask">
                    <div className="card-content">
                        <h3 className="center deep-orange-text text-lighten-1">Ask a new question</h3>
                        <div className="input-field">
                            <textarea onChange={this.handleChange} id="title" className="validate brown-text text-darken-3 title-area" placeholder="Enter your title..."></textarea>
                        </div>
                        <div className="input-field">
                            <textarea onChange={this.handleChange} id="description" className="brown-text text-darken-3" placeholder="Enter your text..." ></textarea>
                        </div>
                        <div className="center">
                            <button type="submit" className="btn deep-orange lighten-1 white-text waves-effect">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createQuestion: (question) => dispatch(createQuestion(question))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)