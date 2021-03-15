import { firestore } from '../../config/firebaseConfig'

// ------------- LOAD QUESTIONS -------------

export const loadQuestions = () => {
    return (dispatch) => {
        firestore.collection('questions').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
            let questions = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })
            dispatch({
                type: 'LOAD_QUESTIONS',
                questions
            })
        }, (error) => console.log(error.message))
    }
}


// ------------- CREATE QUESTION -------------

export const createQuestion = (question) => {
    return (dispatch, getState) => {

        const profile = getState().auth.profile
        const userID = getState().auth.user.uid

        // Store the question and author in Firebase Firestore
        firestore.collection('questions').add({
            ...question,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorID : userID,
            authorInitials: profile.initials,
            authorProfPicURL: profile.profilePicURL,
            createdAt: new Date()
        }).then(() => {
            // Dispatch the action or error
            dispatch({ type:'CREATE_QUESTION', question });
        }).catch((error) => {
            dispatch({ type: 'CREATE_QUESTION_ERROR', error})
        })
    }
};

export const updateQuestion = (questionID, content) => {
    return (dispatch) => {
        // Get question reference from Firestore
        firestore.collection('questions').doc(questionID).update({
            description: content
        }).then(() => {
            // Dispatch action or error
            dispatch({ type: 'UPDATE_QUESTION' })
        }).catch((error) => {
            dispatch({type: 'UPDATE_QUESTION_ERROR', error})
        })
    }
}

export const deleteQuestion = (questionID) => {
    return (dispatch) => {
        // Get question reference from Firestore
        firestore.collection('questions').doc(questionID).delete()
        .then(() => {
            // Dispatch action or error
            dispatch({ type: 'DELETE_QUESTION' })
        }).catch((error) => {
            dispatch({ type: 'DELETE_QUESTION_ERROR', error})
        })
    }
}



