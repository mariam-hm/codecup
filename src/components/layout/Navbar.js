import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import Logo from '../../images/logo_codecup.png'


const Navbar = (props) => {
    const { user, profile } = props
    
    // Check if user is logged in or not
    const links = user ? <SignedInLinks profile={profile} /> : <SignedOutLinks />

    return (
        <nav className="nav-wrapper white">
            <div className="row">
                <div className="col s10 offset-s1">
                <Link to="/" className="brand-logo"><img src={Logo} alt="Codecup" className="logo"/></Link>
                { isLoaded(profile) && links }
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        profile: state.auth.profile
    }
}

export default connect(mapStateToProps)(Navbar)
