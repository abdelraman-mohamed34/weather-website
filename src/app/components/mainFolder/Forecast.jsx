"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Forecast(props) {
    const city = props.city
    const daily = city?.list;
    return (
        <motion.div
            className='flex flex-col mt-3 sm:px-10  rounded-2xl'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h1 className='sm:pl-0 pl-5 font-bold text-gray-400'>Today's Forecast</h1>

            <div className='flex w-full h-full sm:justify-center py-5 overflow-x-auto overflow-y-hidden
             scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900
                    sm:scrollbar-thumb-gray-600'>
                <div className='flex sm:min-w-full min-w-max md:p-auto  font-bold text-gray-400 gap-3'>
                    {daily?.slice(0, 6).map((i, index) => (
                        <motion.div
                            key={`${i.dt}`}
                            className={`flex flex-1 flex-col items-center bg-gray-700/50 px-3 py-1 pt-2 rounded-xl`}
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
                            <p className='text-gray-200 md:text-2xl font-semibold whitespace-nowrap my-1'>
                                {Math.round(i.main.temp)}°C
                            </p>
                            <motion.img
                                src={`https://openweathermap.org/img/wn/${i.weather[0].icon}.png`}
                                alt="weather icon"
                                className='md:w-15'
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 100 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default Forecast;