'use client'
import React, { useState } from 'react'
import { fetchApiCountries } from '../features/country/fetchCountrySlice'
import { useDispatch } from 'react-redux'

function Header() {
    const [loadingSearched, setLoadingSearched] = useState('')
    const dispatch = useDispatch()

    const handleSearch = () => {
        if (!loadingSearched.trim()) return;
        dispatch(fetchApiCountries({ name: loadingSearched.trim() }))
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Latitude:", position.coords.latitude);
                console.log("Longitude:", position.coords.longitude);
            },
            (error) => {
                console.error("Error:", error.message);
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    // current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );

            const data = await response.json();
            // console.log(data);

            const country = data.address.country;
            const city = data.address.city || data.address.town || data.address.village;

            console.log("🌍 الدولة:", country);
            console.log("🏙️ المدينة:", city);
        });
    }

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
                    className="flex-auto rounded-md bg-gray-800 px-3.5 py-2 text-white placeholder:text-gray-400 focus:outline-0 focus:-outline-offset-0 sm:text-sm/6"
                />
            </form>
        </div>
    )
}

export default Header
