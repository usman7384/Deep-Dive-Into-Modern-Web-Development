import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from '../Reducers/Notification'
import blogReducer from '../Reducers/BlogReducer'
import loginReducer from '../Reducers/LoginReducer'
import userReducer from '../Reducers/UserReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    users:userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store