import React, { useContext, useEffect, useState } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

export const FormTarea = () => {

    // Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null ) {
            setTarea( tareaseleccionada );
        } else {
            setTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada])
    
    // State del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    });
    const { nombre } = tarea;
    
    // Si no hay proyecto seleccionado
    if ( !proyecto ) return null;

    // Destructuring para extraer proyecto actual
    const [ proyectoActual ] = proyecto;

    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [ e.target.name ]: e.target.value
        })
    };
    
    const onSubmit = (e) => {
        e.preventDefault();

        // Validar
        if( nombre.trim() === '' ) {
            validarTarea();
            return;
        }
        
        // Si es edición o si es nueva tarea
        if ( tareaseleccionada === null ) {
            // Agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            // Actualizar tarea existente
            actualizarTarea(tarea);

            // Elimina tareaseleccionada
            limpiarTarea();
        }
        

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // Reiniciar el form
        setTarea({
            nombre: ''
        });
    };
    
    return (
        <div className="formulario">
            <form
                onSubmit={ onSubmit }
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de tarea..."
                        name="nombre"
                        value={ nombre }
                        onChange={ handleChange }
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={ tareaseleccionada ? 'Editar tarea' : 'Agragar tarea' }
                    />
                </div>
            </form>

            { errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio.</p> : null }
            
        </div>
    )   
}
