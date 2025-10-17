'use client'
import React, { use } from 'react'
import Card from './Card.jsx'
import Forecast from './Forecast.jsx'
import AirCond from './AirCond.jsx'
import WeatherChart from './Graph.jsx'
import UserLocationMap from './currentLocationOmMap.jsx'
import { addCountry } from '@/app/features/country/saveCountrySlice.js'
import { useDispatch } from 'react-redux'

function MainCards(props) {

    const dispatch = useDispatch()

    return (
        <div>
            <div className='grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-3 xl:pb-3 xl:mt-0 mt-3 lg:h-90 md:h-70'>
                <Card city={props.city} />
                <UserLocationMap city={props.city} />
            </div>
            {props.city &&
                (
                    <div div className='w-full flex justify-end'>
                        <button
                            onClick={() => dispatch(addCountry(props.city))}
                            className='mt-2 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 active:scale-99 transition w-20'
                        >
                            Save
                        </button>
                    </div>
                )
            }
            <Forecast city={props.city} />
            <AirCond city={props.city} />
            <WeatherChart city={props.city} />
        </div >
    )
}

export default MainCards
