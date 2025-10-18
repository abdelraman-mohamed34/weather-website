'use client'
import React, { useState, useEffect } from 'react'
import { fetchApiCountries } from '../features/country/fetchCountrySlice'
import { useDispatch, useSelector } from 'react-redux'
import { show, hide } from '../features/country/showSidebarSlice'

function Header(props) {
    const [loadingSearched, setLoadingSearched] = useState('')


    const dispatch = useDispatch()
    const showSide = useSelector((state) => state.showSidebar.stateComponent)

    console.log(showSide)

    const handleSearch = () => {
        if (!loadingSearched.trim()) return;
        dispatch(fetchApiCountries({ name: loadingSearched.trim() }))
    }
    const colors = useSelector((state) => state.changeTheme.colors)

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             async (position) => {
    //                 const { latitude, longitude } = position.coords
    //                 console.log("Latitude:", latitude)
    //                 console.log("Longitude:", longitude)

    //                 const response = await fetch(
    //                     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    //                 )
    //                 const data = await response.json()

    //                 const country = data.address.country
    //                 const city = data.address.city || data.address.town || data.address.village

    //                 console.log("🌍 الدولة:", country)
    //                 console.log("🏙️ المدينة:", city)
    //             },
    //             (error) => {
    //                 console.error("Error:", error.message)
    //             }
    //         )
    //     } else {
    //         console.log("Geolocation is not supported by this browser.")
    //     }
    // }, [])

    return (
        <div className={`flex items-center ${props.position ? props.position : 'fixed'} top-1 z-500 w-full md:pl-0 pl-2 md:relative`} >
            <button className={`rounded-lg ${colors.contains} ${colors.text} px-2 py-2 h-full md:hidden flex`} onClick={() => showSide ? dispatch(hide()) : dispatch(show())}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={` size-6`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            </button>

            <div className={`w-full lg:min-w-150 px-1`}>
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                    className='flex justify-center w-full '
                >
                    <input
                        type="text"
                        value={loadingSearched}
                        onChange={(e) => setLoadingSearched(e.target.value)}
                        placeholder="Search about country..."
                        className={`flex-auto rounded-md ${colors.contains} px-3.5 py-2 ${colors.text} placeholder:${colors.text} focus:outline-0 sm:text-sm/6`}
                    />
                </form>
            </div>
        </div >

    )
}

export default Header
