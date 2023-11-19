import { StyleSheet } from "react-native";

const customButtonStyles = StyleSheet.create({
    buttonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06CEFF',
        borderRadius: 6,
        alignSelf: 'flex-start',
        padding: 16
    },

    buttonMd: {
        padding: 16
    },

    buttonLg: {
        padding: 32
    }
});

export default customButtonStyles;