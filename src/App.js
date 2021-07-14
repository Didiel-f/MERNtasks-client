import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import { Login } from './components/auth/Login';
import { NuevaCuenta } from './components/auth/NuevaCuenta';
import { Proyectos } from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';

function App() {
  return (
    <Router>
      <ProyectoState>
        <TareaState>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/nueva-cuenta" component={ NuevaCuenta } />
            <Route exact path="/proyectos" component={ Proyectos } />
          </Switch>
        </TareaState>
      </ProyectoState>
    </Router>
    
  );
}

export default App;
