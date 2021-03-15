import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../redux/actions/authActions'

const SignedInLinks = (props) => {

    // If User has a profile picture, display it in the avatar icon, else, display initials
    const avatar = props.profile.profilePicURL ? (
        <div>
            <NavLink to="/dashboard" className="btn btn-floating z-depth-0 profpic" style={{backgroundImage: 'url(' + props.profile.profilePicURL + ')'}}></NavLink>
        </div>
    ) : (
        <div>
            <NavLink to="/dashboard" className="btn btn-floating teal accent-1 z-depth-0 deep-orange-text text-lighten-1">{props.profile.initials}</NavLink>
        </div>
    )

    
    return (
        <ul className="right">
            <li><a onClick={props.signOut} className="deep-orange-text text-lighten-1" href="/signin">SIGN OUT</a></li>
            <li><NavLink to="/ask-question" className="btn deep-orange lighten-1 white-text waves-effect">Ask a Question</NavLink></li>
            <li>{avatar}</li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
