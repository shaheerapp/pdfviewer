import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Box, HStack, Icon, Image, Pressable, Text, VStack } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants/theme';
import { IMAGES } from '../constants/images';
import { useSelector } from 'react-redux';

interface Props {
    navigation: any;
    login: any;
}

const Profile: React.FC<Props> = ({ navigation, login }) => {
    const user = useSelector((state: any) => state.user.user);

    return (
        <SafeAreaView>
            <VStack ml={4} mr={4} mt={4}>
                <HStack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <Box />
                    <Text
                        fontSize={19}
                        fontFamily={FONTS.InterSemiBold}
                        ml={5}
                        fontWeight={'semibold'}
                    >
                        Profile
                    </Text>
                    <Pressable
                        _pressed={{ opacity: 0.8 }}
                        onPress={() => navigation.navigate('Settings')}
                    >
                        <Icon
                            as={Ionicons}
                            name="settings-outline"
                            size="7"
                            color={COLORS.gray200}
                        />
                    </Pressable>
                </HStack>
                <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                    <Box mt={8} alignItems={'center'}>
                        <Image
                            source={IMAGES.avatar}
                            alt="Avatar"
                            width={'32'}
                            height={'32'}
                        />
                        <Text
                            mt={3}
                            fontSize={20}
                            fontFamily={FONTS.InterSemiBold}
                            fontWeight={'semibold'}
                            color={COLORS.gray200}
                        >
                            {user.firstName} {user.lastName}
                        </Text>

                    </Box>
                    <VStack
                        mt={10}
                        mb={'40'}
                    >
                        <Text
                            fontSize={17}
                            fontFamily={FONTS.InterBold}
                            fontWeight={'bold'}
                            color={COLORS.gray200}
                        >
                            Username
                        </Text>
                        <Box
                            mt={2}
                            borderColor={COLORS.gray0}
                            borderWidth={1}
                            rounded={'md'}
                        >
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterRegular}
                                p={2}
                                fontWeight={'normal'}
                                color={COLORS.gray100}
                                ml={1}
                                noOfLines={2}
                                ellipsizeMode={'tail'}
                            >
                                {user.username}
                            </Text>
                        </Box>
                        <Text
                            fontSize={17}
                            fontFamily={FONTS.InterBold}
                            fontWeight={'bold'}
                            color={COLORS.gray200}
                            mt={3}
                        >
                            Phone Number
                        </Text>
                        <Box
                            mt={2}
                            borderColor={COLORS.gray0}
                            borderWidth={1}
                            rounded={'md'}
                        >
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterRegular}
                                p={2}
                                fontWeight={'normal'}
                                color={COLORS.gray100}
                                ml={1}
                                noOfLines={2}
                                ellipsizeMode={'tail'}
                            >
                                {user.phoneNumber}
                            </Text>
                        </Box>
                        <Text
                            fontSize={17}
                            fontFamily={FONTS.InterBold}
                            fontWeight={'bold'}
                            color={COLORS.gray200}
                            mt={3}
                        >
                            Address
                        </Text>
                        <Box
                            mt={2}
                            borderColor={COLORS.gray0}
                            borderWidth={1}
                            rounded={'md'}
                        >
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterRegular}
                                p={2}
                                fontWeight={'normal'}
                                color={COLORS.gray100}
                                ml={1}
                                noOfLines={2}
                                ellipsizeMode={'tail'}
                            >
                                {user.location}
                            </Text>
                        </Box>
                        <Text
                            fontSize={17}
                            fontFamily={FONTS.InterBold}
                            fontWeight={'bold'}
                            color={COLORS.gray200}
                            mt={3}
                        >
                            Country
                        </Text>
                        <Box
                            mt={2}
                            borderColor={COLORS.gray0}
                            borderWidth={1}
                            rounded={'md'}
                        >
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterRegular}
                                p={2}
                                fontWeight={'normal'}
                                color={COLORS.gray100}
                                ml={1}
                                noOfLines={2}
                                ellipsizeMode={'tail'}
                            >
                                {user.country}
                            </Text>
                        </Box>
                        <Text
                            fontSize={17}
                            fontFamily={FONTS.InterBold}
                            fontWeight={'bold'}
                            color={COLORS.gray200}
                            mt={3}
                        >
                            Language
                        </Text>
                        <Box
                            mt={2}
                            borderColor={COLORS.gray0}
                            borderWidth={1}
                            rounded={'md'}
                        >
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterRegular}
                                p={2}
                                fontWeight={'normal'}
                                color={COLORS.gray100}
                                ml={1}
                                noOfLines={2}
                                ellipsizeMode={'tail'}
                            >
                                {user.language}
                            </Text>
                        </Box>
                    </VStack>
                </ScrollView>
            </VStack>
        </SafeAreaView >
    );
};

export default Profile;

const styles = StyleSheet.create({});
