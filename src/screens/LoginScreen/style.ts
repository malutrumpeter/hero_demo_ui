import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#23272F',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 100,
        paddingHorizontal: 32,
    },
    buttonText: {
        fontWeight: 700,
        fontSize: 18,
        alignSelf: 'center',
    },
    button: {
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 250,
        marginVertical: 4,
    },
    textInput: {
        height: 40,
        marginBottom: 10,
        width: 250,
        borderRadius: 25,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        fontSize: 16,
    },
});
