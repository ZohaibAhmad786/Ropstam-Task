import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { palette } from '../../constants/colors';
import { mvs } from '../../constants/metrices';

export const CustomizedButton = ({
    title,
    disabled,
    onPress,
    loading
}) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.BTN}>
            {loading ? <ActivityIndicator color={'#fff'} size='small' /> : <Text style={styles.BTN_TITLE}>{title}</Text>}
        </TouchableOpacity>
    );
};
export const ImageButtom = ({
    disabled,
    onPress,
    source = require('./../../assets/download.png'),
    btnStyle = {}
}) => {
    let bool = Object.keys(btnStyle).length
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{ ...styles.IMAGE, ...btnStyle }}>
            <Image style={{ height: bool ? '70%' : '90%', width: bool ? '70%' : '90%' }} source={source} />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    BTN_TITLE: {
        color: palette.white,
        fontWeight: 'bold',

    },
    BTN: {
        backgroundColor: palette.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: mvs(55),
        width: '100%',
        alignItems: 'center',
    },
    IMAGE: {
        height: mvs(40),
        width: mvs(40),
        justifyContent: 'center', alignItems: 'center',
    }
})