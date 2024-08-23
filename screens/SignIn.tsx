import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Box, Center, HStack, Icon, Input, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { get, query, ref, orderByChild, equalTo } from 'firebase/database';
import { database } from '../firebase/firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/actions/UserActions';

interface Props {
    navigation: any,
}

const SignIn: React.FC<Props> = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const [emailAddressError, setEmailAddressError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isSigning, setIsSigning] = useState(false);
    const [signInError, setSignInError] = useState('');


    const signInUser = async () => {
        let valid = true;

        setEmailAddressError('');
        setPasswordError('');
        setSignInError('');

        // Validate username
        if (emailAddress === '') {
            setEmailAddressError('Email Address is required');
            valid = false;
        }

        // Validate password
        if (password === '') {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            valid = false;
        }

        if (!valid) {
            return;
        }

        try {
            setIsSigning(true);
            // Construct a query to find the user by emailAddress
            const userQuery = query(ref(database, 'Users'), orderByChild('emailAddress'), equalTo(emailAddress));

            // Get the snapshot of the query result
            const snapshot = await get(userQuery);

            // Check if the user with the provided username exists
            if (snapshot.exists()) {
                // Retrieve the user data
                const userData = snapshot.val();
                const userId = Object.keys(userData)[0];
                const user = userData[userId];

                // Check if the provided password matches the password stored in the database
                if (userData[userId].password === password) {
                    await AsyncStorage.setItem('user', JSON.stringify(user));
                    dispatch(setUserDetails(user));
                    setIsSigning(false);
                    navigation.replace('Main', { login: true });
                } else {
                    setIsSigning(false);
                    setPasswordError('Incorrect password');
                }
            } else {
                setIsSigning(false);
                setEmailAddressError('User not found');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setIsSigning(false);
            setSignInError('Error signing in');
        }
    };

    return (
        <SafeAreaView>
            <VStack
                mt={10}
                ml={4}
                mr={4}
            >
                <VStack mt={8}>
                    <Text
                        fontSize={25}
                        fontFamily={FONTS.InterBold}
                        fontWeight={'bold'}
                        color={COLORS.gray200}
                    >
                        Welcome Back!</Text>
                    <Text
                        fontSize={15}
                        fontFamily={FONTS.InterMedium}
                        fontWeight={'medium'}
                        color={COLORS.gray75}
                    >
                        Enter Your Email & Password
                    </Text>

                    {
                        signInError &&
                        <Text
                            fontSize={14}
                            fontFamily={FONTS.InterMedium}
                            fontWeight={'medium'}
                            color={COLORS.red100}
                            mt={4}
                            textAlign={'center'}
                        >
                            {signInError}</Text>
                    }

                </VStack>
                <VStack mt={10}>
                    <Input
                        variant="outline"
                        paddingTop={3}
                        paddingBottom={3}
                        fontSize={15}
                        fontFamily={FONTS.InterMedium}
                        fontWeight={'normal'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        color={COLORS.gray200}
                        borderColor={emailAddressError ? COLORS.red50 : COLORS.gray50}
                        placeholder="Enter Email"
                        type={'text'}
                        _focus={{
                            backgroundColor: 'transparent',
                            borderColor: COLORS.primary,

                        }}
                        onChangeText={(text) => setEmailAddress(text)}
                        value={emailAddress}
                    />
                    {
                        emailAddressError &&
                        <Text
                            fontSize={12}
                            fontFamily={FONTS.InterLight}
                            fontWeight={'medium'}
                            color={COLORS.red100}
                            mt={1}
                        >
                            {emailAddressError}
                        </Text>
                    }
                    <Input variant="outline"
                        paddingTop={3}
                        paddingBottom={3}
                        fontSize={15}
                        fontFamily={FONTS.InterMedium}
                        fontWeight={'normal'}
                        color={COLORS.gray200}
                        _focus={{
                            backgroundColor: 'transparent',
                            borderColor: COLORS.primary,
                        }}
                        placeholder="Enter Password"
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        borderColor={passwordError ? COLORS.red50 : COLORS.gray50}
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
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    {
                        passwordError &&
                        <Text
                            fontSize={12}
                            fontFamily={FONTS.InterLight}
                            fontWeight={'medium'}
                            color={COLORS.red100}
                            mt={1}
                        >
                            {passwordError}
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
                        isDisabled={isSigning ? true : false}
                        _pressed={{ opacity: 0.7 }}
                        onPress={signInUser}
                        _disabled={{ opacity: 0.7 }}
                    >
                        <HStack justifyContent={'center'} alignItems="center" width="100%" position="relative">
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterBold}
                                fontWeight={'bold'}
                                color={COLORS.white}
                                position="absolute"
                                left="43%"
                            >
                                Sign In
                            </Text>
                            <Box position="absolute" right={3}>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-circle"
                                    size="7"
                                    color={COLORS.white}
                                />
                            </Box>
                        </HStack>
                    </Pressable>
                    <HStack
                        mt={10}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Text
                            fontSize={15}
                            fontFamily={FONTS.InterMedium}
                            fontWeight={'medium'}
                            color={COLORS.gray75}
                        >
                            Don't have an account?{' '}
                        </Text>
                        <Pressable
                            onPress={() => navigation.navigate('SignUp')}
                            _pressed={{ opacity: 0.7 }}>
                            <Text
                                fontSize={15}
                                fontFamily={FONTS.InterMedium}
                                fontWeight={'medium'}
                                color={COLORS.primary}
                            >
                                Sign Up
                            </Text>
                        </Pressable>
                    </HStack>
                </VStack>
            </VStack>
        </SafeAreaView>
    );
};

export default SignIn;

const styles = StyleSheet.create({});
