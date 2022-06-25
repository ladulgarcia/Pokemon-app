import {createStore, applyMiddleware} from 'redux';
//import {configureStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

//Armo un reducer y lo importo
import rootReducer from "../reducer/index" // me traje el Reducer

export const store = createStore(rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
    );

/* export const store = configureStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
    ); */