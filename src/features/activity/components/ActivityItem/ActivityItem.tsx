import { Alert, SafeAreaView, TouchableOpacity, View } from "react-native";

import { ActivityItem } from "../../../../model/core.model";

import customTextStyles from "../../../../style/components/CustomText.styles";
import activityItemStyles from "../../../../style/components/ActivityItem.styles";

import CustomText from "../../../../shared/components/Text/CustomText";

import store from "../../../../app/store";
import { deleteActivity, fetchActivityList } from "../../store/slices/activity-list-slice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import { listenerMiddleware } from "../../../../app/listener-middleware";
import { UnsubscribeListener } from "@reduxjs/toolkit";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = {
    data: ActivityItem
}

export default function ActivityItemComponent(props: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    
    const triggerItemDelete = () => {
        const payloadObject = {
            activityId: props.data.id.toString()
        }
        store.dispatch(deleteActivity(payloadObject));
    }

    const removeButtonClick = () => {
        return Alert.alert(
            'Are you sure?',
            "This action will completely remove the item",
            [
                {
                    text: "Yes",
                    onPress: () => { triggerItemDelete(); }
                },

                {
                    text: "No"
                }
            ]
        );
    }

    const updateButtonClick = () => {
        navigation.navigate('UpdateActivityPage', {id: props.data.id});
    }

    useFocusEffect(
        React.useCallback(() => {
            const deleteSub: UnsubscribeListener = listenerMiddleware.startListening(
                {
                    actionCreator: deleteActivity.fulfilled,
                    effect: async (action, listenerApi) => {
                        await listenerApi.dispatch(fetchActivityList());
                    }
                },
            );

            return () => {
                deleteSub();
            }
        }, [])
    );

    return (
        <SafeAreaView style = {activityItemStyles.activityItemWrapper}>
            <View style = {activityItemStyles.activityItem}>
                <CustomText
                    message = { props.data.id } 
                    bold = { true } 
                    additionalStyles = { [customTextStyles.lightGray] }
                />

                <CustomText
                    message = { props.data.title } 
                    bold = { true } 
                    additionalStyles = { [customTextStyles.black, customTextStyles.textLg] }
                />

                <View style = {activityItemStyles.activityItemExtraData}>
                    <CustomText 
                        message = { `Date: ${props.data.occurrenceDate}` } 
                        bold = { false } 
                        additionalStyles = { [customTextStyles.black] }
                    />

                    <CustomText 
                        message = { `Hours: ${props.data.spentHours}` } 
                        bold = { false } 
                        additionalStyles = { [customTextStyles.black] }
                    />
                </View>

                <CustomText 
                    message = { props.data.jiraLink } 
                    bold = { true } 
                    additionalStyles = { [customTextStyles.link] }
                />

                <View style = {activityItemStyles.activityItemActions}>
                    <TouchableOpacity onPress={ updateButtonClick }>
                        <CustomText 
                            message="Update" 
                            bold = { true } 
                            additionalStyles = { [customTextStyles.textMd, customTextStyles.blue] } 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ removeButtonClick }>
                        <CustomText 
                            message="Delete" 
                            bold = { true } 
                            additionalStyles = { [customTextStyles.textMd, customTextStyles.red] }
                        />
                    </TouchableOpacity>
                </View> 
            </View>
        </SafeAreaView>
    );
}