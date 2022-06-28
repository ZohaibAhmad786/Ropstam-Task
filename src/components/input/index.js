
import React from 'react';
import { StyleSheet, TextInput } from 'react-native'
import { palette } from '../../constants/colors';
import { mvs } from '../../constants/metrices';

// this is input component that i have create. if you want to dsiplay another input in your app you can use this component instead of creating new one.
export const Input = ({ value, placeholder, keyboardType, secureEntry, onChange }) => (
    <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.INPUT}
        secureTextEntry={secureEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
    />
)

const styles = StyleSheet.create({
    INPUT: {
        backgroundColor: palette.white,
        paddingHorizontal: mvs(20),
        borderRadius: 10,
        width: '100%',
        height: mvs(55),
        color: palette.lightGrey,
        marginVertical: mvs(15),
        ...palette.shadow
    },
})