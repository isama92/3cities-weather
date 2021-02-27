import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from './store/reducers';

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        collapsed: (getState, action, logEntry) => !logEntry.error,
    });
    middlewares.push(logger);
}

const rootReducer = combineReducers(reducers);

const configureStore = () => {
    const composeEnhancers = composeWithDevTools({});

    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares)),
    );
};

export default configureStore();
