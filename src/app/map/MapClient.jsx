'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useMediaQuery } from "@mui/material";
import SideBar from "../components/SideBar";
import Header from "../Header/page";
import { useSelector } from "react-redux";

// ✅ تحميل مكونات React Leaflet بشكل ديناميكي بدون SSR
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });
const FlyToLocation = dynamic(() => import('./Fly'), { ssr: false });

export default function MapClient() {
    const [L, setLeaflet] = useState(null);
    const [userIcon, setUserIcon] = useState(null);
    const [position, setPosition] = useState([0, 0]);
    const [loaded, setLoaded] = useState(false);
    const country = useSelector((state) => state.country);
    const [city, setCity] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const smallWindow = useMediaQuery('(max-width:640px)');

    // ✅ تحميل Leaflet في العميل فقط
    useEffect(() => {
        import("leaflet").then((leaflet) => {
            setLeaflet(leaflet);
            const icon = new leaflet.Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                iconSize: [35, 35],
            });
            setUserIcon(icon);
        });
    }, []);

    // ✅ تحميل بيانات المدينة من Redux أو LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('currentCountry');
        const localData = saved ? JSON.parse(saved) : null;
        setCity(country?.city ? country : localData);
    }, [country]);

    // ✅ ضبط الإحداثيات عند توفر المدينة
    useEffect(() => {
        if (!city?.city?.coord) return;
        setPosition([city.city.coord.lat, city.city.coord.lon]);
        setLoaded(true);
    }, [city]);

    // ✅ شاشة تحميل مؤقتة قبل تجهيز الخريطة
    if (!L || !userIcon || !loaded)
        return (
            <div className="w-full h-screen flex items-center justify-center text-white text-lg">
                Loading map...
            </div>
        );

    return (
        <div className="w-full h-screen relative">
            {/* ✅ MapContainer يظهر فقط بعد تحميل Leaflet */}
            {L && (
                <MapContainer
                    center={position}
                    zoom={8}
                    className="w-full h-full shadow-lg"
                    zoomControl={false}
                    scrollWheelZoom
                    doubleClickZoom
                    dragging
                    touchZoom
                    maxZoom={13}
                    minZoom={2}
                    maxBounds={L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180))}
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
            )}

            {/* ✅ الواجهة الثابتة فوق الخريطة */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* ✅ الهيدر */}
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

                {/* ✅ السايد بار */}
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
                        <SideBar
                            style='sm:bg-transparent bg-gray-800 sm:w-auto w-full sm:rounded-2xl sm:p-5 p-4 px-7 flex items-center sm:justify-start justify-around flex-col sm:sticky sm:top-1 fixed bottom-0 sm:h-screen transition-all duration-300'
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
