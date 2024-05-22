import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Center, CheckIcon, HStack, Icon, Input, Pressable, Select, Text, VStack } from 'native-base';
import { COLORS, FONTS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { ref, query, orderByChild, equalTo, get, update } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../firebase/firebaseconfig';
import { logoutUser, updateProfile } from '../redux/actions/UserActions';
import Snackbar from 'react-native-snackbar';

interface Props {
    navigation: any;
}

const EditProfile: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.user);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [countryError, setCountryError] = useState('');


    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhoneNumber(user.phoneNumber);
        setLocation(user.location);
        setCountry(user.country);
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            dispatch(logoutUser());
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleUpdateProfile = async () => {

        setFirstNameError('');
        setLastNameError('');
        setPhoneNumberError('');
        setLocationError('');
        setCountryError('');

        if (!firstName.trim()) {
            setFirstNameError('First name is required');
            return;
        }
        if (!lastName.trim()) {
            setLastNameError('Last name is required');
            return;
        }
        if (!phoneNumber.trim()) {
            setPhoneNumberError('Phone number is required');
            return;
        }
        if (!location.trim()) {
            setLocationError('Location is required');
            return;
        }
        if (!country.trim()) {
            setCountryError('Country is required');
            return;
        }

        try {
            const userQuery = query(ref(database, 'Users'), orderByChild('username'), equalTo(user.username));
            const snapshot = await get(userQuery);

            if (snapshot.exists()) {
                setIsUpdating(true);
                const userId = Object.keys(snapshot.val())[0];

                const updatedUser = {
                    firstName,
                    lastName,
                    phoneNumber,
                    location,
                    country,
                    language: user.language,
                    username: user.username,
                    password: user.password,
                };

                await update(ref(database, `Users/${userId}`), updatedUser);
                await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
                dispatch(updateProfile(updatedUser));
                setIsUpdating(false);
                Snackbar.show({
                    text: 'Profile updated successfully',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                setIsUpdating(false);
                Snackbar.show({
                    text: 'User not found',
                    duration: Snackbar.LENGTH_SHORT,
                });
                handleLogout();

            }
        } catch (error) {
            setIsUpdating(false);
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
                        Edit Profile
                    </Text>
                    <Box w={45} />
                </HStack>
                <VStack mt={10}>
                    <HStack>
                        <VStack
                            w={'50%'}
                        >
                            <Input
                                variant="outline"
                                paddingTop={3}
                                paddingBottom={3}
                                fontSize={15}
                                fontFamily={FONTS.InterMedium}
                                fontWeight={'normal'}
                                color={COLORS.gray200}
                                borderColor={firstNameError ? COLORS.red100 : COLORS.gray50}
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
                        <VStack
                            w={'50%'}
                        >
                            <Input
                                variant="outline"
                                paddingTop={3}
                                paddingBottom={3}
                                fontSize={15}
                                fontFamily={FONTS.InterMedium}
                                fontWeight={'normal'}
                                color={COLORS.gray200}
                                borderColor={lastNameError ? COLORS.red100 : COLORS.gray50}
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
                                    color={COLORS.red100}
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
                        color={COLORS.gray200}
                        placeholder="Enter Phone Number"
                        borderColor={phoneNumberError ? COLORS.red100 : COLORS.gray50}
                        mt={3}
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
                            color={COLORS.red100}
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
                        placeholder="Enter Home Location"
                        borderColor={locationError ? COLORS.red100 : COLORS.gray50}
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
                            color={COLORS.red100}
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
                        color={COLORS.gray200}
                        placeholder="Enter Country"
                        borderColor={countryError ? COLORS.red100 : COLORS.gray50}
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
                            color={COLORS.red100}
                            mt={1}
                        >
                            {countryError}
                        </Text>
                    }
                    <Pressable
                        bg={COLORS.primary}
                        height={45}
                        width={'100%'}
                        rounded={'full'}
                        mt={7}
                        disabled={isUpdating ? true : false}
                        _disabled={{ opacity: 0.7 }}
                        justifyContent={'center'}
                        alignItems={'center'}
                        _pressed={{ opacity: 0.7 }}
                        onPress={handleUpdateProfile}
                    >
                        <HStack justifyContent={'center'} alignItems="center" width="100%" position="relative">
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterBold}
                                fontWeight={'bold'}
                                color={COLORS.white}
                                position="absolute"
                            >
                                Update Profile
                            </Text>
                        </HStack>
                    </Pressable>
                </VStack>
            </VStack>
        </SafeAreaView>
    );
};

export default EditProfile;

const styles = StyleSheet.create({});
