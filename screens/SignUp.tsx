import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Box, Center, CheckIcon, HStack, Icon, Input, Pressable, Select, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { orderByChild, equalTo, get, ref, push, query } from 'firebase/database';
import { database } from '../firebase/firebaseconfig';

interface Props {
    navigation: any,
}

const SignUp: React.FC<Props> = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [language, setLanguage] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [languageError, setLanguageError] = useState('');

    const [isSigning, setIsSigning] = useState(false);
    const [signUpError, setSignUpError] = useState('');

    const signUpUser = async () => {
        let valid = true;

        if (firstName === '') {
            setFirstNameError('Required');
            valid = false;
        } else {
            setFirstNameError('');
        }

        if (lastName === '') {
            setLastNameError('Required');
            valid = false;
        } else {
            setLastNameError('');
        }

        if (username === '') {
            setUsernameError('Username is required');
            valid = false;
        } else {
            const usernameRef = ref(database, 'Users');
            const usernameQuery = query(usernameRef, orderByChild('username'), equalTo(username));

            try {
                const snapshot = await get(usernameQuery);
                if (snapshot.exists()) {
                    setUsernameError('Username already exists');
                    valid = false;
                } else {
                    setUsernameError('');
                }
            } catch (error) {
                console.error('Error checking username:', error);
                setUsernameError('Error checking username');
                valid = false;
            }
        }

        if (phoneNumber === '') {
            setPhoneNumberError('Phone number is required');
            valid = false;
        } else {
            setPhoneNumberError('');
        }

        if (location === '') {
            setLocationError('Location is required');
            valid = false;
        } else {
            setLocationError('');
        }

        if (country === '') {
            setCountryError('Country is required');
            valid = false;
        } else {
            setCountryError('');
        }

        if (password === '') {
            setPasswordError('Password is required');
            valid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (confirmPassword === '') {
            setConfirmPasswordError('Confirm password is required');
            valid = false;
        } else if (confirmPassword.length < 8) {
            setConfirmPasswordError('Confirm Password must be at least 8 characters long');
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (language === '') {
            setLanguageError('Language is required');
            valid = false;
        } else {
            setLanguageError('');
        }

        if (!valid) {
            return;
        }

        const userData = {
            firstName,
            lastName,
            username,
            phoneNumber,
            location,
            country,
            password,
            language,
        };

        setIsSigning(true);
        push(ref(database, 'Users'), userData)
            .then(() => {
                setIsSigning(false);
                navigation.navigate('SignIn');
            })
            .catch(error => {
                console.error(error);
                setIsSigning(false);
                setSignUpError('Error Creating Account');
            });
    };


    return (
        <SafeAreaView>
            <VStack
                mt={10}
                ml={4}
                mr={4}
            >
                <Box pb={4}>
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
                </Box>
                <ScrollView nestedScrollEnabled={true} style={{ width: '100%' }} showsVerticalScrollIndicator={false}
                >
                    <VStack mt={8}>
                        <Text
                            fontSize={28}
                            fontFamily={FONTS.InterBold}
                            fontWeight={'bold'}
                            color={COLORS.gray200}
                        >
                            Create Account</Text>
                        <Text
                            fontSize={15}
                            fontFamily={FONTS.InterMedium}
                            fontWeight={'medium'}
                            color={COLORS.gray75}
                            mt={1}
                        >
                            Enter your details below to get started
                        </Text>

                        {
                            signUpError &&
                            <Text
                                fontSize={14}
                                fontFamily={FONTS.InterMedium}
                                fontWeight={'medium'}
                                color={COLORS.red100}
                                textAlign={'center'}
                                mt={4}
                            >
                                {signUpError}
                            </Text>
                        }
                    </VStack>
                    <VStack mt={10}>
                        <HStack>
                            <VStack w={'50%'}>
                                <Input
                                    variant="outline"
                                    paddingTop={3}
                                    paddingBottom={3}
                                    fontSize={15}
                                    fontFamily={FONTS.InterMedium}
                                    fontWeight={'normal'}
                                    color={COLORS.gray200}
                                    borderColor={firstNameError ? COLORS.red50 : COLORS.gray50}
                                    mr={4}
                                    placeholder="Enter First name"
                                    type={'text'}
                                    _focus={{
                                        backgroundColor: 'transparent',
                                        borderColor: COLORS.primary,
                                    }}
                                    onChangeText={(text) => setFirstName(text)}
                                    value={firstName}
                                />
                                {
                                    firstNameError &&
                                    <Text
                                        fontSize={12}
                                        fontFamily={FONTS.InterLight}
                                        fontWeight={'medium'}
                                        color={COLORS.red100}
                                        mt={1}
                                    >
                                        {firstNameError}
                                    </Text>
                                }

                            </VStack>
                            <VStack w={'50%'}>
                                <Input
                                    variant="outline"
                                    paddingTop={3}
                                    paddingBottom={3}
                                    fontSize={15}
                                    fontFamily={FONTS.InterMedium}
                                    fontWeight={'normal'}
                                    color={COLORS.gray200}
                                    borderColor={lastNameError ? COLORS.red50 : COLORS.gray50}
                                    placeholder="Enter Last name"
                                    type={'text'}
                                    _focus={{
                                        backgroundColor: 'transparent',
                                        borderColor: COLORS.primary,
                                    }}
                                    onChangeText={(text) => setLastName(text)}
                                    value={lastName}
                                />
                                {
                                    lastNameError &&
                                    <Text
                                        fontSize={12}
                                        fontFamily={FONTS.InterLight}
                                        fontWeight={'medium'}
                                        color={COLORS.red50}
                                        mt={1}
                                    >
                                        {lastNameError}
                                    </Text>
                                }

                            </VStack>
                        </HStack>
                        <Input
                            variant="outline"
                            paddingTop={3}
                            paddingBottom={3}
                            fontSize={15}
                            fontFamily={FONTS.InterMedium}
                            fontWeight={'normal'}
                            borderColor={phoneNumberError ? COLORS.red50 : COLORS.gray50}
                            color={COLORS.gray200}
                            placeholder="Enter Phone Number"
                            mt={3}
                            keyboardType={'phone-pad'}
                            type={'text'}
                            _focus={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                            onChangeText={(text) => setPhoneNumber(text)}
                            value={phoneNumber}
                        />
                        {
                            phoneNumberError &&
                            <Text
                                fontSize={12}
                                fontFamily={FONTS.InterLight}
                                fontWeight={'medium'}
                                color={COLORS.red50}
                                mt={1}
                            >
                                {phoneNumberError}
                            </Text>
                        }
                        <Input
                            variant="outline"
                            paddingTop={3}
                            paddingBottom={3}
                            fontSize={15}
                            fontFamily={FONTS.InterMedium}
                            fontWeight={'normal'}
                            color={COLORS.gray200}
                            borderColor={usernameError ? COLORS.red50 : COLORS.gray50}
                            placeholder="Enter Username"
                            mt={3}
                            type={'text'}
                            autoCapitalize={'none'}
                            _focus={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                            onChangeText={(text) => setUsername(text)}
                            value={username}
                        />
                        {
                            usernameError &&
                            <Text
                                fontSize={12}
                                fontFamily={FONTS.InterLight}
                                fontWeight={'medium'}
                                color={COLORS.red50}
                                mt={1}
                            >
                                {usernameError}
                            </Text>
                        }
                        <Input
                            variant="outline"
                            paddingTop={3}
                            paddingBottom={3}
                            fontSize={15}
                            fontFamily={FONTS.InterMedium}
                            fontWeight={'normal'}
                            borderColor={locationError ? COLORS.red50 : COLORS.gray50}
                            color={COLORS.gray200}
                            placeholder="Enter Home Location"
                            autoCorrect={false}
                            mt={3}
                            type={'text'}
                            _focus={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                            onChangeText={(text) => setLocation(text)}
                            value={location}
                        />
                        {
                            locationError &&
                            <Text
                                fontSize={12}
                                fontFamily={FONTS.InterLight}
                                fontWeight={'medium'}
                                color={COLORS.red50}
                                mt={1}
                            >
                                {locationError}
                            </Text>
                        }
                        <Input
                            variant="outline"
                            paddingTop={3}
                            paddingBottom={3}
                            fontSize={15}
                            fontFamily={FONTS.InterMedium}
                            fontWeight={'normal'}
                            borderColor={countryError ? COLORS.red50 : COLORS.gray50}
                            color={COLORS.gray200}
                            placeholder="Enter Country"
                            autoCorrect={false}
                            mt={3}
                            type={'text'}
                            _focus={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                            onChangeText={(text) => setCountry(text)}
                            value={country}
                        />
                        {
                            countryError &&
                            <Text
                                fontSize={12}
                                fontFamily={FONTS.InterLight}
                                fontWeight={'medium'}
                                color={COLORS.red50}
                                mt={1}
                            >
                                {countryError}
                            </Text>
                        }
                        <Select
                            selectedValue={language}
                            accessibilityLabel="Choose Language"
                            placeholder="Choose Language"
                            paddingTop={3}
                            color={COLORS.gray200}
                            borderColor={languageError ? COLORS.red50 : COLORS.gray50}
                            paddingBottom={3}
                            fontSize={15}
                            _selectedItem={{
                                bg: 'teal.600',
                                endIcon: <CheckIcon size={'5'} />,
                            }}
                            mt={3}
                            onValueChange={itemValue => setLanguage(itemValue)}
                        >
                            <Select.Item label="English" value="English" />
                            <Select.Item label="Hindi" value="Hindi" />
                            <Select.Item label="Arabic" value="Arabic" />
                            <Select.Item label="Turkish" value="Turkish" />
                        </Select>
                        {
                            languageError &&
                            <Text
                                fontSize={12}
                                fontFamily={FONTS.InterLight}
                                fontWeight={'medium'}
                                color={COLORS.red50}
                                mt={1}
                            >
                                {languageError}
                            </Text>
                        }
                        <Input variant="outline"
                            paddingTop={3}
                            paddingBottom={3}
                            fontSize={15}
                            fontFamily={FONTS.InterMedium}
                            borderColor={passwordError ? COLORS.red50 : COLORS.gray50}
                            fontWeight={'normal'}
                            color={COLORS.gray200}
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            _focus={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                            placeholder="Enter Password"
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
                                color={COLORS.red50}
                                mt={1}
                            >
                                {passwordError}
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
                            borderColor={confirmPasswordError ? COLORS.red50 : COLORS.gray50}
                            _focus={{
                                backgroundColor: 'transparent',
                                borderColor: COLORS.primary,
                            }}
                            placeholder="Enter Confirm Password"
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
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
                        />
                        {
                            confirmPasswordError &&
                            <Text
                                fontSize={12}
                                fontFamily={FONTS.InterLight}
                                fontWeight={'medium'}
                                color={COLORS.red50}
                                mt={1}
                            >
                                {confirmPasswordError}
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
                            onPress={signUpUser}
                            isDisabled={isSigning ? true : false}
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
                                    Sign Up
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
                        <Center mt={7} mb={'40'}>
                            <Text
                                fontSize={15}
                                fontFamily={FONTS.InterMedium}
                                fontWeight={'medium'}
                                color={COLORS.gray75}
                            >
                                Already have an account?
                                <Box ml={1} />
                                <Pressable
                                    onPress={() => navigation.navigate('SignIn')}
                                    _pressed={{ opacity: 0.7 }}>
                                    <Text
                                        fontSize={15}
                                        fontFamily={FONTS.InterMedium}
                                        fontWeight={'medium'}
                                        color={COLORS.primary}
                                    >
                                        Sign In
                                    </Text>
                                </Pressable>
                            </Text>
                        </Center>
                    </VStack>
                </ScrollView>
            </VStack >
        </SafeAreaView >
    );
};

export default SignUp;

const styles = StyleSheet.create({});
