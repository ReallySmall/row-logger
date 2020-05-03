import { createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { logger, websocket, auth } from '../middleware';
import { rootReducer, RootState } from '../reducers';
import thunk from 'redux-thunk';

export function configureStore(initialState?: RootState): Store<RootState> {

    const create = window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore;

    const createStoreWithMiddleware = __ISDEVENV__
        ? applyMiddleware(logger, thunk, websocket, auth, createLogger({ collapsed: true, level: 'info', diff: true }))(create)
        : applyMiddleware(logger, thunk, websocket, auth)(create);

    const store = createStoreWithMiddleware(
        rootReducer,
        initialState
    ) as Store<RootState>;

    if (module.hot) {

        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });

    }

    return store;

}
