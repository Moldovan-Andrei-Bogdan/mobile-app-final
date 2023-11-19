import { GestureResponderEvent, TouchableOpacity } from "react-native";

import customButtonStyles from "../../../style/components/CustomButton.styles";
import customTextStyles from "../../../style/components/CustomText.styles";

import CustomText from "../Text/CustomText";

type Props = {
    innerText: string;
    bolded: boolean;
    size: any;
    additionalStyles?: any;
    click?: (event: GestureResponderEvent) => void | undefined
}


export default function CustomButton(props: Props) {

    const additionalStyles = props.additionalStyles ? [...props.additionalStyles] : [];

    return(
        <TouchableOpacity 
            style={[customButtonStyles.buttonMain, props.size, ...additionalStyles]} 
            onPress={props.click}
        >
            <CustomText 
                message={ props.innerText } 
                bold={ props.bolded } 
                additionalStyles={ [customTextStyles.bold, customTextStyles.white] } 
            />
        </TouchableOpacity>
    );
}