'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from "framer-motion";
import LocationBtn from './LocationBtn'
import { useMediaQuery } from '@mui/system';

function Card({ city }) {
    const dispatch = useDispatch()
    const [currentWeather, setCurrentWeather] = useState(null)
    const [state, setState] = useState('sunny') // sunny | moon | rainy | stormy

    // 🎨 Themes
    const sunnyClassName = 'bg-red-400'
    const moonClassName = 'bg-sky-700/90'
    const rainyClassName = 'bg-gradient-to-b from-sky-600 to-blue-900'
    const stormyClassName = 'bg-gradient-to-b from-gray-700 to-black'
    // ☀️ Sunny
    const sunnyJSX = (
        <>
            <motion.span
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="rounded-full p-70 bg-orange-400 absolute -top-55 -right-45 opacity-30 z-10"
            />
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-full p-55 bg-orange-200 absolute -top-50 -right-35 opacity-10 z-10"
            />
            <motion.span
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                className="rounded-full p-30 bg-yellow-300 absolute -top-30 -right-12 opacity-100 z-10"
            />
        </>
    )

    // 🌙 Moon
    const moonJSX = (
        <>
            <motion.span
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="rounded-full p-40 bg-sky-600 absolute -top-43 right-5 opacity-30 z-10"
            />
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-full p-35 bg-sky-200 absolute -top-38 right-10 opacity-10 z-10"
            />
            <motion.span
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                className="rounded-full p-25 bg-yellow-100 absolute -top-30 right-20 opacity-100 z-10"
            />
        </>
    )

    // 🌧️ Rainy
    const rainyJSX = (
        <>
            {[...Array(4)].map((_, i) => (
                <motion.span
                    key={i}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                    className={`rounded-full p-20 bg-blue-400 absolute top-${i * 10} right-${i * 15} opacity-40 z-10`}
                />
            ))}
            <motion.span
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="rounded-full p-40 bg-sky-300 absolute -top-40 right-0 opacity-30 z-10"
            />
        </>
    )

    // ⚡ Stormy
    const stormyJSX = (
        <>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="rounded-full p-50 bg-gray-500 absolute -top-40 -right-30 opacity-30 z-10"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-10 right-20 w-5 h-24 bg-yellow-400 skew-x-[20deg] shadow-yellow-300 shadow-lg z-10"
            />
            <motion.span
                animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="rounded-full p-30 bg-gray-600 absolute -top-20 right-10 opacity-40 z-10"
            />
        </>
    )

    // 🧠 detect current weather
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

    const desc = currentWeather?.weather?.[0]?.description?.toLowerCase()
    const iconCode = currentWeather?.weather?.[0]?.icon
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}.png` : null

    const weatherBackgrounds = {
        sunny: sunnyClassName,
        moon: moonClassName,
        rainy: rainyClassName,
        stormy: stormyClassName,
    }

    // 🧩 Detect state from desc
    useEffect(() => {
        if (!desc) return
        if (desc.includes('thunder')) setState('stormy')
        else if (desc.includes('rain')) setState('rainy')
        else if (desc.includes('clear')) setState('sunny')
        else setState('moon')
    }, [desc])

    const mediumWindow = useMediaQuery('(max-width:786px)')

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`md:rounded-4xl h-full xl:mt-3 p-5 py-15 text-white md:relative fixed top-0 right-0 w-full overflow-hidden md:shadow-xl ${weatherBackgrounds[state]}`}
        >
            <LocationBtn city={city} style={{ zIndex: 20 }} />

            <div className="flex justify-between items-center z-20 md:mt-0 mt-5">
                <h1 className="md:text-4xl text-2xl z-20">{city?.city?.name || "No city found"}</h1>

                <span className="flex justify-between items-end p-5 px-7 absolute w-full md:bottom-0 bottom-50 left-0 z-20">
                    <motion.h1
                        initial={{ y: -80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="md:text-9xl text-8xl font-bold"
                    >
                        {Math.round(currentWeather?.main?.temp || 0)}°
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="md:text-lg text-sm mb-2 whitespace-nowrap"
                    >
                        Chance of rain: {Math.round((currentWeather?.pop || 0) * 100)}%
                    </motion.p>
                </span>

                {iconUrl && (
                    <motion.img
                        src={iconUrl}
                        alt="weather icon"
                        className="md:w-28 w-20 -z-[30]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    />
                )}
            </div>

            {/* 🎬 Backgrounds */}
            {state === 'sunny' && sunnyJSX}
            {state === 'moon' && moonJSX}
            {state === 'rainy' && rainyJSX}
            {state === 'stormy' && stormyJSX}
        </motion.div>
    )
}

export default Card
