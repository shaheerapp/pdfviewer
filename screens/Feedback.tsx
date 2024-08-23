import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { VStack, HStack, Box, Pressable, Text, TextArea } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants/theme';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';

interface Props {
    navigation: any
}

const Feedback: React.FC<Props> = ({ navigation }) => {
    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState('');
    const [isSubmiting, setIsSubmiting] = useState(false);
    const user = useSelector((state: any) => state.user.user);

    const [questionOneError, setQuestionOneError] = useState('');
    const [questionTwoError, setQuestionTwoError] = useState('');


    const handleSubmitFeedback = async () => {
        setIsSubmiting(true);
        setQuestionOneError('');
        setQuestionTwoError('');

        if (!questionOne.trim()) {
            setQuestionOneError('Required');
            setIsSubmiting(false);
            return;
        }
        if (!questionTwo.trim()) {
            setQuestionTwoError('Required');
            setIsSubmiting(false);
            return;
        }

        try {
            // Make the POST request
            const response = await axios.post('https://wwj-book.co.za/api/send-mail', {
                emailAddress: user.emailAddress,
                question1: questionOne,
                question2: questionTwo,
            });

            if (response.data.success) {
                console.log('Email sent successfully');
                setQuestionOne('');
                setQuestionTwo('');
                setIsSubmiting(false);
                Snackbar.show({
                    text: 'Email sent successfully',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            setIsSubmiting(false);
        } finally {
            setIsSubmiting(false);
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
                        Feedback
                    </Text>
                    <Box w={45} />
                </HStack>
                <VStack mt={8}>
                    <HStack
                        alignItems={'center'}
                    >
                        <Box
                            width={'2'}
                            height={'2'}
                            backgroundColor={COLORS.black}
                            rounded={'full'}
                        />
                        <Text
                            fontSize={16}
                            color={COLORS.black}
                            fontWeight={600}
                            ml={3}
                        >
                            What did you learn about God?
                        </Text>
                    </HStack>
                    <TextArea
                        mt={2}
                        h={'32'}
                        placeholder="Type your answer"
                        autoCompleteType={undefined}
                        fontSize={14}
                        color={COLORS.black}
                        borderColor={questionOneError ? COLORS.red100 : COLORS.gray50}
                        _focus={{
                            backgroundColor: COLORS.bg,
                            borderColor: COLORS.gray50,
                        }}
                        value={questionOne}
                        onChangeText={text => setQuestionOne(text)}
                    />
                    {
                        questionOneError &&
                        <Text
                            fontSize={12}
                            fontFamily={FONTS.InterLight}
                            fontWeight={'medium'}
                            color={COLORS.red100}
                            mt={1}
                        >
                            {questionOneError}
                        </Text>
                    }

                    <HStack
                        alignItems={'center'}
                        mt={5}
                    >
                        <Box
                            width={'2'}
                            height={'2'}
                            backgroundColor={COLORS.black}
                            rounded={'full'}
                        />
                        <Text
                            fontSize={16}
                            color={COLORS.black}
                            fontWeight={600}
                            ml={3}
                        >
                            How is this important to your life?
                        </Text>
                    </HStack>
                    <TextArea
                        mt={2}
                        h={'32'}
                        placeholder="Type your answer"
                        autoCompleteType={undefined}
                        fontSize={14}
                        color={COLORS.black}
                        borderColor={questionTwoError ? COLORS.red100 : COLORS.gray50}
                        _focus={{
                            backgroundColor: COLORS.bg,
                            borderColor: COLORS.gray50,
                        }}
                        value={questionTwo}
                        onChangeText={text => setQuestionTwo(text)}
                    />
                    {
                        questionTwoError &&
                        <Text
                            fontSize={12}
                            fontFamily={FONTS.InterLight}
                            fontWeight={'medium'}
                            color={COLORS.red100}
                            mt={1}
                        >
                            {questionTwoError}
                        </Text>
                    }

                    <Pressable
                        bg={COLORS.primary}
                        height={45}
                        width={'100%'}
                        rounded={'full'}
                        mt={7}
                        disabled={isSubmiting ? true : false}
                        _disabled={{ opacity: 0.7 }}
                        justifyContent={'center'}
                        alignItems={'center'}
                        _pressed={{ opacity: 0.7 }}
                        onPress={handleSubmitFeedback}
                    >
                        <HStack justifyContent={'center'} alignItems="center" width="100%" position="relative">
                            <Text
                                fontSize={17}
                                fontFamily={FONTS.InterBold}
                                fontWeight={'bold'}
                                color={COLORS.white}
                                position="absolute"
                            >
                                Submit
                            </Text>
                        </HStack>
                    </Pressable>
                </VStack>
            </VStack>
        </SafeAreaView>
    );
};

export default Feedback;

const styles = StyleSheet.create({});
