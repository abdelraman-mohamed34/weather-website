"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function RightBar(props) {
    const [dailyForecast, setDailyForecast] = useState([]);
    const city = props.city

    useEffect(() => {
        if (city?.list) {
            const grouped = {};

            city.list.forEach((item) => {
                const date = item.dt_txt.split(" ")[0];
                if (!grouped[date]) grouped[date] = [];
                grouped[date].push(item);
            });

            const days = Object.keys(grouped).map((date) => {
                const entries = grouped[date];
                const temps = entries.map((e) => e.main.temp);
                const icons = entries.map((e) => e.weather[0].icon);
                const pops = entries.map((e) => e.pop || 0);
                const conditions = entries.map(
                    (e) => e.weather?.[0]?.main || e.weather?.[0]?.description || "N/A"
                );

                return {
                    date,
                    day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
                    temp_max: Math.max(...temps),
                    temp_min: Math.min(...temps),
                    icon: icons[Math.floor(icons.length / 2)],
                    pop: Math.round((pops.reduce((a, b) => a + b, 0) / pops.length) * 100),
                    condition: conditions[Math.floor(conditions.length / 2)],
                };
            });

            setDailyForecast(days.slice(0, 5));
        }
    }, [city]);

    return (
        <motion.div
            className="rounded-2xl md:bg-gray-800 md:p-10 px-5 overflow-hidden sm:sticky sm:top-1 xl:h-screen"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-gray-400 font-bold text-md sm:mb-5 mb-1">5-Day's Forecast</h1>
            <div className='md:px-5'>
                {dailyForecast.map((i, index) => (
                    <motion.span
                        key={i.date}
                        className="justify-between grid grid-cols-2 md:p-5 xl:py-10 md:border-b border-gray-600 last:border-0
                     cursor-pointer hover:scale-105 transition-all bg-base-100"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.1,
                            delay: index * 0.15,
                            ease: "easeOut",
                        }}
                    >
                        <h1 className="text-gray-400 items-center flex">{i.day}</h1>

                        <div className='flex justify-end gap-3'>
                            <span className="flex justify-center items-center">
                                <motion.img
                                    src={`https://openweathermap.org/img/wn/${i.icon}.png`}
                                    alt="weather icon"
                                    className="sm:w-15 w-12"
                                    whileHover={{ rotate: 10, scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                />
                                <h1 className="text-white font-medium">{i.condition}</h1>
                            </span>

                            <h1 className="flex justify-center items-center text-white font-semibold md:ml-2">
                                {Math.round(i.temp_max)}
                                <span>
                                    <h1 className="text-gray-400">{'/' + Math.round(i.temp_min)}</h1>
                                </span>
                            </h1>
                        </div>
                    </motion.span>
                ))}
            </div>

        </motion.div>

    );
}

export default RightBar;
