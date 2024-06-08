import React from 'react';
import {
    StatusBar,
} from 'react-native';
import {Provider} from "react-redux";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {store} from "./src/state/store.ts";
import {LoginScreen} from "./src/screens/LoginScreen";
import {HomeScreen} from "./src/screens/HomeScreen";
import {Screens} from "./src/type.ts";
import {ProductDetail} from "./src/screens/ProductDetail";
import Icon from "react-native-vector-icons/EvilIcons";
import {CartIcon} from "./src/components/CartIcon";
import {CartScreen} from "./src/screens/CartScreen";

const Stack = createNativeStackNavigator();
export const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={Screens.LOGIN}
                    component={LoginScreen}
                    options={{
                        title:'Login Out',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name={Screens.HOME}
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        title: 'Hero',
                        headerRight: () => <CartIcon action={() => navigation.navigate(Screens.CART)} />
                    })}
                />
                <Stack.Screen
                    name={Screens.PRODUCT_DETAIL}
                    component={ProductDetail}
                    options={({ navigation }) => ({
                        title: 'Hero',
                        headerRight: () => <CartIcon action={() => navigation.navigate(Screens.CART)} />
                    })}
                />
                <Stack.Screen
                    name={Screens.CART}
                    component={CartScreen}
                    options={{
                        headerShown: true,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default () => (
    <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Provider store={store}>
            <App/>
        </Provider>
    </GestureHandlerRootView>
);
