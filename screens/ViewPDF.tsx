import { Dimensions, Linking, SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { COLORS, FONTS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setPDFs } from '../redux/actions/PDFActions';


interface Props {
    navigation: any;
    route: any;
}

const ViewPDF: React.FC<Props> = ({ navigation, route }) => {
    const { item } = route.params;
    const pdfs = useSelector((state: any) => state.pdfs.pdfs);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pdfSource, setPdfSource] = useState<{ uri: string }>({ uri: '' });
    const [isMarkAsRead, setIsMarkAsRead] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const selectedPdf = pdfs.find((pdf: any) => pdf.id === item.id);
        if (selectedPdf) {
            setPdfSource({ uri: `file://${selectedPdf.localPath}` });
            setIsMarkAsRead(selectedPdf.markAsRead);
        } else {
            console.error(`PDF with id ${item.id} not found in the store or PDF is null.`);
        }
    }, [item, pdfs]);

    const handleMarkAsRead = async (pdfId: any) => {
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
        <SafeAreaView style={styles.container}>
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
                        {currentPage}/{totalPages}
                    </Text>
                    <Pressable
                        _pressed={{ opacity: 0.7 }}
                        onPress={() => handleMarkAsRead(item.id)}
                    >
                        <Icon as={Ionicons} name={isMarkAsRead ? 'checkmark-circle' : 'checkmark-circle-outline'} color={COLORS.primary} size={7} />
                    </Pressable>
                </HStack>
                <VStack mt={6} alignItems={'center'} ml={4} mr={4}>
                    {pdfSource.uri !== '' && (
                        <Pdf
                            trustAllCerts={false}
                            source={pdfSource}
                            onLoadComplete={(numberOfPages, filePath) => {
                                setTotalPages(numberOfPages);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                setCurrentPage(page);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                Linking.openURL(uri);
                            }}
                            style={styles.pdf}
                        />
                    )
                    }
                </VStack>
            </VStack>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pdf: {
        width: Dimensions.get('window').width / 1.05,
        height: Dimensions.get('window').height,
        backgroundColor: COLORS.bg,
    },
});

export default ViewPDF;


