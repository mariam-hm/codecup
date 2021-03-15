import authReducer from './authReducer'
import questionReducer from './questionReducer'
import answerReducer from './answerReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    question: questionReducer,
    answer: answerReducer,
});

export default rootReducer