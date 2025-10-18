'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCountry } from '@/app/features/country/saveCountrySlice.js'

import { useMediaQuery } from '@mui/material'

import Card from './Card.jsx'
import Forecast from './Forecast.jsx'
import AirCond from './AirCond.jsx'
import WeatherChart from './Graph.jsx'
import UserLocationMap from './currentLocationOmMap.jsx'
import RightBar from '../RightBar.jsx'

function MainCards({ city, primaryBg }) {
    const colors = useSelector((state) => state.changeTheme.colors)

    const dispatch = useDispatch()
    const mediumWindow = useMediaQuery('(max-width:768px)');

    return (
        <div className="relative space-y-4 xl:space-y-6">
            {/* ===== Top Section (Main Weather + Map) ===== */}
            <div className="grid md:grid-cols-[1fr_20rem] gap-3 xl:pb-3 xl:mt-0 md:mt-3 lg:h-90 md:h-70 h-120 relative z-20">
                <Card city={city} />
                <UserLocationMap city={city} />
            </div>

            {/* ===== Save Button ===== */}
            {city && (
                <div className="w-full justify-center md:justify-end hidden relative z-30">
                    <button
                        onClick={() => dispatch(addCountry(city))}
                        className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 active:scale-95 transition-all shadow-md"
                    >
                        Save
                    </button>
                </div>
            )}

            <div className={`${colors.background} text-white md:rounded-[25px] rounded-t-[25px] -mt-10 md:shadow-none shadow-lg p-4 md:p-6 space-y-6 relative md:-mt-0 z-40`}>
                <Forecast city={city} />
                {mediumWindow && <RightBar city={city} />}
                <AirCond city={city} />
                <WeatherChart city={city} />
            </div>
        </div>
    )
}

export default MainCards
