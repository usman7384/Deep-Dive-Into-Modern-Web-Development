let timer

const reducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state = action.data.notification
        default: return state
    }
}

export const setNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            data: { notification }
        })
        clearTimeout(timer)
        timer = setTimeout(() => dispatch({
            type: 'NOTIFY',
            data: { notification: '' }
        }), timeout * 1000)
    }
}

export default reducer