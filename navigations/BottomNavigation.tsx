import { Platform, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Profile } from '../screens';
import { Center, Icon, VStack, Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';

interface Props {
    route: any;
}

const BottomNavigation: React.FC<Props> = ({ route }) => {
    const Tab = createBottomTabNavigator();
    const login = route.params?.login ?? false;
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
            <Tab.Screen name="Home"
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
            >
                {props => <Home {...props} login={login} />}
            </Tab.Screen>
            <Tab.Screen name="Profile"
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
                }}>
                {props => <Profile {...props} login={login} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
