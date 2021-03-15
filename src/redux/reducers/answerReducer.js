const initState = {
    answers: []
}

const answerReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOAD_ANSWERS':
            return {
                ...state,
                answers: action.answers
            }
        case 'CREATE_ANSWER':
            //console.log('Answer sent ! ', action.answer)
            return state
        case 'CREATE_ANSWER_ERROR':
            //console.log('Send answer error', action.error)
            return state
        default:
            return state
    }
}

export default answerReducer