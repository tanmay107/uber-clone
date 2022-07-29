import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    distance : null,
    travelTimeInformation: null
}

//Reducer
export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setDistance : (state, action) => {
            state.distance = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },
    },
});

export const { setOrigin, setDestination, setDistance, setTravelTimeInformation } = navSlice.actions;

//export const { setOrigin, setDestination, setDistance, setTravelTimeInformation } = navSlice.actions

//Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectDistance = (state) => state.nav.distance;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;