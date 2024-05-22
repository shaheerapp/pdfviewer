import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Box, Spinner, VStack } from 'native-base';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/actions/UserActions';
import { setPDFs } from '../redux/actions/PDFActions';
import { PDF_LISTS } from '../constants/utils';
import RNFS from 'react-native-fs';


interface Props {
    navigation: any,
}

const Splash: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();

    const downloadPDF = async (url: any, fileName: any) => {
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
        if (isFirstTime === null) {
            const updatedPDFList = [];
            for (const pdf of PDF_LISTS) {
                const localPath = await downloadPDF(pdf.pdf, `${pdf.id}.pdf`);
                if (localPath) {
                    updatedPDFList.push({
                        ...pdf,
                        localPath,
                    });
                } else {
                    updatedPDFList.push({
                        ...pdf,
                        localPath: pdf.pdf,
                    });
                }
            }
            await AsyncStorage.setItem('pdfFiles', JSON.stringify(updatedPDFList));
            await AsyncStorage.setItem('isFirstTime', 'false');
        }
    };


    useEffect(() => {
        const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));

        const asyncOperations = async () => {
            const user = await AsyncStorage.getItem('user');
            const isFirstTime = await AsyncStorage.getItem('isFirstTime');
            if (isFirstTime === null) {
                await checkFirstTime();
            }
            if (user) {
                dispatch(setUserDetails(JSON.parse(user)));
            }
            return user;
        };

        const navigate = async () => {
            const user = await asyncOperations();
            await minTimePromise;
            if (user) {
                navigation.replace('Main');
            } else {
                navigation.replace('SignIn');
            }
        };

        navigate();

        // Cleanup if needed
        return () => {
            // Any necessary cleanup
        };
    }, [dispatch, navigation]);
    return (
        <Box flex={1}>
            <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
                <Spinner color={COLORS.primary} size="lg" />
            </VStack>
        </Box>
    );
};

export default Splash;

const styles = StyleSheet.create({});
