import { configureStore } from "@reduxjs/toolkit";

import ActivityItemListReducer from "../features/activity/store/slices/activity-list-slice";
import ActivityItemReducer from "../features/activity/store/slices/activity-item-slice";
import OnlineStatusReducer from "../features/online-status/store/online-status-state";
import { listenerMiddleware } from "./listener-middleware";
import activityItemSlice from "../features/activity/store/slices/activity-item-slice";

export default configureStore({
    reducer: {
        activityItemList: ActivityItemListReducer,
        activityItem: ActivityItemReducer,
        onlineStatus: OnlineStatusReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});