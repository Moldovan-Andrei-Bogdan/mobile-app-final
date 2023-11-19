import { ActivityIndicator, ScrollView, View } from "react-native";
import { useEffect } from "react";

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

export default function ListActivityPage() {
    
    const activityListState: ActivityListState = useSelector((state: any) => state.activityItemList);
    
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useFocusEffect(
        React.useCallback(() => {
            store.dispatch(fetchActivityList());
        }, [])
    );

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