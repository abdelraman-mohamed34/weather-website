"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Forecast(props) {
    const city = props.city
    const daily = city?.list;
    return (
        <motion.div
            className='flex flex-col mt-3 bg-gray-800 sm:p-10 py-5 rounded-2xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h1 className='mb-5 sm:pl-0 pl-5 font-bold text-gray-400'>Today's Forecast</h1>

            <div className='flex w-full h-full sm:justify-center py-5 overflow-x-auto overflow-y-hidden
             scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900
                    sm:scrollbar-thumb-gray-600'>
                <div className='flex sm:min-w-full min-w-max sm:p-auto px-5'>
                    {daily?.slice(0, 6).map((i, index) => (
                        <motion.div
                            key={`${i.dt}`}
                            className={`flex flex-1 flex-col items-center ${index !== daily.slice(0, 6).length - 1 && 'border-r border-gray-600'} px-8`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                ease: "easeOut",
                            }}
                        >
                            <p className='text-gray-400 text-sm whitespace-nowrap'>
                                {new Date(i.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <motion.img
                                src={`https://openweathermap.org/img/wn/${i.weather[0].icon}.png`}
                                alt="weather icon"
                                className='w-15 my-2'
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 100 }}
                            />
                            <p className='text-gray-200 text-2xl font-semibold whitespace-nowrap'>
                                {Math.round(i.main.temp)}°C
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default Forecast;