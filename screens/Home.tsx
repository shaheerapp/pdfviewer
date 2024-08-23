import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Center, FlatList, Heading, HStack, Progress, Spinner, Text, VStack } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS } from '../constants/theme';
import PDFList from '../components/PDFList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setPDFs } from '../redux/actions/PDFActions';
import { PDF_LISTS_ARABIC, PDF_LISTS_ENGLISH, PDF_LISTS_HINDI, PDF_LISTS_RUSSIAN, PDF_LISTS_TURKISH } from '../constants/utils';
import RNFS from 'react-native-fs';


interface Props {
    navigation: any;
    login: any;
}

const Home: React.FC<Props> = ({ navigation, login }) => {
    const user = useSelector((state: any) => state.user.user);
    const pdfs = useSelector((state: any) => state.pdfs.pdfs);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadedCount, setDownloadedCount] = useState(0);
    const [pdfCount, setPdfCount] = useState(0);
    const dispatch = useDispatch();

    const downloadPDF = async (url: string, fileName: string) => {
        const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        try {
            const response = await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
            if (response.statusCode === 200) {
                return path;
            } else {
                console.error(`Failed to download file from ${url}`);
                return null;
            }
        } catch (error) {
            console.error(`Error downloading file from ${url}`, error);
            return null;
        }
    };

    const checkFirstTime = async () => {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if (user !== null) {
            if (isFirstTime === null) {
                const updatedPDFList = [];
                const pdfList = user.language === 'Turkish' ? PDF_LISTS_TURKISH :
                    user.language === 'English' ? PDF_LISTS_ENGLISH :
                        user.language === 'Arabic' ? PDF_LISTS_ARABIC :
                            user.language === 'Hindi' ? PDF_LISTS_HINDI :
                                user.language === 'Russian' ? PDF_LISTS_RUSSIAN : PDF_LISTS_ENGLISH;
                let count = 0;
                setPdfCount(pdfList.length);
                for (const pdf of pdfList) {
                    setIsDownloading(true);
                    const localPath = await downloadPDF(pdf.pdf, `${pdf.id}.pdf`);
                    if (localPath) {
                        count++;
                        setDownloadedCount(count);
                    }
                    updatedPDFList.push({
                        ...pdf,
                        localPath: localPath || pdf.pdf,
                    });
                }

                await AsyncStorage.setItem('pdfFiles', JSON.stringify(updatedPDFList));
                const storedPDFs = await AsyncStorage.getItem('pdfFiles');
                if (storedPDFs !== null) {
                    const parsedPDFs = JSON.parse(storedPDFs);
                    dispatch(setPDFs(parsedPDFs));
                    await AsyncStorage.setItem('isFirstTime', 'false');
                    setIsDownloading(false);
                }
            }
        }
    };


    useEffect(() => {
        const setup = async () => {
            if (login === true) {
                await checkFirstTime();
            }
        };

        setup();

    }, []);


    useEffect(() => {
        setIsLoading(true);
        const loadPDFsFromStorage = async () => {
            try {
                const storedPDFs = await AsyncStorage.getItem('pdfFiles');
                if (storedPDFs !== null) {
                    const parsedPDFs = JSON.parse(storedPDFs);
                    dispatch(setPDFs(parsedPDFs));
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    setIsDownloading(true);
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
                        WWJ
                    </Text>

                </HStack>
                <VStack
                    mt={4}
                    flex={1}
                    mb={20}
                    justifyContent={'center'}
                >
                    {
                        isLoading ?
                            <HStack space={2} justifyContent="center" alignItems={'center'}>
                                <Spinner size={'lg'} color={COLORS.primary} accessibilityLabel="Loading pdfs" />
                                <Heading color={COLORS.primary} fontSize="lg">
                                    Loading
                                </Heading>
                            </HStack>
                            :
                            isDownloading ?
                                <VStack alignItems={'center'}
                                >
                                    <HStack>
                                        <Heading color={COLORS.primary} fontSize="lg">
                                            Downloading: {' '}
                                        </Heading>
                                        <Heading color={COLORS.primary} fontSize="lg">
                                            {downloadedCount}/{pdfCount}
                                        </Heading>
                                    </HStack>
                                    <HStack
                                        space={2}
                                        justifyContent="center"
                                        alignItems={'center'}
                                        mt={4}>

                                        <Box w="50%" maxW="400">
                                            <Progress
                                                bg="white"
                                                _filledTrack={{
                                                    bg: COLORS.primary,
                                                }}
                                                value={downloadedCount}
                                                max={pdfCount}
                                                mx="4"
                                            />
                                        </Box>

                                    </HStack>
                                </VStack>

                                :

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

                    }
                </VStack>
            </VStack>
        </SafeAreaView >
    );
};

export default Home;

const styles = StyleSheet.create({});
