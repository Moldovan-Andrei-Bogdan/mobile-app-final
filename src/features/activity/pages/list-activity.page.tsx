import { ActivityIndicator, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import CustomButton from "../../../shared/components/Button/CustomButton";
import customButtonStyles from "../../../style/components/CustomButton.styles";
import activityListPageStyles from "../../../style/pages/list-activity-page.styles";

import { ActivityListState } from "../../../model/core.states.model";

import { fetchActivityList } from "../store/slices/activity-list-slice";

import ActivityItemComponent from "../components/ActivityItem/ActivityItem";

import store from "../../../app/store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { UnsubscribeListener } from "@reduxjs/toolkit";
import { listenerMiddleware } from "../../../app/listener-middleware";
import { HttpErrorModel } from "../../../model/core.occ.model";

export default function ListActivityPage() {
    let activityListState: ActivityListState = useSelector((state: any) => state.activityItemList);
    
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useFocusEffect(
        React.useCallback(() => {
            const data = store.getState().activityItemList.data;

            if (data === null || data.length === 0) {
                store.dispatch(fetchActivityList());
            }

            const fetchActivityListErrorSub: UnsubscribeListener = listenerMiddleware.startListening(
                {
                    actionCreator: fetchActivityList.rejected,
                    effect: async (action, listenerApi) => {
                        const httpError: any = action.payload;
                        handleFetchError(httpError);
                    }
                }
            );

            return () => {
                fetchActivityListErrorSub();
            }
        }, [])
    );

    const handleFetchError = (err: HttpErrorModel) => {
        alert(err.message);
    }

    const addButtonClick = () => {
        navigation.navigate('ActivityCreatePage');
    }

    return (
        <View style={ activityListPageStyles.activityListPage }>
            <View style={ activityListPageStyles.header }>
                <CustomButton 
                    innerText="Add Activity" 
                    bolded={ true } 
                    size={ customButtonStyles.buttonMd } 
                    click={ addButtonClick } 
                    additionalStyles={ [activityListPageStyles.createActivityButton] }
                />
            </View>

            {
                !activityListState.loading &&
                activityListState.data !== null &&
                activityListState.data !== undefined &&
                activityListState.data.length !== 0 &&
                <ScrollView>
                    <View style={ activityListPageStyles.activityList } >
                        { activityListState.data.map((item) => <ActivityItemComponent key={item.id} data={item} />) }
                    </View>
                </ScrollView>
            }

            {
                activityListState.loading &&
                <View style={ activityListPageStyles.loaderContainer }>
                    <ActivityIndicator size={"large"} color={ "#06CEFF" }/>
                </View>
            }
        </View>
    );
}