export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const login = ({ username, password }) => dispatch => {
    dispatch(loginInit());

    setTimeout(() => {
        if (Math.random() < .95) {
            dispatch(loginSuccess({
                username: 'dawid99',
                id: 1
            }));
        } else {
            dispatch(loginFailure());
        }
    }, 500);
}

export const logout = () => ({
    type: LOGOUT_REQUEST
})

const loginInit = () => ({
    type: LOGIN_INIT
});

const loginSuccess = ({
    username,
    id
}) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        username,
        id
    }
});

const loginFailure = (errorReasonText) => ({
    type: LOGIN_FAILURE,
    payload: { reason: errorReasonText }
});