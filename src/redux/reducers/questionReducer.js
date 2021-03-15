const initState = {
    questions: []
}

const questionReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOAD_QUESTIONS':
            return {
                ...state,
                questions: action.questions
            }
        case 'CREATE_QUESTION':
            //console.log('Question created : ', action.question)
            return state;
        case 'CREATE_QUESTION_ERROR':
            //console.log('Create question error', action.error)
            return state;
        case 'UPDATE_QUESTION':
            //console.log('Question updated !')
            return state
        case 'UPDATE_QUESTION_ERROR':
            //console.log('Update question error')
            return state
        case 'DELETE_QUESTION':
            //console.log('Question deleted !')
            return state
        case 'DELETE_QUESTION_ERROR':
            //console.log('Delete question error')
            return state
        default:
            return state;
    }
}

export default questionReducer