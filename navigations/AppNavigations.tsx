import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ChangePassword, EditProfile, Home, Settings, SignIn, SignUp, Splash, ViewPDF } from '../screens';
import BottomNavigation from './BottomNavigation';


const AppNavigations = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Main" component={BottomNavigation} />
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ViewPDF" component={ViewPDF} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigations;
