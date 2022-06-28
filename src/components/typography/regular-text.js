import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../../constants/colors';
import { mvs } from '../../constants/metrices';

//Basically i create this component where i can describe different type of typography according to font family.

export const Regular = ({
    label,
    style,
    size = 15,
    mt = 0,
    color = palette.black,
    ...props
}) => {
    return (
        <Text
            {...props}
            style={{
                ...styles.LABEL,
                fontSize: size,
                color: color,
                ...style
            }}
        >
            {label}
        </Text>
    );
};






const styles = StyleSheet.create({
    LABEL: {
        fontSize: mvs(15),
        color: palette.black, //default color
    },
});
