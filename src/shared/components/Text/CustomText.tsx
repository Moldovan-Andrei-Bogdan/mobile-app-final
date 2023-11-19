import { StyleSheet, Text } from "react-native";

type Props = {
    message: string;
    bold: boolean;
    additionalStyles?: any;
}

export default function CustomText(props: Props) {
    return (
        <Text style={ props.additionalStyles ? [...props.additionalStyles] : null }>
            { props.message }
        </Text>
    );
}