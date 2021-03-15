import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateQuestion } from '../../redux/actions/questionActions'
import { deleteQuestion } from '../../redux/actions/questionActions'
import { Link } from 'react-router-dom'

class EditContentQuestion extends Component {
    
    /// ------------- STATE AND FUNCTIONS -------------

    state = {
        component: <p>{this.props.question.description}</p>,
        content: this.props.question.description,
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            content: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.updateQuestion(this.props.question.id, this.state.content)
        this.closeEdit()
        this.setState({
            ...this.state,
            component: <p>{this.state.content}</p>
        })
    }

    // ------------- TOGGLE EDITING FORM -------------

    openEdit = () => {
        this.setState({
            ...this.state,
            component: <div>
                            <form onSubmit={this.handleSubmit} className="card white lighten-3 z-depth-0">
                                <textarea onChange={this.handleChange} defaultValue={this.props.question.description} className="brown-text text-darken-3"></textarea>
                                <button onClick={this.closeEdit} className="btn white deep-orange-text text-lighten-1 waves-effect cancel-update">Cancel</button>
                                <button type="submit" className='btn deep-orange lighten-1 white-text waves-effect cancel-update'>Update</button>
                            </form>
                        </div>
        })
    }

    closeEdit = () => {
        this.setState({
            ...this.state,
            component: <p className="brown-text text-darken-3">{this.props.question.description}</p>
        })
    }

    // -----------------------------------------------

    deleteQuestion = () => {
        this.props.deleteQuestion(this.props.question.id)
    }

    // -----------------------------------------------

    render() {
        const {question, user} = this.props

        // Only show the Edit and Delete buttons if the user is the author of the question OR if user is Admin
        const editDeleteButtons = ((user.uid === question.authorID) || user.admin) ? (
            <div className="edit-delete">
                <button onClick={this.openEdit} className="btn-small white grey-text waves-effect btn-flat bold"><i className='material-icons left'>create</i>Edit</button>
                <Link to='/'>
                <button onClick={this.deleteQuestion} className="btn-small white grey-text waves-effect btn-flat bold"><i className='material-icons left'>delete</i>Delete</button>
                </Link>
            </div>
        ) : (null)
        
        return (
            <div className="">
                {this.state.component}
                {editDeleteButtons}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuestion: (questionID, content) => dispatch(updateQuestion(questionID, content)),
        deleteQuestion: (questionID) => dispatch(deleteQuestion(questionID))
    }
}

export default connect(null, mapDispatchToProps)(EditContentQuestion)
