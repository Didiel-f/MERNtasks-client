import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

export const Proyecto = ({ proyecto }) => {

    const proyectosContext = useContext(proyectoContext)
    const { proyectoActual } = proyectosContext;

    // Obtener la función del context de tarea
    const tareasContext = useContext(TareaContext);
    const { obtenerTareas } = tareasContext;
    
    // Agregar el proyecto actual
    const seleccionarProyecto = (id) => {
        proyectoActual(id); // Fijar un proyecto actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
    };
    
    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto.id) }
            >
                { proyecto.nombre }
            </button>
        </li>
    )
}
