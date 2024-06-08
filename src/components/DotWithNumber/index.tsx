import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DotWithNumber = ({value}: {value: string}) => {
    return (
        <View style={styles.dot}>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        width: 18, // Adjust size as needed
        height: 18, // Adjust size as needed
        borderRadius: 18, // Make it a circle
        backgroundColor: 'red', // Adjust color as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white', // Adjust text color as needed
        fontSize: 12, // Adjust font size as needed
        fontWeight: '400',
        textAlign: 'center',
    },
});

export default DotWithNumber;
