import { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {

    // ------------- STATE AND FUNCTIONS -------------

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        profilePic: null,
        profilePicURL: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signUp(this.state)
    }

    handleUploadPic = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0]

        reader.onloadend = () => {
            this.setState({
                ...this.state,
                profilePic: file,
                profilePicURL: reader.result
            })
        }

        reader.readAsDataURL(file)
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

                            <h3 className="center deep-orange-text text-lighten-1">Sign up</h3>

                            {/* -------------- FIRST AND LAST NAME -------------- */}
                            <div className="input-field">
                                <input onChange={this.handleChange} type="text" id="firstName" className="validate brown-text text-darken-3"/>
                                <label htmlFor="firstName">First Name</label>
                            </div>

                            <div className="input-field">
                                <input onChange={this.handleChange} type="text" id="lastName" className="validate brown-text text-darken-3"/>
                                <label htmlFor="lastName">Last Name</label>
                            </div>

                            {/* -------------- EMAIL AND PASSWORD -------------- */}
                            <div className="input-field">
                                <input onChange={this.handleChange} type="email" id="email" className="validate brown-text text-darken-3"/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input onChange={this.handleChange} type="password" id="password" className="validate brown-text text-darken-3"/>
                                <label htmlFor="password">Password</label>
                            </div>

                            {/* -------------- PROFILE PICTURE -------------- */}
                            <div className="file-field input-field brown-text text-darken-3">
                                <div className="btn btn deep-orange lighten-1 white-text waves-effect">
                                    <span>File</span>
                                    <input onChange={this.handleUploadPic} type="file" id="file-button" />
                                </div>
                                <div className="file-path-wrapper">
                                    <input type="text" className="file-path validate brown-text text-darken-3" id="prof-pic-path" placeholder="Upload your profile picture..."/>
                                    <label htmlFor="prof-pic-path">Profile picture</label>
                                </div>
                                </div>

                            <div className="center">
                                <button type="submit" className="btn deep-orange lighten-1 white-text waves-effect">Sign up</button>
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

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)