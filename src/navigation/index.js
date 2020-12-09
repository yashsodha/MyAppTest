/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import OrderScreen from '../screens/OrderScreen';
import LoginScreen from '../screens/authentication/Login';
import { useSelector, useDispatch } from 'react-redux';
import { setLogged } from '../redux/action/authenticationActions';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AppStacks = () => {
    return (
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                    <Stack.Screen name="OrderScreen" component={OrderScreen} />

            </Stack.Navigator>



    );
};
const AppNavigation = () => {
    const dispatch = useDispatch();
    const [appLoading, setLoading] = useState(true)
    useEffect(() => {
        AsyncStorage.getItem('user').then(savedUser => {
            setLoading(false)
            if (savedUser) {
                dispatch(setLogged(savedUser));
            }
        });
    }, []);

    const { user, loading } = useSelector(state => state.user);
    if (loading || appLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={user ? "App" : "Auth"}
                screenOptions={{ headerShown: false }}
            >
                {user ?
                    <Stack.Screen name="App" component={AppStacks} />
                    :
                    <Stack.Screen name="Auth" component={LoginScreen} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
export default AppNavigation;