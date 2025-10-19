'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion } from "framer-motion";
import LocationBtn from './LocationBtn'
import { useMediaQuery } from '@mui/system';

function Card({ city }) {
    const dispatch = useDispatch()
    const [currentWeather, setCurrentWeather] = useState(null)
    const [state, setState] = useState('sunny') // sunny | moon | rainy | stormy | foggy | snowy

    // 🎨 Themes
    const sunnyClassName = 'bg-gradient-to-b from-sky-400 bg-sky-600'
    const noonClassName = 'bg-gradient-to-b from-[#3090C7] to-sky-300'
    const sunsetClassName = 'bg-gradient-to-b from-sky-500 to-red-400'
    const moonClassName = 'bg-gradient-to-t from-sky-700/90 to-blue-900'
    const rainyClassName = 'bg-gradient-to-b from-sky-600 to-blue-900'
    const stormyClassName = 'bg-gradient-to-b from-gray-700 to-black'
    const foggyClassName = 'bg-gray-400/70'
    const snowyClassName = 'bg-white/20'

    const timezone = city?.city.timezone;
    const utcNow = Date.now() + new Date().getTimezoneOffset() * 60 * 1000;

    const localTime = new Date(utcNow + timezone * 1000);
    const localHour = localTime.getHours();
    const finalDate = localTime.toLocaleString('en-GB', {
        hour: '2-digit',
    })

    console.log(typeof (Number(finalDate)));


    // ☀️ Sunny || done
    const sunnyJSX = (
        <>
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-full p-70 bg-orange-200 absolute -top-50 md:right-3 -right-10 opacity-10 z-10 blur-md"
            />
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-full p-55 bg-orange-200 absolute -top-50 md:right-20 opacity-10 z-10 blur-sm"
            />
            <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-35 md:right-40 right-25 w-70 aspect-square rounded-full b bg-gradient-to-t from-yellow-300 to-orange-100 blur-[2px] z-10"
            />
        </>
    )
    const noonJSX = (
        <>
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-full p-55 bg-orange-200 absolute -top-50 -right-15 opacity-10 z-10 blur-xl"
            />
            <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-30 right-0 w-70 aspect-square rounded-full b bg-yellow-300 blur-[2px] z-10"
            />
        </>
    )

    // 🌙 Moon (Night)
    const moonJSX = (
        <div className='-translate-y-10 md:-translate-y-30 translate-x-30 md:translate-x-0'>
            <motion.span
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 0.3 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="rounded-full p-40 bg-sky-600 absolute -top-43 right-5 opacity-30 z-10 blur-lg"
            />
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.15, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-full p-35 bg-sky-200 absolute -top-38 right-10 opacity-10 z-10 blur-xl"
            />
            <motion.span
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
                className="rounded-full p-25 bg-yellow-100 absolute -top-30 right-20 opacity-100 z-10 shadow-[0_0_15px_rgba(255,255,255,0.4)] blur-[1px]"
            />
        </div>
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

    // 🌫️ Foggy
    const foggyJSX = (
        <>
            <motion.div
                animate={{ x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-full h-full bg-white/10 z-10"
            />
        </>
    )

    // ❄️ Snowy
    const snowyJSX = (
        <>
            {[...Array(6)].map((_, i) => (
                <motion.span
                    key={i}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: [0, 80, 0], opacity: [0, 0.7, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
                    className={`rounded-full p-5 bg-white absolute top-0 left-${i * 15} opacity-50 z-10`}
                />
            ))}
        </>
    )

    const sunriseJSX = (
        <>
            <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-sky-300 to-blue-950 z-10"
            />
            <motion.span
                initial={{ y: -200, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="rounded-full p-40 bg-orange-300 absolute -bottom-30 -right-15 opacity-30 z-10 blur-xl"
            />
            <motion.span
                animate={{ y: [20, 10, 20] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-10 right-0 w-50 aspect-square rounded-full bg-gradient-to-t from-[#ffd757] to-orange-100 blur-[1.5px] z-10"
            />
        </>
    )

    // done
    const sunsetJSX = (
        <>
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="rounded-full p-50 bg-[#FF8C00] absolute -bottom-35 -left-25 opacity-10 z-10 blur-xl"
            />
            <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -bottom-9 -left-2 w-50 aspect-square rounded-full bg-gradient-to-b from-[#FFB800] to-red-400 blur-[2px] z-10"
            />
        </>
    )

    // 🧠 detect current weather
    useEffect(() => {
        if (!city?.list?.length || city?.list?.length === 0) return
        const now = Date.now() / 1000
        let closest = city.list[0]
        for (let item of city.list) {
            if (Math.abs(item.dt - now) < Math.abs(closest.dt - now)) {
                closest = item
            }
        }
        setCurrentWeather(closest)
    }, [city])

    console.log(state)

    const desc = currentWeather?.weather?.[0]?.description?.toLowerCase()
    const iconCode = currentWeather?.weather?.[0]?.icon
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}.png` : null

    const weatherBackgrounds = {
        sunny: sunnyClassName,
        noon: noonClassName,
        sunset: sunsetClassName,
        moon: moonClassName,
        rainy: rainyClassName,
        stormy: stormyClassName,
        foggy: foggyClassName,
        snowy: snowyClassName,
    }

    // 🧩 Detect state from desc
    // useEffect(() => {
    //     if (!desc) return
    //     if (desc.includes('thunder')) setState('stormy')
    //     else if (desc.includes('rain')) setState('rainy')
    //     else if (desc.includes('snow')) setState('snowy')
    //     else if (desc.includes('fog') || desc.includes('mist')) setState('foggy')
    //     else if (desc.includes('clear')) setState('sunny')
    //     else setState('moon')
    // }, [desc])

    useEffect(() => {
        if (!localHour) return
        if (localHour >= 5 && localHour < 9) setState('sunrise')
        if (localHour >= 9 && localHour < 11) setState('noon')
        if (localHour >= 11 && localHour < 17) setState('sunny')
        if (localHour >= 17 && localHour < 20) setState('sunset')
        else if (localHour >= 20 && localHour < 5) setState('moon')
    }, [localHour])

    const mediumWindow = useMediaQuery('(max-width:786px)')

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`md:rounded-4xl h-full xl:mt-3 p-5 py-15 text-white md:relative w-full fixed max-h-[480px] md:shadow-xl ${weatherBackgrounds[state]} overflow-hidden`}
        >
            <LocationBtn city={city} style={{ zIndex: 20 }} />

            <div className="flex justify-between items-center z-20 md:mt-0 mt-5 md:py-0 py-5">
                <span className='z-20'>
                    <h1 className="md:text-4xl text-2xl z-20">{city?.city?.name || "No city found"}</h1>
                    <h1 className='z-20'>{finalDate}</h1>
                </span>
                <span className="flex justify-between items-end p-5 px-7 absolute w-full md:bottom-0 bottom-5 left-0 z-20">
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
            </div>

            {/* 🎬 Backgrounds */}
            {/* sunnyJSX */}
            {state === 'sunny' && sunnyJSX}
            {state === 'noon' && noonJSX}
            {state === 'sunset' && sunsetJSX}
            {state === 'sunrise' && sunriseJSX}
            {state === 'moon' && moonJSX}
            {state === 'rainy' && rainyJSX}
            {state === 'stormy' && stormyJSX}
            {state === 'foggy' && foggyJSX}
            {state === 'snowy' && snowyJSX}

        </motion.div>
    )
}

export default Card
