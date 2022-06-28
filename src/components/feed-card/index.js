import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { mvs } from '../../constants/metrices'
import { palette } from '../../constants/colors'

const FeedCard = ({ item, index }) => {
    const { title, body } = item
    return (
        <View style={styles.CARD_CONTAINER}>
            <Text style={styles.TITLE}>Title : <Text style={styles.CONTENT}>{title}</Text></Text>
            <Text style={styles.TITLE}>Description : <Text style={styles.CONTENT}>{body}</Text></Text>
        </View>
    )
}

export default FeedCard

const styles = StyleSheet.create({
    CARD_CONTAINER:{ padding: mvs(10), ...palette.shadow, backgroundColor: palette.white, borderRadius: 10, marginVertical: mvs(10) },
    TITLE: {
        fontWeight: 'bold',
        fontSize: mvs(22)
    },
    CONTENT: {
        fontWeight: '500',
        fontSize: mvs(15)
    }
})