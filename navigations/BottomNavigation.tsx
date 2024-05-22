import { Platform, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile } from '../screens';
import { Center, Icon, VStack, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';


const BottomNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 90 : 60,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
            }}
            initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VStack>
                            <Center>
                                <Icon as={Feather} name="home" size={6} color={focused ? COLORS.primary : COLORS.gray200} />
                                {
                                    focused &&
                                    <Text
                                        color={COLORS.primary}
                                        fontSize={13}
                                        fontFamily={FONTS.InterMedium}
                                        fontWeight={'medium'}
                                    >

                                        Home
                                    </Text>
                                }
                            </Center>
                        </VStack>
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VStack>
                            <Center>
                                <Icon as={Feather} name="user" size={6} color={focused ? COLORS.primary : COLORS.gray200} />
                                {
                                    focused &&
                                    <Text
                                        color={COLORS.primary}
                                        fontSize={13}
                                        fontFamily={FONTS.InterMedium}
                                        fontWeight={'medium'}
                                    >
                                        Profile
                                    </Text>
                                }
                            </Center>
                        </VStack>
                    ),
                }} />
        </Tab.Navigator>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
