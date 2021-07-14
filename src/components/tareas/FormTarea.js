import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

export const FormTarea = () => {

    // Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    
    // Si no hay proyecto seleccionado
    if ( !proyecto ) return null;

    // Destructuring para extraer proyecto actual
    const [ proyectoActual ] = proyecto;
    
    return (
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de tarea..."
                        name="nombre"
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar tarea..."
                    />
                </div>
            </form>
        </div>
    )   
}
