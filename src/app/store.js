import { configureStore } from '@reduxjs/toolkit'
import countryReducer from './features/country/fetchCountrySlice.js'
import savedCountriesReducer from './features/country/saveCountrySlice.js'
import shownReducer from './features/country/showSidebarSlice.js'

export const store = configureStore({
    reducer: {
        country: countryReducer,
        savedCountries: savedCountriesReducer,
        showSidebar: shownReducer,
    },
})