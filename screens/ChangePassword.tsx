import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Box, HStack, Icon, Input, Pressable, Text, VStack } from 'native-base';
import { COLORS, FONTS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { equalTo, get, orderByChild, query, ref, update } from 'firebase/database';
import { database } from '../firebase/firebaseconfig';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../redux/actions/UserActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
    navigation: any;
}

const ChangePassword: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

    const [isChangingPasswword, setIsChangingPasswword] = useState(false);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            dispatch(logoutUser());
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const handleChangePassword = async () => {
        let isValid = true;

        // Validate new password
        if (!newPassword.trim()) {
            setNewPasswordError('New password is required');
            isValid = false;
        } else if (newPassword.length < 8) {
            setNewPasswordError('Password must be at least 8 characters long');
            isValid = false;
        } else {
            setNewPasswordError('');
        }

        // Validate confirm new password
        if (!confirmNewPassword.trim()) {
            setConfirmNewPasswordError('Confirm new password is required');
            isValid = false;
        } else if (confirmNewPassword.length < 8) {
            setConfirmNewPasswordError('Confirm Password must be at least 8 characters long');
            isValid = false;
        } else {
            setConfirmNewPasswordError('');
        }

        // Validation checks for password match
        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmNewPasswordError('');
        }

        if (!isValid) {
            return;
        }

        try {
            setIsChangingPasswword(true);
            // Query the database to find the user by username
            const userQuery = query(ref(database, 'Users'), orderByChild('username'), equalTo(user.username));
            const snapshot = await get(userQuery);

            if (snapshot.exists()) {
                // Get the user's unique ID
                const userId = Object.keys(snapshot.val())[0];

                // Update the user's password field
                await update(ref(database, `Users/${userId}`), { password: newPassword });


                Snackbar.show({
                    text: 'Password changed successfully',
                    duration: Snackbar.LENGTH_SHORT,
                });
                setIsChangingPasswword(false);
            } else {
                setIsChangingPasswword(false);
                Snackbar.show({
                    text: 'User not found',
                    duration: Snackbar.LENGTH_SHORT,
                });
                handleLogout();
            }
        } catch (error) {
            setIsChangingPasswword(false);
            Snackbar.show({
                text: 'Error updating user profile',
                duration: Snackbar.LENGTH_SHORT,
            });
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
                        fontSize={18}
                        fontFamily={FONTS.InterSemiBold}
                        fontWeight={'semibold'}
                    >
                        Change Password
                    </Text>
                    <Box w={45} />
                </HStack>
                <VStack mt={8}>
                    <Input variant="outline"
                        paddingTop={3}
                        paddingBottom={3}
                        fontSize={15}
                        fontFamily={FONTS.InterMedium}
                        borderColor={newPasswordError ? COLORS.red100 : COLORS.gray50}
                        fontWeight={'normal'}
                        color={COLORS.gray200}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        _focus={{
                            backgroundColor: 'transparent',
                            borderColor: COLORS.primary,
                        }}
                        placeholder="Enter New Password"
                        mt={3}
                        type={showPassword ? 'text' : 'password'}
                        InputRightElement={
                            <Pressable
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon as={
                                    <MaterialIcons
                                        name={showPassword ? 'visibility' : 'visibility-off'} />}
                                    size={5} mr="2" color="muted.400" />
                            </Pressable>
                        }
                        onChangeText={(text) => setNewPassword(text)}
                        value={newPassword}
                    />
                    {
                        newPasswordError &&
                        <Text
                            fontSize={12}
                            fontFamily={FONTS.InterLight}
                            fontWeight={'medium'}
                            color={COLORS.red50}
                            mt={1}
                        >
                            {newPasswordError}
                        </Text>
                    }
                    <Input variant="outline"
                        paddingTop={3}
                        paddingBottom={3}
                        fontSize={15}
                        fontFamily={FONTS.InterMedium}
                        fontWeight={'normal'}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        color={COLORS.gray200}
                        borderColor={confirmNewPasswordError ? COLORS.red50 : COLORS.gray50}
                        _focus={{
                            backgroundColor: 'transparent',
                            borderColor: COLORS.primary,
                        }}
                        placeholder="Enter Confirm New Password"
                        mt={3}
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputRightElement={
                            <Pressable
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Icon as={
                                    <MaterialIcons
                                        name={showConfirmPassword ? 'visibility' : 'visibility-off'} />}
                                    size={5} mr="2" color="muted.400" />
                            </Pressable>
                        }
                        onChangeText={(text) => setConfirmNewPassword(text)}
                        value={confirmNewPassword}
                    />
                    {
                        confirmNewPasswordError &&
                        <Text
                            fontSize={12}
                            fontFamily={FONTS.InterLight}
                            fontWeight={'medium'}
                            color={COLORS.red50}
                            mt={1}
                        >
                            {confirmNewPasswordError}
                        </Text>
                    }
                    <Pressable
                        bg={COLORS.primary}
                        height={45}
                        width={'100%'}
                        rounded={'full'}
                        mt={7}
                        justifyContent={'center'}
                        alignItems={'center'}
                        _pressed={{ opacity: 0.7 }}
                        onPress={handleChangePassword}
                        disabled={isChangingPasswword ? true : false}
                        _disabled={{ opacity: 0.7 }}
                    >
                        <HStack justifyContent={'center'} alignItems="center" width="100%" position="relative">
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterBold}
                                fontWeight={'bold'}
                                color={COLORS.white}
                                position="absolute"
                            >
                                Change Password
                            </Text>
                        </HStack>
                    </Pressable>
                </VStack>
            </VStack>
        </SafeAreaView>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({});
