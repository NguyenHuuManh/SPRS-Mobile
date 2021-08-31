// Imports: Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import _ from 'lodash';
// Imports: Redux
import sagas from '../Redux/Sagas';
import rootReducer from '../Redux/Reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import httpServices from '../Services/httpServices';
// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    timeout: 0,
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: ['userReducer', 'languageReducer'],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [],
};
// Middleware: Redux Persist Persisted Reducer
const middleware = [];
const sagaMiddleware = createSagaMiddleware();
const handleAuthTokenMiddleware = (store) => (next) => (action) => {
    // if (action.type === actionTypes.LOGIN_SUCCESS) {
    //   const token = action.response?.result.accessToken;
    //   serviceHandle.setToken(token);
    // }
    next(action);
};
middleware.push(sagaMiddleware, handleAuthTokenMiddleware);
if (__DEV__) {
    middleware.push(createLogger());
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancers = [applyMiddleware(...middleware)];

const config = { enhancers };

// Redux: Store
const store = createStore(persistedReducer, undefined, compose(...enhancers));
// Middleware: Redux Persist Persister
const persistor = persistStore(store, config, () => {
    const stateData = store.getState();

    if (!_.isEmpty(stateData?.userReducer?.data?.token || {})) {
        httpServices.attachTokenToHeader(stateData?.userReducer?.data?.token);
    }
});
sagaMiddleware.run(sagas);

// Exports
export { store, persistor };
