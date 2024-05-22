import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Heading, HStack, Spinner, Text, VStack } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS } from '../constants/theme';
import PDFList from '../components/PDFList';
import { PDF_LISTS, PDFItem } from '../constants/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setPDFs } from '../redux/actions/PDFActions';
import RNFS from 'react-native-fs';


interface Props {
    navigation: any;
}

const Home: React.FC<Props> = ({ navigation }) => {
    const user = useSelector((state: any) => state.user.user);
    const pdfs = useSelector((state: any) => state.pdfs.pdfs);
    const dispatch = useDispatch();


    useEffect(() => {
        const loadPDFsFromStorage = async () => {
            try {
                const storedPDFs = await AsyncStorage.getItem('pdfFiles');
                if (storedPDFs !== null) {
                    const parsedPDFs = JSON.parse(storedPDFs);
                    dispatch(setPDFs(parsedPDFs));
                }
            } catch (error) {
                console.error('Error loading PDFs from storage:', error);
            }
        };

        // Load PDFs from storage when component mounts
        loadPDFsFromStorage();
    }, []);

    const markAsRead = async (pdfId: any) => {
        try {
            const updatedPDFs = pdfs.map((pdf: any) =>
                pdf.id === pdfId ? { ...pdf, markAsRead: !pdf.markAsRead } : pdf
            );
            await AsyncStorage.setItem('pdfFiles', JSON.stringify(updatedPDFs));
            dispatch(setPDFs(updatedPDFs));
        } catch (error) {
            console.error('Error marking PDF as read:', error);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <VStack ml={4} flex={1} mr={4} mt={4}>
                <HStack
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Text
                        fontSize={19}
                        fontFamily={FONTS.InterSemiBold}
                        fontWeight={'semibold'}
                    >
                        PDF Viewer
                    </Text>

                </HStack>
                <VStack
                    mt={4}
                    flex={1}
                    justifyContent={'center'}
                >
                    {
                        pdfs.length > 0 ?
                            <FlatList
                                data={pdfs}
                                keyExtractor={(item: any) => item.id.toString()}
                                renderItem={(item) =>
                                    <PDFList
                                        item={item.item}
                                        navigation={navigation}
                                        onMarkAsRead={markAsRead}
                                    />
                                }
                            />
                            :
                            <HStack space={2} justifyContent="center" alignItems={'center'}>
                                <Spinner size={'lg'} color={COLORS.primary} accessibilityLabel="Loading pdfs" />
                                <Heading color={COLORS.primary} fontSize="lg">
                                    Loading
                                </Heading>
                            </HStack>
                    }
                </VStack>
            </VStack>
        </SafeAreaView >
    );
};

export default Home;

const styles = StyleSheet.create({});
