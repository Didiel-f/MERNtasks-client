import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

const TareaState = (props) => {
    const initialState = {
        tareas: [],
    }

    // Crear el dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;