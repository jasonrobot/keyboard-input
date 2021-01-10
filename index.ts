// React
// import React from 'react';
import ReactDOM from 'react-dom';
import h from 'react-hyperscript'; // or 'virtual-hyperscript'

//Redux and stuff
import {
    applyMiddleware,
    createStore,
} from 'redux';
// import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';

// Ramda

// My Stuff
import { InputSequencer } from './InputSequencer';

// import rootReducer, {
//     initialState
// } from './Reducer';

// const store = createStore(
//     rootReducer,
//     initialState,
//     applyMiddleware(
//         // thunkMiddleware,
//         createLogger(),
//     )
// );

// ReactDOM.render(
//     h(Provider, {store}, [
//         h(Main)
//     ]),
//     document.getElementById('root')
// );


const inputHandler = (input: string) => {
    console.log(`input: ${input}`);
}
const IS = new InputSequencer(inputHandler);
window.addEventListener('keydown', (event : KeyboardEvent) => {
    IS.handleKeyDown(event);
    // console.log(`IS state: ${JSON.stringify(IS.currentMap)}`);
});

window.addEventListener('keyup', IS.handleKeyUp.bind(IS));
