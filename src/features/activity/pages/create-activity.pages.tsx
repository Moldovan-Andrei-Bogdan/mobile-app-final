import { ActivityIndicator, SafeAreaView, ScrollView, TextInput, View } from "react-native";

import inputStyles from "../../../style/components/Input.styles";
import customButtonStyles from "../../../style/components/CustomButton.styles";
import customTextStyles from "../../../style/components/CustomText.styles";
import createActivityPageStyles from "../../../style/pages/create-activity-page.styles";

import CustomButton from "../../../shared/components/Button/CustomButton";
import CustomText from "../../../shared/components/Text/CustomText";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useEffect, useState } from "react";
import { ActivityItem } from "../../../model/core.model";
import store from "../../../app/store";
import { addActivity, fetchActivityList } from "../store/slices/activity-list-slice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { listenerMiddleware } from "../../../app/listener-middleware";
import { UnsubscribeListener } from "@reduxjs/toolkit";

export default function CreateActivity() {
    const formDataInitial: ActivityItem = {
        id: '',
        description: '',
        jiraLink: '',
        occurrenceDate: '',
        spentHours: '',
        title: '',
    }

    const [ addPending, setAddPending ] = useState(false);
    const [ formData, setFormData ] = useState<ActivityItem>(formDataInitial);

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const updateForm = (text: string, sourceId: string) => {
        setFormData(prevState => ({
            ...prevState,
            [sourceId]: text
        }));
    }

    const submitForm = () => {
        setAddPending(true);
        store.dispatch(addActivity(formData));
    }

    const submitFormSuccess = async (listenerApi: any) => {
        setAddPending(false);
        alert("The activity was added");

        setTimeout(() => {
            navigation.navigate('ActivityListPage');
        }, 1000);
    }

    const submitFormError = (errorMessage: string | undefined) => {
        setAddPending(false);
        alert(`Something went wrong: ${errorMessage}`);
    }

    useFocusEffect(
        React.useCallback(() => {
            const addActivitySucessSub: UnsubscribeListener = listenerMiddleware.startListening(
                {
                    actionCreator: addActivity.fulfilled,
                    effect: async (action, listenerApi) => {
                        submitFormSuccess(listenerApi);
                    }
                },
            );
        
            const addActivityErrorSub: UnsubscribeListener = listenerMiddleware.startListening(
                {
                    actionCreator: addActivity.rejected,
                    effect: async (action, listenerApi) => {
                        submitFormError(action.error.message);
                    }
                }
            );
    
            return () => {
                addActivitySucessSub();
                addActivityErrorSub();
            }
        }, [])
    );

    return (
        <ScrollView style={createActivityPageStyles.createActivity}>
            <CustomText 
                bold={ true } 
                message="Create Activity" 
                additionalStyles={[customTextStyles.bold, createActivityPageStyles.createActivityTitle]}
            />

            <KeyboardAwareScrollView>
                <SafeAreaView style={createActivityPageStyles.createActvityForm}>
                    <TextInput 
                        placeholder="Title" id="title"
                        style={[inputStyles.inputMain, inputStyles.inputMd]} 
                        onChangeText = { text => updateForm(text, 'title') }
                    />

                    <TextInput 
                        placeholder="Occurence Date" id="occurenceDate"
                        style={[inputStyles.inputMain, inputStyles.inputMd]} 
                        onChangeText={ text => updateForm(text, 'occurrenceDate') }
                    />

                    <TextInput 
                        placeholder="Jira Link" id="jiraLink"
                        style={[inputStyles.inputMain, inputStyles.inputMd]} 
                        onChangeText={ text => updateForm(text, 'jiraLink') }
                    />

                    <TextInput 
                        placeholder="description" id="description"
                        style={[inputStyles.inputMain, inputStyles.inputMd]} 
                        onChangeText={ text => updateForm(text, 'description') }
                    />

                    <TextInput 
                        placeholder="Spent Hours" id="spentHours"
                        style={[inputStyles.inputMain, inputStyles.inputMd]} 
                        keyboardType="number-pad" 
                        onChangeText={ text => updateForm(text, 'spentHours') }
                    />

                    { !addPending && 
                        <CustomButton 
                            bolded={true} 
                            innerText="Create" 
                            size={[
                                    customButtonStyles.buttonMain, 
                                    customButtonStyles.buttonMd,
                                    createActivityPageStyles.createActivityFormSubmitButton
                                ]}
                            click={ () => submitForm() }
                        />
                    }

                    { addPending && 
                        <ActivityIndicator size={"large"} color={ "#06CEFF" }/>
                    }
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}