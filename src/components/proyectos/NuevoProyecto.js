import React, { useState } from 'react';

export const NuevoProyecto = () => {

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
        e.preventDefault()
    }
    
    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >
                Nuevo Proyecto
            </button>

            <form
                className="formulario-nuevo-ptoyecto"
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
                    onSubmit={ onSubmitProyecto }
                />

            </form>
        </>
    )
}
