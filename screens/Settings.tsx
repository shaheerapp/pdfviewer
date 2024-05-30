import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../redux/actions/UserActions';

interface Props {
    navigation: any;
}

const Settings: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('pdfFiles');
            await AsyncStorage.removeItem('isFirstTime');
            dispatch(logoutUser());
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <SafeAreaView>
            <VStack
                ml={4}
                mr={4}
                mt={5}
            >
                <HStack
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Pressable
                        bg={COLORS.gray0}
                        height={45}
                        width={45}
                        rounded={'full'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        _pressed={{ opacity: 0.8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back-outline" size={24} color={COLORS.gray200} />
                    </Pressable>
                    <Text
                        fontSize={19}
                        fontFamily={FONTS.InterSemiBold}
                        fontWeight={'semibold'}
                    >
                        Settings
                    </Text>
                    <Box w={45} />
                </HStack>
                <VStack mt={8}>
                    <VStack>
                        <Text
                            fontSize={16}
                            fontWeight={'semibold'}
                            fontFamily={FONTS.InterSemiBold}
                        >
                            Account
                        </Text>
                        <Pressable
                            onPress={() => navigation.navigate('EditProfile')}
                            _pressed={{ opacity: 0.8 }}
                        >
                            <HStack
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                bg={COLORS.gray0}
                                p={'2.5'}
                                pl={4}
                                mt={2}
                                rounded={'md'}
                            >
                                <Text
                                    fontSize={15}
                                    fontFamily={FONTS.InterMedium}
                                    fontWeight={'medium'}
                                    color={COLORS.gray200}
                                >
                                    Edit Profile
                                </Text>
                                <Icon as={Ionicons} name="chevron-forward-outline" size={6} color={COLORS.gray200} />
                            </HStack>
                        </Pressable>
                        <Pressable
                            onPress={() => navigation.navigate('ChangePassword')}
                            _pressed={{ opacity: 0.8 }}
                        >
                            <HStack
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                bg={COLORS.gray0}
                                p={'2.5'}
                                pl={4}
                                mt={2}
                                rounded={'md'}
                            >
                                <Text
                                    fontSize={15}
                                    fontFamily={FONTS.InterMedium}
                                    fontWeight={'medium'}
                                    color={COLORS.gray200}
                                >
                                    Change Password
                                </Text>
                                <Icon as={Ionicons} name="chevron-forward-outline" size={6} color={COLORS.gray200} />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ opacity: 0.8 }}
                        >
                            <HStack
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                bg={COLORS.gray0}
                                p={'2.5'}
                                pl={4}
                                mt={2}
                                rounded={'md'}
                            >
                                <Text
                                    fontSize={15}
                                    fontFamily={FONTS.InterMedium}
                                    fontWeight={'medium'}
                                    color={COLORS.gray200}
                                >
                                    Privacy Policy
                                </Text>
                                <Icon as={Ionicons} name="chevron-forward-outline" size={6} color={COLORS.gray200} />
                            </HStack>
                        </Pressable>
                    </VStack>
                    <VStack
                        mt={4}
                    >
                        <Text
                            fontSize={16}
                            fontWeight={'semibold'}
                            fontFamily={FONTS.InterSemiBold}
                        >
                            Support & Help
                        </Text>
                        <Pressable
                            onPress={() => { }}
                            _pressed={{ opacity: 0.8 }}
                        >
                            <HStack
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                bg={COLORS.gray0}
                                p={'2.5'}
                                pl={4}
                                mt={2}
                                rounded={'md'}
                            >
                                <Text
                                    fontSize={15}
                                    fontFamily={FONTS.InterMedium}
                                    fontWeight={'medium'}
                                    color={COLORS.gray200}
                                >
                                    Share App
                                </Text>
                                <Icon as={Ionicons} name="chevron-forward-outline" size={6} color={COLORS.gray200} />
                            </HStack>
                        </Pressable>
                        <Pressable
                            onPress={() => { }}
                            _pressed={{ opacity: 0.8 }}
                        >
                            <HStack
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                bg={COLORS.gray0}
                                p={'2.5'}
                                pl={4}
                                mt={2}
                                rounded={'md'}
                            >
                                <Text
                                    fontSize={15}
                                    fontFamily={FONTS.InterMedium}
                                    fontWeight={'medium'}
                                    color={COLORS.gray200}
                                >
                                    Rate App
                                </Text>
                                <Icon as={Ionicons} name="chevron-forward-outline" size={6} color={COLORS.gray200} />
                            </HStack>
                        </Pressable>
                    </VStack>
                    <Pressable
                        mt={10}
                        _pressed={{ opacity: 0.8 }}
                        onPress={handleLogout}
                    >
                        <HStack
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            bg={COLORS.red50}
                            p={'2.5'}
                            pl={4}
                            mt={2}
                            rounded={'xl'}
                        >
                            <Text
                                fontSize={15}
                                fontFamily={FONTS.InterBold}
                                fontWeight={'bold'}
                                color={COLORS.white}
                            >
                                Logout
                            </Text>
                            <Icon as={Feather} name="log-out" size={6} color={COLORS.white} />
                        </HStack>
                    </Pressable>
                </VStack>
            </VStack>
        </SafeAreaView >
    );
};

export default Settings;

const styles = StyleSheet.create({});
