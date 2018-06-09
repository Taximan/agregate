import { LOGIN_INIT, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_REQUEST } from "../actions";

const initialState = {
    isFetching: false,
    lastLoginErrorMessage: null,
    user: JSON.parse(window.localStorage.getItem('__user')) || null
}

export const session = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return { ...state, user: null };
        case LOGIN_INIT:
            return { ...state, isFetching: true };
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                lastLoginErrorMessage: action.payload.reason
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                lastLoginErrorMessage: null,
                user: {
                    username: action.payload.username,
                    id: action.payload.id
                }
            };
        default:
            return state;
    }
}

export function getSession({ session }) {
    return {
        session,
        isLoggedIn: session.user != null
    };
};

export function getLoggedIn({ session }) {
    return {
        isLoggedIn: session.user != null
    };
}