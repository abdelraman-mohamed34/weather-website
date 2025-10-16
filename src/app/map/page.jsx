'use client';
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { useMediaQuery } from "@mui/material";

import SideBar from "../components/SideBar";
import Header from "../Header/page";

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [35, 35],
});

function FlyToLocation({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) map.flyTo(position, 7, { duration: 1.5 });
    }, [position]);
    return null;
}

export default function Page() {
    const [position, setPosition] = useState([0, 0]);
    const [loaded, setLoaded] = useState(false);

    const country = useSelector((state) => state.country);
    const [city, setCity] = useState(null);

    const [searchResult, setSearchResult] = useState(null);
    const smallWindow = useMediaQuery('(max-width:640px)')


    useEffect(() => {
        if (country && country.city) {
            setCity(country)
        } else {
            const saved = localStorage.getItem('currentCountry')
            if (saved) {
                try {
                    setCity(JSON.parse(saved))
                } catch (err) {
                    console.error('Error parsing localStorage data', err)
                }
            }
        }
    }, [country])

    useEffect(() => {
        if (!city?.city?.coord) return;
        setPosition([city.city.coord.lat, city.city.coord.lon]);
        setLoaded(true);
    }, [city]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
        );
        const data = await res.json();

        if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            const newPos = [parseFloat(lat), parseFloat(lon)];
            setSearchResult({ name: display_name, position: newPos });
            setPosition(newPos);
        } else {
            alert("cant search about this area");
        }
    };

    if (!loaded)
        return (
            <div className="w-full h-screen flex items-center justify-center text-white">
                Loading map...
            </div>
        );

    const bounds = L.latLngBounds(
        L.latLng(-90, -180),
        L.latLng(90, 180)
    );
    return (
        <div className="w-full h-screen relative">
            <MapContainer
                center={position}
                zoom={8}
                className="w-full h-full shadow-lg"
                zoomControl={false}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                dragging={true}
                touchZoom={true}
                maxZoom={13}
                minZoom={2}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={position} icon={userIcon}>
                    <Popup>
                        You are in {city?.city?.name}, {city?.city?.country}
                    </Popup>
                </Marker>

                {searchResult && (
                    <Marker position={searchResult.position}>
                        <Popup>{searchResult.name}</Popup>
                    </Marker>
                )}

                <FlyToLocation position={position} />
            </MapContainer>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.form
                    onSubmit={handleSearch}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="hidden absolute top-5 left-1/2 -translate-x-1/2 z-[1001] pointer-events-auto bg-gray-800/70 backdrop-blur-md p-3 rounded-full gap-2 shadow-lg"
                >
                </motion.form>

                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.1, ease: "easeOut", delay: 0.7 }}
                    className="absolute top-0 right-0 z-[1000] w-full flex justify-center pt-2 pointer-events-auto"
                >
                    <div className="w-full max-w-200 sm:m-0 mx-1">
                        <Header />
                    </div>
                </motion.div>

                <motion.div
                    initial={!smallWindow ? { y: 12, x: 12 } : { y: 0, x: 0 }}
                    animate={{ y: 0, x: 0 }}
                    transition={{ duration: 0.1, ease: "easeOut", delay: 0.7 }}
                    className="absolute top-0 left-0 h-full z-[1000] pointer-events-auto w-[7rem]"
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
            </div>
        </div>
    );
}


