import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from "./Routers";
import { Provider } from "react-redux";
import { persistor, store } from "./Store";
import { PersistGate } from "redux-persist/es/integration/react";

interface Props {
    content?: any;
}


interface Store {
    user: { user: any, setUser: any }
}

const initialState = {
    user: { user: {}, setUser: () => { } }
};

export const Store = React.createContext<Store>(initialState);

export default (props: Props) => {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <RootStackScreen />
                </NavigationContainer>
            </PersistGate>
        </Provider>

    )
}