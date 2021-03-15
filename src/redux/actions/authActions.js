import { auth, storage, firestore, functions } from '../../config/firebaseConfig'
import { store } from '../../index'

// --------------------- AUTH LISTENER ---------------------

auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenRes => {
            user.admin = idTokenRes.claims.admin;
        })
        firestore.collection('users').doc(user.uid).get().then(doc => {
            store.dispatch({type: 'AUTH_STATE_CHANGED', user: { user:user, profile: doc.data() }})
        })
    } else {
        store.dispatch({type: 'AUTH_STATE_CHANGED', user: { user:null, profile: null }})
    }
})


// --------------------- SIGN IN ---------------------

export const signIn = (credentials) => {
    return (dispatch) => {

        auth.signInWithEmailAndPassword(
            // Sign in user with Firebase
            credentials.email,
            credentials.password
        ).then((userCredential) => {
            // Dispatch action or error
            const user = userCredential.user
            dispatch({ type: 'SIGNIN_SUCCESS', user })
        }).catch((error) => {
            dispatch({ type: 'SIGNIN_ERROR', error})
        })
    }
}


// --------------------- SIGN OUT ---------------------

export const signOut = () => {
    return (dispatch) => {
        // Dispatch action
        auth.signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS'})
        })
    }
}


// --------------------- SIGN UP ---------------------

export const signUp = (newUser) => {
    return (dispatch) => {
        auth.createUserWithEmailAndPassword(
            // Create User in Firebase Authentication
            newUser.email,
            newUser.password
        ).then((resp) => {

            // If user has a profile picture, store it in Firebase Storage
            if (newUser.profilePic) {
                const randID = new Date().getTime()*Math.floor(Math.random()*100)
                const storageRef = storage.ref('profilePics/' + randID)
                storeProfilePicURL(storageRef, newUser.profilePic, resp.user.uid)
            }

            // Store the user profile in Cloud Firestore, with the profile pic URL
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
                profilePicURL: null,
                creationDate: new Date()
            })
        }).then(() => {
            // Dispatch action or error
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'SIGNUP_ERROR', error })
        })
    }
}

// --------------------- STORE PROFILE PICTURE AND GET URL ---------------------

const storeProfilePicURL = (storageRef, file, userID) => {
    // Store profile picture in Firebase Storage
    storageRef.put(file).then(() => {
        // Get the picture URL
        storageRef.getDownloadURL().then((url) => {
            // Update the user profile in Firebase Cloud Firestore
            firestore.collection('users').doc(userID).update({
                profilePicURL: url
            })
        })
    })
}


// --------------------- ADD ADMIN ROLE ---------------------

export const addAdminRole = (email) => {
    return (dispatch) => {
        // Get the Cloud function
        const addAdmin = functions.httpsCallable('addAdminRole');
        addAdmin(email).then(result => {
            // Dispatch the result or error
            console.log(result)
            dispatch({ type: 'MAKE_ADMIN_SUCCESS', result: result.data.message })
    }).catch((error) => {
        dispatch({ type: 'MAKE_ADMIN_ERROR', error})
    })
    }
}