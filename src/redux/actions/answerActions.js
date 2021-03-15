import { firestore } from '../../config/firebaseConfig'


// --------------------- CREATE ANSWER ---------------------

export const createAnswer = (answer) => {
    return (dispatch, getState) => {

        const profile = getState().auth.profile
        const userID = getState().auth.user.uid

        // Store the answer and author in Firebase Firestore
        firestore.collection('answers').add({
            ...answer,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorInitials: profile.initials,
            authorProfPicURL: profile.profilePicURL,
            authorID : userID,
            createdAt: new Date()
        }).then(() => {
            // Dispatch the action or error
            dispatch({ type:'CREATE_ANSWER', answer });
        }).catch((error) => {
            dispatch({ type: 'CREATE_ANSWER_ERROR', error})
        })
    }
};


// --------------------- LOAD ANSWERS BY QUESTION ---------------------

export const loadAnswersByQuestion = (questionID) => {
    return (dispatch) => {
        firestore.collection('answers').where('questionID', '==', questionID).orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
            let answers = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            dispatch({
                type: 'LOAD_ANSWERS',
                answers
            })
        }, (error) => console.log(error.message))
    }
}


// --------------------- LOAD ANSWERS BY USER ---------------------

export const loadAnswersByUser = () => {
    return (dispatch, getState) => {
        const userID = getState().auth.user.uid

        firestore.collection('answers').where('authorID', '==', userID).orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
            let answers = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            dispatch({
                type: 'LOAD_ANSWERS',
                answers
            })
        }, (error) => console.log(error.message))
    }
}