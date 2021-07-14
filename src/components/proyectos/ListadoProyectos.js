import React, { useContext, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { Proyecto } from './Proyecto';


export const ListadoProyectos = () => {

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;
    
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos();
    }, [])

    // Revisar si proyectos tiene contenido
    if (proyectos.length === 0 ) return null;

    
    return (
        <ul className="listado-proyectos">
            {proyectos.map( proyecto => (
                <Proyecto 
                    key={ proyecto.id }
                    proyecto={proyecto}
                />
            ) )}
        </ul>
    )
}
