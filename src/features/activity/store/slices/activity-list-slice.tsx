import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ActivityListState } from "../../../../model/core.states.model";
import activityItemService from "../../core/services/activity-item.service";

import { ActivityItem } from "../../../../model/core.model";
import axios from "axios";
import { HttpErrorModel } from "../../../../model/core.occ.model";

const activityListInitialState: ActivityListState = {
    data: [],
    loading: false,
    error: null
}

/// ASYNC THUNKS ///
const fetchActivityList = createAsyncThunk('/activity/all', (_, { rejectWithValue }) => {
    return activityItemService.getActivitiesList().then((response) => {
        return response.data;
    }).catch(err => {
        if (axios.isAxiosError(err)) {
            const error: HttpErrorModel = {
                message: err.message,
                statusCode: err.code
            }

            return rejectWithValue(error);
        } else {
            return rejectWithValue(err);
        }
    });
});

const deleteActivity = createAsyncThunk('/activity/delete/id', ({activityId}: {activityId: string}, {rejectWithValue}) => {
    return activityItemService.deleteActivityItem(activityId).then((response) => {
        return response.data;
    }).catch(err => {
        if (axios.isAxiosError(err)) {
            const error: HttpErrorModel = {
                message: err.message,
                statusCode: err.code
            }
            
            return rejectWithValue(error);
        } else {
            return rejectWithValue(err);
        }
    })
});

const addActivity = createAsyncThunk('/activity/add', (activity: ActivityItem, {rejectWithValue}) => {
    return activityItemService.addActivityItem(activity).then((response) => {
        return response.data;
    }).catch(err => {
        if (axios.isAxiosError(err)) {
            const error: HttpErrorModel = {
                message: err.message,
                statusCode: err.code
            }
            
            return rejectWithValue(error);
        } else {
            return rejectWithValue(err);
        }
    })
});

const getActivityById = createAsyncThunk('/activity/get/id', (id: string, { rejectWithValue }) => {
    return activityItemService.getActivityById(id).then((response) => {
        return response.data;
    }).catch(err => {
        if (axios.isAxiosError(err)) {
            const error: HttpErrorModel = {
                message: err.message,
                statusCode: err.code
            }
            
            return rejectWithValue(error);
        } else {
            return rejectWithValue(err);
        }
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
            const httpError: any = action.payload;
            state.loading = false;
            state.error = httpError
        });

        /// delete activity ///
        builder.addCase(deleteActivity.rejected, (state, action) => {
            const httpError: any = action.payload;
            state.error = httpError;
            alert(`Something went wrong: ${httpError.message}`);
        });

        builder.addCase(deleteActivity.fulfilled, (state, action) => {
            alert("The activity was deleted");
        });


        /// add activity ///
        builder.addCase(addActivity.rejected, (state, action) => {
            const httpError: any = action.payload;
            state.error = httpError;
        });
    }
});

export default ActivityListSlice.reducer;

export { fetchActivityList, deleteActivity, addActivity, getActivityById };