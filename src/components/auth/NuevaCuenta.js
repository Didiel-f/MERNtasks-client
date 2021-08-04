import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

export const NuevaCuenta = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el usuario se haya autenticado, registrado o sea un registro duplicado
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta( mensaje.msg, mensaje.categoria );
        }

    }, [mensaje, autenticado, props.history, mostrarAlerta])

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

        // Validar que no haya campos vacíos
        if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === '' ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        };

        // Password mínimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe ser de al menos', 'alerta-error');
            return;
        };

        // Los passwords deben ser iguales
        if (password !== confirmar) {
            mostrarAlerta('Las contraseñas deben ser iguales', 'alerta-error');
            return;
        };

        // Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });

    };
    
    return (
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
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
