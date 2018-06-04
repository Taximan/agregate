import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/app/App';
import DevTools from './components/devtools/Devtools';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { session } from './reducers'
import thunk from 'redux-thunk';

const reducer = combineReducers({
    session,
});

const store = createStore(
    reducer,
    compose(
        applyMiddleware(
            thunk
        ),
        DevTools.instrument()
    )
);

const index = (
    <Provider store={store}>
        <HashRouter>
            <div>
                <App />
                <DevTools />
            </div>
        </HashRouter>
    </Provider>
)

ReactDOM.render(index, document.getElementById('root'));

registerServiceWorker();