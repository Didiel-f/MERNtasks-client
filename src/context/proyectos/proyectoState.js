import React, { useReducer } from 'react';
import uuid from 'uuid';
import { AGREGAR_PROYECTOS, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTOS, PROYECTO_ACTUAL, VALIDAR_FORMULARIO } from '../../types';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';


const ProyectoState = (props) => {
    
    const proyectos = [
        { id: 1, nombre: 'Tienda virtual'},
        { id: 2, nombre: 'Intranet'},
        { id: 3, nombre: 'Diseño se sitio web'}
    ];

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO,
            payload: proyectos
        });
    };
    
    // Obtener los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        });
    };

    // Agregar nuevo proyecto
    const agregarProyecto = (proyecto) => {
    proyecto.id = uuid.v4();

    // Insertar proyecto en el state
    dispatch({
        type: AGREGAR_PROYECTOS,
        payload: proyecto
    })
    };

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    };

    // Selecciona el proyecto que el usuario dio click
    const proyectoActual = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    };

    const eliminarProyecto = (proyectoId) => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    };

     
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            { props.children }
        </proyectoContext.Provider>
    )
    
};

export default ProyectoState;