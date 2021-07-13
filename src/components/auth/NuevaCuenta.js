import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NuevaCuenta = () => {

    const [usuario, setusuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });
    const { nombre, email, password, confirmar } = usuario;
    
    const onchange = (e) => {
        setusuario({
            ...usuario,
            [ e.target.name ]: e.target.value
        });
    };
    
    const onSubmit = (e) => {
        e.preventDefault();

    };
    
    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={ onSubmit }
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={ nombre }
                            onChange={ onchange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={ email }
                            onChange={ onchange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={ password }
                            onChange={ onchange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Tu repite tu password"
                            value={ confirmar }
                            onChange={ onchange }
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link
                    to="/"
                    className="enlace-cuenta"
                >
                    Volver a iniciar sesión
                </Link>                
            </div>
        </div>
    )
}
