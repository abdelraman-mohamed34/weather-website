// features/savedCountries/savedCountrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const savedFromLocalStorage =
    typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('savedCountries')) || []
        : []

export const fetchCountryByName = createAsyncThunk(
    'savedCountries/fetchCountryByName',
    async (name) => {
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}&units=metric`
        )
        return res.data
    }
)

const initialState = {
    countries: savedFromLocalStorage,
    status: 'idle',
    error: null,
}

export const savedCountrySlice = createSlice({
    name: 'savedCountries',
    initialState,
    reducers: {
        addCountry: (state, action) => {
            const exists = state.countries.some(
                (c) =>
                    c.city.name.toLowerCase() ===
                    action.payload.city.name.toLowerCase()
            )
            if (!exists) {
                state.countries.push(action.payload)
                // حفظ في localStorage
                localStorage.setItem('savedCountries', JSON.stringify(state.countries))
            }
        },
        removeCountry: (state, action) => {
            state.countries = state.countries.filter(
                (c) => c.city.name !== action.payload
            )
            // تحديث localStorage بعد الحذف
            localStorage.setItem('savedCountries', JSON.stringify(state.countries))
        },
        clearAllCountries: (state) => {
            state.countries = []
            localStorage.removeItem('savedCountries')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryByName.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCountryByName.fulfilled, (state, action) => {
                const exists = state.countries.some(
                    (c) =>
                        c.city.name.toLowerCase() ===
                        action.payload.city.name.toLowerCase()
                )
                if (!exists) {
                    state.countries.push(action.payload)
                    // حفظ في localStorage بعد الجلب
                    localStorage.setItem('savedCountries', JSON.stringify(state.countries))
                }
                state.status = 'succeeded'
            })
            .addCase(fetchCountryByName.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const { addCountry, removeCountry, clearAllCountries } =
    savedCountrySlice.actions
export default savedCountrySlice.reducer
