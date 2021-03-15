import { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {

    // ------------- STATE AND FUNCTIONS -------------

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    // -----------------------------------------------

    
    render() {
        const { authError, user } = this.props

        // Sign In can only be accessed if user is logged out
        if (user) return <Redirect to='/' />

        return (
            <div className="container sign">
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="white col s12 m6 offset-m3 card intro">
                        <div className="card-content">

                            <h3 className="center deep-orange-text text-lighten-1">Sign in</h3>

                            {/* -------------- EMAIL AND PASSWORD -------------- */}
                            <div className="input-field">
                                <input onChange={this.handleChange} type="email" id="email" className="validate brown-text text-darken-3"/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input onChange={this.handleChange} type="password" id="password" className="validate brown-text text-darken-3"/>
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="center">
                                <button type="submit" className="btn deep-orange lighten-1 white-text waves-effect">Sign in</button>
                            </div>

                            {/* -------------- DISPLAY ERROR IF THERE IS ONE -------------- */}
                            <div className="center red-text">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => {dispatch(signIn(creds))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
