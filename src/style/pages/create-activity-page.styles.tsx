import { StyleSheet } from "react-native";

const createActivityPageStyles = StyleSheet.create({
    createActivity: {
        flex: 1,
        margin: 32
    },

    createActivityTitle: {
        color: "#06CEFF",
        fontSize: 32,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 32
    },

    createActvityForm: {
        display: 'flex',
        gap: 16
    },

    createActivityFormSubmitButton: {
        width: "100%",
    }
});

export default createActivityPageStyles;