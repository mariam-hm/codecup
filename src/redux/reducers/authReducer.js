const initState = {
    authError: null,
    user: null,
    makeAdmin: null,
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        // --------- SIGN IN ---------
        case 'SIGNIN_SUCCESS':
            //console.log('Login success!')
            return {
                ...state,
                authError: null,
            }
        case 'SIGNIN_ERROR':
            return {
                ...state,
                authError: 'Login failed',
            }
        // --------- SIGN OUT ---------
        case 'SIGNOUT_SUCCESS':
            //console.log('Signout success!')
            return state
        case 'AUTH_STATE_CHANGED':
            return {
                ...state,
                user: action.user.user,
                profile: action.user.profile
            }
        // --------- SIGN UP ---------
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null,
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.error.message,
            }
        // --------- MAKE ADMIN ---------
        case 'MAKE_ADMIN_SUCCESS':
            //console.log(action.result)
            return {
                ...state,
                makeAdmin: action.result
            }
        case 'MAKE_ADMIN_ERROR':
            //console.log(action.error)
            return {
                ...state,
                makeAdmin: 'Making admin failed.'
            }
        // --------- DEFAULT ---------
        default:
            return state
    }
}

export default authReducer