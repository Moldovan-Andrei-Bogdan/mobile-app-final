import { StyleSheet } from "react-native";

const activityListPageStyles = StyleSheet.create({
    activityListPage: {
        display: "flex",
        flexDirection: "column",
        gap: 32,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        overflow: 'scroll'
    },

    header: {
        marginTop: 16
    },

    activityList: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },

    createActivityButton: {
        width: "100%",
    },

    loaderContainer: {
        width: "100%",
        height: "70%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default activityListPageStyles;