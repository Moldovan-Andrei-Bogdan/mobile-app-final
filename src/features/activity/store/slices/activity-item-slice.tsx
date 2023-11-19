import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActivityItem } from "../../../../model/core.model";
import activityItemService from "../../core/services/activity-item.service";
import { ActivityItemState } from "../../../../model/core.states.model";

const activityItemState: ActivityItemState = {
    data: {
        id: '',
        title: '',
        description: '',
        jiraLink: '',
        occurenceDate: '',
        spentHours: ''
    },
    loading: false,
    error: null
}


/// ASYNC THUNKS ///
const getActivityById = createAsyncThunk('/activity/get/id', (id: string) => {
    return activityItemService.getActivityById(id).then((response) => {
        return response;
    }).catch(err => {
        return err;
    });
});

const updateActivity = createAsyncThunk('/activity/update/id', (activity: ActivityItem) => {
    return activityItemService.updateActivityItem(activity).then((response) => {
        return response;
    }).catch(err => {
        return err;
    })
});

export const ActivityItemSlice = createSlice({
    name: 'activityItemSlice',
    initialState: activityItemState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getActivityById.pending, state => {
            state.loading = true;
        });

        builder.addCase(getActivityById.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(getActivityById.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                statusCode: action.error.code ? action.error.code : '',
                message: action.error.message ? action.error.message : ''
            }
        });

        builder.addCase(updateActivity.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(updateActivity.rejected, (state, action) => {
            state.loading = false;
            state.error = {
                statusCode: action.error.code ? action.error.code : '',
                message: action.error.message ? action.error.message : ''
            }
        });
    }
});

export default ActivityItemSlice.reducer;

export { getActivityById, updateActivity };