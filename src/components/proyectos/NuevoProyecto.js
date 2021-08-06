import React, { useContext, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

export const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });
    const { nombre } = proyecto;
    
    // Lee los contenidos del input
    const onChangeProyecto = (e) => {
        setProyecto({
            ...proyecto,
            [ e.target.name ]: e.target.value
        });
    };

    // Cuando el usuario envía un proyecto
    const onSubmitProyecto = (e) => {
        e.preventDefault();

        // Validar el proyecto
        if( nombre.trim().length === 0 ) {
            mostrarError();
            return;
        };

        // Agregar al state
        agregarProyecto( proyecto );

        // Limpiar el input
        setProyecto({
            nombre: ''
        });
        
    }
    
    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ mostrarFormulario }
            >
                Nuevo Proyecto
            </button>

            {
                formulario
                    ?
                        (
                            <form
                                className="formulario-nuevo-ptoyecto"
                                onSubmit={ onSubmitProyecto }
                            >
                                <input 
                                    type="text"
                                    className="input-text"
                                    placeholder="Nombre de proyecto"
                                    name="nombre"
                                    value={ nombre }
                                    onChange={ onChangeProyecto }
                                />

                                <input 
                                    type="submit"
                                    className="btn btn-primario btn-block"
                                    value="Agregar proyecto"
                                />

                            </form>
                        )
                    : null
            }
            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio.</p> : null }
            
        </>
    )
}
