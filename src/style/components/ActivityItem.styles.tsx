import { StyleSheet } from "react-native";

const activityItemStyles = StyleSheet.create({
    activityItemWrapper: {
        width: "100%",
        backgroundColor: "#FBF8F8",
        borderRadius: 6,
    },

    activityItem: {
        display: "flex",
        gap: 16,
        padding: 16
    },

    activityItemExtraData: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        justifyContent: "flex-start",
        width: "100%"
    },

    activityItemActions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 10,
        width: "100%"
    }
});

export default activityItemStyles;