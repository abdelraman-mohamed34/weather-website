import { configureStore } from '@reduxjs/toolkit'
import countryReducer from './features/country/fetchCountrySlice.js'
import savedCountriesReducer from './features/country/saveCountrySlice.js'
export const store = configureStore({
    reducer: {
        country: countryReducer,
        savedCountries: savedCountriesReducer,
    },
})