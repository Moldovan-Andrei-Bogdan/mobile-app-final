import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActivityListState } from "../../../../model/core.states.model";
import activityItemService from "../../core/services/activity-item.service";

import { ActivityItem } from "../../../../model/core.model";

const activityListInitialState: ActivityListState = {
    data: [],
    loading: false,
    error: null
}

/// ASYNC THUNKS ///
const fetchActivityList = createAsyncThunk('/activity/all', () => {
    return activityItemService.getActivitiesList().then((response) => {
        return response;
    }).catch(err => {
        return err;
    });
});

const deleteActivity = createAsyncThunk('/activity/delete/id', ({activityId}: {activityId: string}) => {
    return activityItemService.deleteActivityItem(activityId).then(() => {
        return activityId;
    }).catch(err => {
        return err;
    })
});

const addActivity = createAsyncThunk('/activity/add', (activity: ActivityItem) => {
    return activityItemService.addActivityItem(activity).then((response) => {
        return response;
    }).catch(err => {
        return err;
    })
});

const getActivityById = createAsyncThunk('/activity/get/id', (id: string) => {
    return activityItemService.getActivityById(id).then((response) => {
        return response;
    }).catch(err => {
        return err;
    })
});

export const ActivityListSlice = createSlice({
    name: "activityListSlice",
    initialState: activityListInitialState,
    reducers: {},
    extraReducers: (builder) => {
        /// activity list ///
        builder.addCase(fetchActivityList.pending, state => {
            state.loading = true;
        });
        
        builder.addCase(fetchActivityList.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchActivityList.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                statusCode: action.error.code ? action.error.code : '',
                message: action.error.message ? action.error.message : ''
            }
        });

        /// delete activity ///
        builder.addCase(deleteActivity.rejected, (state, action) => {
            state.error = {
                statusCode: action.error.code ? action.error.code : '',
                message: action.error.message ? action.error.message : ''
            }
            alert(`Something went wrong: ${action.error.message}`);
        });

        builder.addCase(deleteActivity.fulfilled, (state, action) => {
            alert("The activity was deleted");
        });


        /// add activity ///
        builder.addCase(addActivity.rejected, (state, action) => {
            state.error = {
                statusCode: action.error.code ? action.error.code : '',
                message: action.error.message ? action.error.message : ''
            }
        });
    }
});

export default ActivityListSlice.reducer;

export { fetchActivityList, deleteActivity, addActivity, getActivityById };