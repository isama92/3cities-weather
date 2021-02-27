import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'containers/App/App';
import reportWebVitals from './reportWebVitals';
import store from './redux-store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line no-console
    reportWebVitals(console.log);
}
