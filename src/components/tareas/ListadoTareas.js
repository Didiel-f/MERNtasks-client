import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import { Tarea } from './Tarea';

export const ListadoTareas = () => {

    // Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Si no hay proyecto seleccionado
    if (!proyecto) return <h2>Selecciona un proyecto</h2>;

    // Array destructuring para extraer el proyecto actual
    const [ proyectoActual ] = proyecto;
    
    const tareasProyecto = [
        { nombre: 'Elegir Plataforma', estado: false },
        { nombre: 'Elegir Colores', estado: false },
        { nombre: 'Elegir Plataformas', estado: false },
        { nombre: 'Elegir Hosting', estado: true },
    ];

    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0
                        ? (<li className="tarea"><p>No hay tareas</p></li>)
                        : tareasProyecto.map( tarea => (
                            <Tarea
                                tarea={ tarea }
                            />
                        ) ) 
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ () => eliminarProyecto(proyectoActual.id) }
            >
                Eliminar proyecto &times;
            </button>
            
        </>
    )
}
