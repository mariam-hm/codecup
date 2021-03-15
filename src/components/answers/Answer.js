import React from 'react'
import moment from 'moment'


const Answer = ({answer}) => {

    // If User has a profile picture, display it in the avatar icon, else, display initials
    const avatar = answer.authorProfPicURL ? (
            <span to="/dashboard" className="btn-small btn-floating z-depth-0 avatar profpic-small" style={{backgroundImage: 'url(' + answer.authorProfPicURL + ')'}}></span>
    ) : (
            <span to="/dashboard" className="btn-small btn-floating teal accent-1 z-depth-0 deep-orange-text text-lighten-1 avatar">{answer.authorInitials}</span>
    )

    return (
        <div className="comment">
            {avatar}
            <p className="brown-text text-darken-3"><span className="bold">{answer.authorFirstName} {answer.authorLastName}</span> - <span className="grey-text">{moment(answer.createdAt.toDate()).calendar()}</span></p>
            <blockquote className="brown-text text-darken-3">{answer.answer}</blockquote>
        </div>
    )
}


export default Answer
