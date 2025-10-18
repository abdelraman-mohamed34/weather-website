'use client'
import React, { useEffect, useState } from 'react'
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { WiSunrise, WiSunset, WiNightAltRainMix, WiHumidity } from "react-icons/wi";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useSelector } from 'react-redux';

function AirCond(props) {

    const city = props.city
    const [currentWeather, setCurrentWeather] = useState(null)

    // don't touch this useEffect
    useEffect(() => {
        if (!city?.list?.length) return;

        const now = Date.now() / 1000;
        let closest = city.list[0];

        for (let item of city.list) {
            if (Math.abs(item.dt - now) < Math.abs(closest.dt - now)) {
                closest = item;
            }
        }
        setCurrentWeather(closest);
    }, [city]);

    const [showMore, setShowMore] = useState(false)
    const iconSize = 6
    const chanceOfRain = currentWeather?.pop ? currentWeather?.pop * 100 : 0;
    const sunriseUnix = city?.city?.sunrise;
    const sunsetUnix = city?.city?.sunset;
    const localeSunrise = sunriseUnix ? new Date(sunriseUnix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";
    const localeSunset = sunsetUnix ? new Date(sunsetUnix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";

    const content = [
        { id: 1, name: "Real Feel", value: city?.list?.[0]?.main?.feels_like || 0, unit: '°', icon: <CiTempHigh className={`size-${iconSize}`} /> },
        { id: 2, name: "Wind", value: city?.list?.[0]?.wind?.speed || 0, unit: ' km/h', icon: <FaWind className={`size-${iconSize}`} /> },
        { id: 3, name: "Chance of rain", value: chanceOfRain, unit: '%', icon: <WiNightAltRainMix className={`size-${iconSize}`} /> },
        { id: 4, name: "Humidity", value: city?.list?.[0]?.main?.humidity || 0, unit: '%', icon: <WiHumidity className={`size-${iconSize}`} /> }
    ];

    const secondContent = [
        { id: 5, name: "Sunrise", value: localeSunrise, unit: '', icon: <WiSunrise className={`size-${iconSize}`} /> },
        { id: 6, name: "Sunset", value: localeSunset, unit: '', icon: <WiSunset className={`size-${iconSize}`} /> },
    ];

    const AirItem = ({ item }) => {
        const count = useMotionValue(typeof item.value === "number" ? 0 : null);
        const rounded = useTransform(count, latest => Math.round(latest));
        const [displayValue, setDisplayValue] = useState(typeof item.value === "number" ? 0 : item.value);

        useEffect(() => {
            const unsubscribe = rounded.on("change", latest => setDisplayValue(latest));
            return () => unsubscribe();
        }, [rounded]);

        useEffect(() => {
            if (typeof item.value === "number") {
                const controls = animate(count, item.value, { duration: 0.5 });
                return controls.stop;
            } else {
                setDisplayValue(item.value);
            }
        }, [count, item.value]);

        return (
            <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className=' whitespace-nowrap md:p-5 mb-3'
            >
                <span className='flex items-center gap-1 text-gray-400 font-bold md:text-2xl text-sm md:mb-3 mb-1'>
                    {item.icon} {item.name}
                </span>
                <span className='flex justify-start pl-5'>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="md:text-3xl text-lg font-bold text-gray-300"
                    >
                        {displayValue}<span>{item.unit}</span>
                    </motion.p>
                </span>
            </motion.div>
        )
    }

    return (
        <div className='bg-gray-800/50 w-full sm:p-10 p-5 py-5 rounded-2xl my-3'>
            {/* Header */}
            <div className='flex w-full justify-between items-center mb-3'>
                <h1 className='font-bold text-gray-400 whitespace-nowrap'>Air Conditions</h1>
                <button onClick={() => setShowMore(!showMore)} className="rounded-md bg-indigo-500 px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap text-white shadow-xs hover:bg-indigo-400 cursor-pointer">
                    {showMore ? 'Show less' : 'Show more'}
                </button>
            </div>

            {/* Content Grid */}
            <div className='grid grid-cols-2 gap-1 md:px-5'>
                {content.map(item => <AirItem key={item.id} item={item} />)}
                <AnimatePresence>
                    {showMore && (
                        <motion.div
                            key="secondContent"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden grid grid-cols-2 gap-1 col-span-2"
                        >
                            {secondContent.map(item => <AirItem key={item.id + "_second"} item={item} />)}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default AirCond;
