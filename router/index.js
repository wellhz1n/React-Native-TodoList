import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from '@react-navigation/stack';


import home from '../src/pages/home';
import newTodo from '../src/pages/newTodo';

// import { Container } from './styles';

const Stack = createStackNavigator();


const router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerTitleAlign: 'center', transitionSpec: {
                    open: TransitionSpecs.TransitionIOSSpec,
                    close:TransitionSpecs.TransitionIOSSpec
                },
                cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
                gestureEnabled:true,
                gestureDirection:'horizontal'
            }} >
                <Stack.Screen options={{ headerShown: false }} name="Home" component={home} />
                <Stack.Screen name="newTodo" options={{headerShown:false}} component={newTodo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default router;