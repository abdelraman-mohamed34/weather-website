import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const initialState = {
    country: null,
    status: "idle",
    error: null,
};

// current search
export const fetchApiCountries = createAsyncThunk(
    'users/fetchUsers',
    async ({ name }) => {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}&units=metric`)
        localStorage.setItem('currentCountry', JSON.stringify(res.data))
        return res.data;
    })

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiCountries.pending, (state) => {
                state.status = "loading";
            }).addCase(fetchApiCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.country = action.payload;
                window.location.href = "/";
            })
            .addCase(fetchApiCountries.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
})

export default countrySlice.reducer