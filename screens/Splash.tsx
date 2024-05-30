import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Box, Spinner, VStack } from 'native-base';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../redux/actions/UserActions';
import { PDF_LISTS, PDF_LISTS_TURKISH } from '../constants/utils';
import RNFS from 'react-native-fs';

interface Props {
    navigation: any;
}

const Splash: React.FC<Props> = ({ navigation }) => {
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

    const checkFirstTime = async (userData: any) => {
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if (userData !== null) {
            if (isFirstTime === null) {
                console.log('User: ', userData);
                const updatedPDFList = [];
                const pdfList = userData.language === 'Turkish' ? PDF_LISTS_TURKISH :
                    userData.language === 'English' ? PDF_LISTS : PDF_LISTS;
                for (const pdf of pdfList) {
                    const localPath = await downloadPDF(pdf.pdf, `${pdf.id}.pdf`);
                    updatedPDFList.push({
                        ...pdf,
                        localPath: localPath || pdf.pdf,
                    });
                }

                await AsyncStorage.setItem('pdfFiles', JSON.stringify(updatedPDFList));
                await AsyncStorage.setItem('isFirstTime', 'false');
            }
        }
    };

    useEffect(() => {
        const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));

        const asyncOperations = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                dispatch(setUserDetails(JSON.parse(userData)));
            }

            const isFirstTime = await AsyncStorage.getItem('isFirstTime');
            if (isFirstTime === null) {
                await checkFirstTime(userData);
            }

            return userData;
        };

        const navigate = async () => {
            const userData = await asyncOperations();
            await minTimePromise;
            navigation.replace(userData ? 'Main' : 'SignIn');
        };

        navigate();
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
