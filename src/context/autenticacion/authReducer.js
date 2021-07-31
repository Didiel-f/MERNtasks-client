import { LOGIN_ERROR, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types";


export const AuthReducer = ( state, action ) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null
            }
        
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                mensaje: action.payload
            }
        default:
            return state;
    }
}