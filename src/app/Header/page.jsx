'use client'
import React, { useState, useEffect } from 'react'
import { fetchApiCountries } from '../features/country/fetchCountrySlice'
import { useDispatch } from 'react-redux'

function Header() {
    const [loadingSearched, setLoadingSearched] = useState('')
    const dispatch = useDispatch()

    const handleSearch = () => {
        if (!loadingSearched.trim()) return;
        dispatch(fetchApiCountries({ name: loadingSearched.trim() }))
    }

    useEffect(() => {
        // الحصول على الموقع الحالي
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords
                    console.log("Latitude:", latitude)
                    console.log("Longitude:", longitude)

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    )
                    const data = await response.json()

                    const country = data.address.country
                    const city = data.address.city || data.address.town || data.address.village

                    console.log("🌍 الدولة:", country)
                    console.log("🏙️ المدينة:", city)
                },
                (error) => {
                    console.error("Error:", error.message)
                }
            )
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }, [])  // empty dependency → run once on client

    return (
        <div className='w-full lg:min-w-150'>
            <form
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className='flex justify-center w-full '
            >
                <input
                    type="text"
                    value={loadingSearched}
                    onChange={(e) => setLoadingSearched(e.target.value)}
                    placeholder="Search about country..."
                    className="flex-auto rounded-md bg-gray-800 px-3.5 py-2 text-white placeholder:text-gray-400 focus:outline-0 sm:text-sm/6"
                />
            </form>
        </div>
    )
}

export default Header
