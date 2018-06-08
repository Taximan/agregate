import Axios from 'axios';

export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const login = ({ username, password }) => dispatch => {
    dispatch(loginInit());

    Axios
        .post('/Agregate/Api/Auth/Login.php', { username, password })
        .then(resp => {
            const token = resp.data['$token'];
            const id = resp.data['id'];
            const username = resp.data['username'];
            Axios.defaults.headers.common['Authorization'] = token;
            dispatch(loginSuccess({ id, username }));
        })
        .catch(ex => {
            if (ex.response && ex.response.code === 401) {
                dispatch(loginFailure('Nieprawidłowa nazwa użytkownika lub hasło'));
            } else {
                dispatch(loginFailure('Nieoczekiwany błąd'));
            }
        })
}

export const logout = () => dispatch => {
    Axios.defaults.headers.common['Authorization'] = null;
    dispatch({ type: LOGOUT_REQUEST });
}

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