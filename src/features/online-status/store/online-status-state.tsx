import { createAction, createReducer } from "@reduxjs/toolkit";
import { OnlineStatusState } from "../../../model/core.states.model";

const setOnline = createAction("onlinestatus/true");
const setOffline = createAction("onlinestatus/false");

const initialState: OnlineStatusState = { isOnline: false }

const onlineStatusReducer = createReducer(initialState, (builder) => {
    builder.addCase(setOnline, (state, action) => {
        state.isOnline = true;
    });

    builder.addCase(setOffline, (state, action) => {
        state.isOnline = false;
    });
});

export default onlineStatusReducer;

export {setOnline, setOffline}