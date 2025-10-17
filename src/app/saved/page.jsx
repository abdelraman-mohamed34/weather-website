'use client'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { removeCountry } from '../features/country/saveCountrySlice'
import { useState, useEffect } from 'react'
import { fetchApiCountries } from '../features/country/fetchCountrySlice'
import { useRouter } from 'next/navigation'
import SideBar from '../components/SideBar'
import { useMediaQuery } from '@mui/material'

export default function SavedPage() {
    const dispatch = useDispatch()
    const { countries } = useSelector((state) => state.savedCountries)
    const [isClient, setIsClient] = useState(false)
    const smallWindow = useMediaQuery('(max-width:640px)')
    const router = useRouter()

    useEffect(() => setIsClient(true), [])
    if (!isClient) return null

    const showSavedCountryInHome = async (country) => {
        try {
            await dispatch(fetchApiCountries({ name: country.city?.name })).unwrap()
        } catch (error) {
            console.error('Error fetching country data:', error)
        } finally {
            router.push('/')
        }
    }

    return (
        <div className="bg-gradient-to-b text-gray-200 grid sm:grid-cols-[7rem_1fr]">
            {/* side bar */}
            <motion.div
                initial={!smallWindow ? { y: 12, x: 12 } : { y: 0, x: 0 }}
                animate={{ y: 0, x: 0 }}
                transition={{ duration: 0.1, ease: "easeOut", delay: 0.7 }}
                className=" top-0 left-0 h-full z-[1000] pointer-events-auto w-[7rem]"
            >
                <motion.div
                    initial={{ borderRadius: 20 }}
                    animate={{ borderRadius: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="sm:h-full sm:w-auto w-full h-auto sm:bg-gray-800 flex items-center flex-col sm:sticky sm:top-0 fixed bottom-0 transition-all duration-300"
                >
                    <SideBar style='sm:bg-transparent bg-gray-800 sm:w-auto w-full sm:rounded-2xl sm:p-5 p-4 px-7 flex items-center sm:justify-start justify-around flex-col sm:sticky sm:top-1 fixed bottom-0 sm:h-screen transition-all duration-300' />
                </motion.div>
            </motion.div>

            <div className='sm:p-10 p-5 py-7'>
                <motion.h1
                    className="sm:text-4xl text-3xl font-bold sm:mb-12 mb-7 text-start tracking-wide whitespace-nowrap"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Saved Countries
                </motion.h1>

                {countries.length === 0 ? (
                    <motion.p
                        className="text-gray-500 text-center mt-32 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        You haven’t saved any countries yet.
                    </motion.p>
                ) : (
                    <motion.div
                        className="grid md:grid-cols-2 gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {countries?.map((country, index) => {
                            const weather = country.list?.[0]
                            const temp = Math.round(weather?.main?.temp || 0)
                            const desc = weather?.weather?.[0]?.description || 'No data'
                            const icon = weather?.weather?.[0]?.icon
                            const iconUrl = icon
                                ? `https://openweathermap.org/img/wn/${icon}@2x.png`
                                : null

                            return (
                                <motion.div
                                    onClick={() => {
                                        showSavedCountryInHome(country)
                                    }}
                                    key={index}
                                    className=" relative bg-gray-800 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="flex items-end text-center justify-between py-5">
                                        <span className='flex items-center w-full'>
                                            {iconUrl && (
                                                <motion.img
                                                    src={iconUrl}
                                                    alt={desc}
                                                    className="w-20 h-20"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.2 }}
                                                />
                                            )}
                                            <span className='justify-start items-center text-start w-full'>
                                                <h2 className="text-2xl font-semibold text-sky-300">
                                                    {country.city.name + ',' + country.city.country}
                                                </h2>
                                                <span className='flex items-center w-full justify-between'>
                                                    <p className="capitalize text-gray-400 text-sm whitespace-nowrap">{desc}</p>
                                                    <p className="text-3xl font-bold text-white drop-shadow-sm" >
                                                        {temp}°
                                                        <span className="text-sky-400 text-2xl">C</span>
                                                    </p>

                                                </span>
                                            </span>
                                        </span>


                                        <motion.button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                dispatch(removeCountry(country.city.name))
                                            }}
                                            className="absolute top-1 right-2 mt-3 text-sm font-medium active:scale-95 transition-all"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}
            </div>

            {/* side bar */}

        </div>
    )
}