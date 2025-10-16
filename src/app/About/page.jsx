"use client";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCountry, fetchCountryByName } from '../features/country/saveCountrySlice.js';

function Page() {
    const dispatch = useDispatch()
    const savedCountries = useSelector((state) => state.savedCountries.countries);

    const [search, setSearch] = useState('');
    const [currentCountry, setCurrentCountry] = useState(null);
    const [handleSave, setHandleSave] = useState(false);

    const handleSearch = async () => {
        const action = await dispatch(fetchCountryByName(search));
        setCurrentCountry(action.payload);
        setSearch('');
    }

    const handleAdd = () => {
        if (currentCountry) {
            const existing = JSON.parse(localStorage.getItem('countries')) || [];
            existing.push(currentCountry);
            localStorage.setItem('countries', JSON.stringify(existing));
            dispatch(addCountry(currentCountry));
            setCurrentCountry(null)
            setHandleSave(true)
        }
    }

    useEffect(() => {
        console.log("Saved countries updated:", savedCountries);
    }, [savedCountries]);

    return (
        <div>
            <h1>Weather Countries</h1>
            <div>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search country" />
                <button onClick={handleSearch}>Search</button>
            </div>

            {currentCountry && (
                <div>
                    <h2>Current:</h2>
                    <p>{currentCountry.city.name} : {currentCountry.city.coord.lat} & {currentCountry.city.coord.lon}</p>
                    <button onClick={handleAdd}>Add to Saved</button>
                </div>
            )}
            <h2>Saved Countries:</h2>
            <ul>
                {savedCountries.map((c, idx) => (
                    <li key={idx}>
                        {c.city.name} : {c.city.coord.lat} & {c.city.coord.lon}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Page;