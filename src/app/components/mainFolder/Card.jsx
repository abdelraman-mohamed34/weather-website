'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LocationBtn from './LocationBtn'

function Card(props) {
    const dispatch = useDispatch()
    const [currentWeather, setCurrentWeather] = useState(null)
    const city = props.city

    useEffect(() => {
        if (!city?.list?.length) return
        const now = Date.now() / 1000
        let closest = city.list[0]
        for (let item of city.list) {
            if (Math.abs(item.dt - now) < Math.abs(closest.dt - now)) {
                closest = item
            }
        }
        setCurrentWeather(closest)
    }, [city])

    const weatherBackgrounds = {
        "clear sky": "bg-gradient-to-b from-sky-400 to-yellow-300",
        "few clouds": "bg-gradient-to-b from-sky-300 to-gray-400",
        "scattered clouds": "bg-gradient-to-b from-gray-400 to-gray-600",
        "broken clouds": "bg-gradient-to-b from-gray-500 to-gray-700",
        "overcast clouds": "bg-gradient-to-b from-gray-600 to-gray-800",
        "light rain": "bg-gradient-to-b from-blue-400 to-blue-600",
        "moderate rain": "bg-gradient-to-b from-blue-500 to-blue-700",
        "heavy intensity rain": "bg-gradient-to-b from-blue-700 to-gray-900",
        "very heavy rain": "bg-gradient-to-b from-indigo-700 to-gray-900",
        "extreme rain": "bg-gradient-to-b from-indigo-800 to-gray-950",
        "freezing rain": "bg-gradient-to-b from-blue-200 to-gray-400",
        "light intensity shower rain": "bg-gradient-to-b from-sky-400 to-blue-500",
        "shower rain": "bg-gradient-to-b from-blue-500 to-blue-700",
        "light snow": "bg-gradient-to-b from-blue-100 to-gray-300",
        "snow": "bg-gradient-to-b from-blue-200 to-gray-400",
        "heavy snow": "bg-gradient-to-b from-blue-300 to-gray-600",
        "mist": "bg-gradient-to-b from-gray-300 to-gray-500",
        "smoke": "bg-gradient-to-b from-gray-400 to-gray-700",
        "haze": "bg-gradient-to-b from-yellow-200 to-orange-400",
        "fog": "bg-gradient-to-b from-gray-400 to-gray-600",
        "dust": "bg-gradient-to-b from-yellow-400 to-yellow-600",
        "sand": "bg-gradient-to-b from-yellow-500 to-yellow-700",
        "ash": "bg-gradient-to-b from-gray-500 to-gray-800",
        "squall": "bg-gradient-to-b from-sky-500 to-sky-800",
        "tornado": "bg-gradient-to-b from-gray-800 to-black",
    }

    const desc = currentWeather?.weather?.[0]?.description?.toLowerCase()
    const bg = weatherBackgrounds[desc] || "bg-transparent"
    const iconCode = currentWeather?.weather?.[0]?.icon
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}.png` : null

    return (
        <>
            <div className={`md:rounded-4xl rounded-2xl h-full xl:mt-3 sm:p-10 p-10 py-15 text-white ${bg} relative`}>
                <LocationBtn city={city} />
                <div className={`flex justify-between items-center ${!city ? "h-[100px]" : null}`}>
                    <h1 className='md:text-4xl text-2xl'>{city?.city?.name || "No city found"}</h1>
                    <span className='flex justify-between items-end p-5 px-7 absolute w-full bottom-0 left-0'>
                        <h1 className='lg:text-9xl md:text-6xl sm:text-5xl text-6xl font-bold'>
                            {Math.round(currentWeather?.main?.temp || 0)}°
                        </h1>
                        <p className='md:text-lg text-sm mb-2 whitespace-nowrap'>
                            Chance of rain: {Math.round((currentWeather?.pop || 0) * 100)}%
                        </p>
                    </span>

                    {iconUrl && (
                        <img src={iconUrl} alt="weather icon" className='md:w-28 w-20' />
                    )}
                </div>
            </div>
        </>
    )
}

export default Card
