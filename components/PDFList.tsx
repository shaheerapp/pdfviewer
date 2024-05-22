import { StyleSheet } from 'react-native';
import React from 'react';
import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import { COLORS, FONTS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    item: any
    navigation: any;
    onMarkAsRead: any;
}

const PDFList: React.FC<Props> = ({ item, navigation, onMarkAsRead }) => {
    return (
        <Pressable
            _pressed={{ opacity: 0.7 }}
            onPress={() => navigation.navigate('ViewPDF', { item })}
        >
            <HStack
                borderColor={COLORS.gray50}
                padding={4}
                borderWidth={1}
                rounded={'lg'}
                mt={4}
                justifyContent={'space-between'}
                alignItems={'center'}
                bg={COLORS.white}
            >
                <Text
                    color={COLORS.gray200}
                    fontFamily={FONTS.InterMedium}
                    fontWeight={'medium'}
                    fontSize={16}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    mr={2}
                >
                    {item.title}
                </Text>
                <Pressable
                    _pressed={{ opacity: 0.7 }}
                    onPress={() => onMarkAsRead(item.id)}
                >
                    <Icon as={Ionicons} name={item.markAsRead ? 'checkmark-circle' : 'checkmark-circle-outline'} color={COLORS.primary} size={6} />
                </Pressable>
            </HStack>
        </Pressable>
    );
};

export default PDFList;

const styles = StyleSheet.create({});
