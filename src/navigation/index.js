// In App.js in a new project

import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import SignInScreen from '../screens/signin';
import HomeScreen from '../screens/home';

// 

/**
 * createNativeStackNavigator is a function that returns an object containing 2 properties: Screen and Navigator. 
 * Both of them are React components used for configuring the navigator. The Navigator should contain Screen elements as its children to define the configuration for routes.
 */
const Stack = createNativeStackNavigator();

const MainNavigator = props => {
    //hastoken contains the value which decides the initialRouteName pass from parent component.
    const { hastoken } = props;

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={hastoken ? 'home' : "signin"}
                screenOptions={{ gestureEnabled: false, headerShown: false }}>

                <Stack.Screen
                    name="signin"
                    component={SignInScreen}
                />
                <Stack.Screen
                    name="home"
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator
