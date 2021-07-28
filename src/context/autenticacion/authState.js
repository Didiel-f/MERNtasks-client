import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import { REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types';
import AuthContext from './authContext';
import { AuthReducer } from './authReducer';


const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta);
            
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });
        } catch (error) {

            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    };

    // Las funciones

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
    
};


export default AuthState;