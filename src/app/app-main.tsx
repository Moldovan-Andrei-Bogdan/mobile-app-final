import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import CreateActivity from "../features/activity/pages/create-activity.pages";
import ListActivityPage from "../features/activity/pages/list-activity.page";
import UpdateActivityPage from "../features/activity/pages/update-activity.page";
import webSocketInstance from "./websocket";

const Stack = createNativeStackNavigator();

export default function AppEntry() {
    webSocketInstance.connect();
    webSocketInstance.addNetworkChangeListener();
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ActivityListPage">
                <Stack.Screen name="ActivityListPage" component={ ListActivityPage } />
                <Stack.Screen name="ActivityCreatePage" component={ CreateActivity } />
                <Stack.Screen name="UpdateActivityPage" component={ UpdateActivityPage } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}