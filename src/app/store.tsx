import { configureStore } from "@reduxjs/toolkit";

import ActivityItemListReducer from "../features/activity/store/slices/activity-list-slice";
import ActivityItemReducer from "../features/activity/store/slices/activity-item-slice";
import { listenerMiddleware } from "./listener-middleware";
import activityItemSlice from "../features/activity/store/slices/activity-item-slice";

export default configureStore({
    reducer: {
        activityItemList: ActivityItemListReducer,
        activityItem: ActivityItemReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});