import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../redux/actions/UserActions';
import { resetPdfs } from '../redux/actions/PDFActions';
import { deleteUser } from 'firebase/auth';
import { equalTo, get, orderByChild, query, ref, remove } from 'firebase/database';
import { database } from '../firebase/firebaseconfig';

interface Props {
    navigation: any;
}

const Settings: React.FC<Props> = ({ navigation }) => {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();
    const [isDeleteing, setIsDeleting] = useState(false);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('pdfFiles');
            await AsyncStorage.removeItem('isFirstTime');
            dispatch(resetPdfs());
            dispatch(logoutUser());
            navigation.replace('SignIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (user) {
            setIsDeleting(true);
            try {
                const userQuery = query(ref(database, 'Users'), orderByChild('username'), equalTo(user.username));
                const snapshot = await get(userQuery);

                if (snapshot.exists()) {
                    const userId = Object.keys(snapshot.val())[0];
                    await remove(ref(database, `Users/${userId}`));
                    console.log('User account deleted successfully');
                    await handleLogout();
                    setIsDeleting(false);
                } else {
                    console.log('Error', 'User not found in the database');
                    setIsDeleting(false);
                }
            } catch (error: any) {
                console.error('Error deleting user account:', error.message);
                setIsDeleting(false);
            }
        } else {
            console.log('Error', 'No user is currently signed in');
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
                        onPress={handleDeleteAccount}
                        isDisabled={isDeleteing ? true : false}
                        _disabled={{ opacity: 0.7 }}
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
                                Delete your account
                            </Text>
                            <Icon as={Ionicons} name="trash-outline" size={6} color={COLORS.white} />
                        </HStack>
                    </Pressable>
                    <Pressable
                        mt={3}
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
