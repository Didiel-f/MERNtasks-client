import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { Proyecto } from './Proyecto';


export const ListadoProyectos = () => {

    // Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;
    
    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, []);

    // Revisar si proyectos tiene contenido
    if (proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    
    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map( proyecto => (
                    <CSSTransition
                        key={ proyecto.id }
                        timeout={200}
                        classNames="proyectos"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ) )}
            </TransitionGroup>
        </ul>
    )
}
