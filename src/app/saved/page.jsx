'use client'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { removeCountry } from '../features/country/saveCountrySlice'
import { useState, useEffect } from 'react'
import { fetchApiCountries } from '../features/country/fetchCountrySlice'
import { useRouter } from 'next/navigation'
import SideBar from '../components/SideBar'
import { useMediaQuery } from '@mui/material'
import Header from '../Header/page'
import Link from 'next/link'

export default function SavedPage() {
    const dispatch = useDispatch()
    const { countries } = useSelector((state) => state.savedCountries)
    const [isClient, setIsClient] = useState(false)
    const smallWindow = useMediaQuery('(max-width:640px)')
    const router = useRouter()
    const showBar = useSelector((state) => state.showSidebar.stateComponent)
    const colors = useSelector((state) => state.changeTheme.colors)

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
        <div className={`bg-gradient-to-b ${colors.text} grid md:grid-cols-[7rem_1fr]`} >

            {/* left bar */}
            <div div className="relative top-0 left-0 w-full h-screen overflow-hidden md:flex hidden" >
                <motion.div
                    initial={!smallWindow ? { y: 12, x: 12 } : { y: 0, x: 0 }}
                    animate={{ y: 0, x: 0 }}
                    transition={{ duration: 0.1, ease: "easeOut", delay: 0.7 }}
                    className="absolute top-0 left-0 h-full z-[1000] pointer-events-auto w-[7rem] md:flex hidden"
                >
                    <motion.div
                        initial={{ borderRadius: 20 }}
                        animate={{ borderRadius: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                        className="sm:h-full sm:w-auto w-full h-auto md:bg-gray-800 flex items-center flex-col md:sticky md:top-0 fixed bottom-0 transition-all duration-300"
                    >
                        <SideBar />
                    </motion.div>
                </motion.div>
            </div >
            <div className='md:hidden flex'>
                <SideBar />
            </div>

            <div className='sm:p-10 md:p-5 p-3 py-7'>
                {/* header */}
                <div className='flex items-center justify-center relative mb-5'>
                    <Link href={'/'}>
                        <button className={`absolute left-0 top-0 flex justify-center items-center h-full ${colors.text}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </Link>
                    <motion.h1
                        className={`md:text-4xl text-xl font-bold sm:bm-12 text-center tracking-wide whitespace-nowrap ${colors.text}`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Choose a country
                    </motion.h1>
                </div>
                <div className='mb-5 sticky top-1 z-30'>
                    <Header position={'relative'} />
                </div>

                {countries.length === 0 ? (
                    <motion.p
                        className="text-gray-500 text-center mt-32 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        You haven’t saved any countries yet.
                    </motion.p>
                ) : (
                    <>
                        <span className={`w-full font-bold flex pb-3 ${colors.title}`}>
                            <h1>My Cities</h1>
                        </span>
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
                                        className={` relative ${colors.card} backdrop-blur-md rounded-lg px-6 py-2 shadow-xl hover:-translate-y-1 transition-all duration-300`}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="flex items-end text-center justify-between">
                                            <span className='flex items-center justify-between w-full'>
                                                <h2 className={`md:text-2xl text-xl font-semibold ${colors.text}`}>
                                                    {country.city.name + ',' + country.city.country}
                                                </h2>
                                                <span className='flex justify-center items-center gap-3'>
                                                    <p className={`md:text-3xl text-2xl font-bold ${colors.text} drop-shadow-sm`} >
                                                        {temp}°
                                                        <span className="text-sky-400 md:text-2xl text-xl">C</span>
                                                    </p>
                                                    {iconUrl && (
                                                        <motion.img
                                                            src={iconUrl}
                                                            alt={desc}
                                                            className="md:w-20 w-15 aspect-square"
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{ duration: 0.2 }}
                                                        />
                                                    )}
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
                    </>
                )}
            </div>

            {/* side bar */}

        </div >
    )
}