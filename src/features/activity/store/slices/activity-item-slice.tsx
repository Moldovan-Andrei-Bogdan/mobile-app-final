import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActivityItem } from "../../../../model/core.model";
import activityItemService from "../../core/services/activity-item.service";
import { ActivityItemState } from "../../../../model/core.states.model";
import { HttpErrorModel } from "../../../../model/core.occ.model";
import axios from "axios";

const activityItemState: ActivityItemState = {
    data: {
        id: '',
        title: '',
        description: '',
        jiraLink: '',
        occurrenceDate: '',
        spentHours: ''
    },
    loading: false,
    error: null
}


/// ASYNC THUNKS ///
const getActivityById = createAsyncThunk('/activity/get/id', (id: string) => {
    return activityItemService.getActivityById(id).then((response) => {
        return response.data;
    }).catch(err => {
        if (axios.isAxiosError(err)) {
            const error: HttpErrorModel = {
                message: err.message,
                statusCode: err.code
            }
            
            return error;
        } else {
            return err;
        }
    });
});

const updateActivity = createAsyncThunk('/activity/update/id', (activity: ActivityItem) => {
    return activityItemService.updateActivityItem(activity).then((response) => {
        return response.data;
    }).catch(err => {
        if (axios.isAxiosError(err)) {
            const error: HttpErrorModel = {
                message: err.message,
                statusCode: err.code
            }
            
            return error;
        } else {
            return err;
        }
    })
});

const resetActivity = createAsyncThunk('/activity/reset/id', () => {
    const resetActivityState: ActivityItem = {
        id: '',
        description: '',
        jiraLink: '',
        occurrenceDate: '',
        spentHours: '',
        title: ''
    }

    return resetActivityState;
})

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
            const httpError: any = action.payload;
            state.loading = false;
            state.error = httpError;
        });

        builder.addCase(updateActivity.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(updateActivity.rejected, (state, action) => {
            const httpError: any = action.payload;
            state.loading = false;
            state.error = httpError;
        });

        builder.addCase(resetActivity.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    }
});

export default ActivityItemSlice.reducer;

export { getActivityById, updateActivity, resetActivity };