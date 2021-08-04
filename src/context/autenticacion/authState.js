import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import { tokenAuth } from '../../config/token';
import { LOGIN_ERROR, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types';
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

            // Obtener el usuario
            usuarioAutenticado();
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

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            console.log(respuesta);
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
    
};


export default AuthState;