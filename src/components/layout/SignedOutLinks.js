import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/signin" className="deep-orange-text text-lighten-1">SIGN IN</NavLink></li>
            <li><NavLink to="/signup" className="btn deep-orange lighten-1 white-text waves-effect">SIGN UP</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks