import { ActivityIndicator, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import CustomText from "../../../shared/components/Text/CustomText";
import customTextStyles from "../../../style/components/CustomText.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import inputStyles from "../../../style/components/Input.styles";
import CustomButton from "../../../shared/components/Button/CustomButton";
import customButtonStyles from "../../../style/components/CustomButton.styles";
import React, { useState } from "react";
import updateActivityPageStyles from "../../../style/pages/update-activity-page.styles";
import { ActivityItem } from "../../../model/core.model";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import store from "../../../app/store";
import { getActivityById, resetActivity, updateActivity } from "../store/slices/activity-item-slice";
import { ActivityItemState } from "../../../model/core.states.model";
import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UnsubscribeListener } from "@reduxjs/toolkit";
import { listenerMiddleware } from "../../../app/listener-middleware";


export default function UpdateActivityPage() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const activityItemState: ActivityItemState = useSelector((state: any) => state.activityItem);

    const activityData = activityItemState.data;

    const formDataInitial: ActivityItem = {
        id: '',
        description: '',
        jiraLink: '',
        occurrenceDate: '',
        spentHours: '',
        title: '',
    }

    const route = useRoute();

    const [updatePending, setUpdatePending] = useState(false);
    const [ formData, setFormData ] = useState<ActivityItem>(formDataInitial);

    const populateFormInitialData = (activityItem: ActivityItem) => {
        setFormData(activityItem);
    }

    const getActivityData = () => {
        const params: any = route.params;
        const id: string = params.id;

        store.dispatch(getActivityById(id));
    }

    const updateForm = (text: string, sourceId: string) => {
        setFormData(prevState => ({
            ...prevState,
            [sourceId]: text
        }));
    }

    const submitForm = () => {
        setUpdatePending(true);

        const params: any = route.params;
        const id: string = params.id;

        const payload: ActivityItem = {
            id: id,
            description: formData.description,
            jiraLink: formData.jiraLink,
            occurrenceDate: formData.occurrenceDate,
            spentHours: formData.spentHours,
            title: formData.title
        }

        console.log(formData.description);

        store.dispatch(updateActivity(payload));
    }

    const submitFormSuccess = () => {
        setUpdatePending(false);
        alert("The activity was updated");

        setTimeout(() => {
            navigation.navigate('ActivityListPage');
        }, 1000);
    }

    const submitFormError = (errorObject: any) => {
        setUpdatePending(false);
        alert(`Something went wrong: ${errorObject.message}`);
    }

    const handleGetActivityByIdError = (errorObject: any) => {
        alert(`Something went wrong: ${errorObject.message}`);
    }

    useFocusEffect(
        React.useCallback(() => {
            const storeUnsubscribe = store.subscribe(() => {
                populateFormInitialData(store.getState().activityItem.data);
            })

            getActivityData();

            const updateActivitySucessSub: UnsubscribeListener = listenerMiddleware.startListening(
                {
                    actionCreator: updateActivity.fulfilled,
                    effect: async (action, listenerApi) => {
                        submitFormSuccess();
                    }
                },
            );
        
            const updateActivityErrorSub: UnsubscribeListener = listenerMiddleware.startListening(
                {
                    actionCreator: updateActivity.rejected,
                    effect: async (action, listenerApi) => {
                        const errorObject: any = action.payload;
                        submitFormError(errorObject);
                    }
                }
            );

            const getActivityByIdErrorSub: UnsubscribeListener = listenerMiddleware.startListening({
                actionCreator: getActivityById.rejected,
                effect: async (action, listenerApi) => {
                    const errorObject: any = action.payload;
                    handleGetActivityByIdError(errorObject);
                }
            });

            return () => {
                updateActivitySucessSub();
                updateActivityErrorSub();
                store.dispatch(resetActivity());
                storeUnsubscribe();
                getActivityByIdErrorSub();
            }
        }, [route.params])
    );
    
    return (
        <ScrollView style={updateActivityPageStyles.updateActivity}>
            <CustomText 
                bold={ true } 
                message="Update Activity" 
                additionalStyles={[customTextStyles.bold, updateActivityPageStyles.updateActivityTitle]}
            />

            <KeyboardAwareScrollView>
                {
                    !activityItemState.loading &&
                    activityItemState.data !== null &&
                    activityItemState.data !== undefined &&
                    <SafeAreaView style={updateActivityPageStyles.updateActvityForm}>
                        <TextInput 
                            placeholder="Title" id="title" 
                            defaultValue={ activityData.title }
                            style={[inputStyles.inputMain, inputStyles.inputMd]} 
                            onChangeText = { text => updateForm(text, 'title') }
                        />

                        <TextInput 
                            placeholder="Occurrence Date" id="occurrenceDate" 
                            defaultValue={ activityData.occurrenceDate }
                            style={[inputStyles.inputMain, inputStyles.inputMd]} 
                            onChangeText={ text => updateForm(text, 'occurrenceDate') }
                        />

                        <TextInput 
                            placeholder="Jira Link" id="jiraLink" 
                            defaultValue={ activityData.jiraLink }
                            style={[inputStyles.inputMain, inputStyles.inputMd]} 
                            onChangeText={ text => updateForm(text, 'jiraLink') }
                        />

                        <TextInput 
                            placeholder="description" id="description" 
                            defaultValue={ activityData.description }
                            style={[inputStyles.inputMain, inputStyles.inputMd]} 
                            onChangeText={ text => updateForm(text, 'description') }
                        />

                        <TextInput 
                            placeholder="Spent Hours" id="spentHours" 
                            defaultValue={ activityData.spentHours }
                            style={[inputStyles.inputMain, inputStyles.inputMd]} 
                            keyboardType="number-pad" 
                            onChangeText={ text => updateForm(text, 'spentHours') }
                        />

                        { !updatePending && 
                            <CustomButton 
                                bolded={true} 
                                innerText="Update" 
                                size={[
                                        customButtonStyles.buttonMain, 
                                        customButtonStyles.buttonMd,
                                        updateActivityPageStyles.updateActivityFormSubmitButton
                                    ]} 
                                click={ submitForm }
                                
                            />
                        }

                        { updatePending && 
                            <ActivityIndicator size={"large"} color={ "#06CEFF" }/>
                        }
                    </SafeAreaView>
                }

                {
                    activityItemState.loading &&
                    <View>
                        <ActivityIndicator size={"large"} color={ "#06CEFF" }/>
                    </View>
                }
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}