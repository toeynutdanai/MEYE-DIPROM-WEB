import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        isLoading: false,
        isLoadingStatus: false,
        states: {},
        userByLevel: [],
        userByStatusFlag: [],
    },
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setIsLoadingStatus(state, action) {
            state.isLoadingStatus = action.payload;
        },
        setState(state, action) {
            state.states = action.payload;
        },
        setUserByLevel(state, action) {
            state.userByLevel = action.payload;
        },
        setUserByStatusFlag(state, action) {
            state.userByStatusFlag = action.payload;
        },
    },
});

export const { setIsLoading, setIsLoadingStatus, setState, setUserByLevel, setUserByStatusFlag } =
    homeSlice.actions;
export default homeSlice.reducer;