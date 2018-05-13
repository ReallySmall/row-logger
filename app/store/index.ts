import { createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { logger, websocket } from '../middleware';
import { rootReducer, RootState } from '../reducers';
import thunk from 'redux-thunk';

export function configureStore(initialState?: RootState): Store<RootState> {

    // if dev tools are available, create store object with them integrated
    const create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;

    // if in dev env, inject redux logging
    const createStoreWithMiddleware = __ISDEVENV__
        ? applyMiddleware(logger, thunk, websocket, createLogger({ collapsed: true, level: 'info', diff: true }))(create)
        : applyMiddleware(logger, thunk, websocket)(create);
    // initiate store
    const store = createStoreWithMiddleware(
        rootReducer,
        initialState
    ) as Store<RootState>;

    // if hot module reloading is available
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;

}
