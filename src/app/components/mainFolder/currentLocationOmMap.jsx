'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
    () => import("react-leaflet").then((m) => m.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((m) => m.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((m) => m.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((m) => m.Popup),
    { ssr: false }
);

export default function UserLocationMap({ city }) {
    const [L, setL] = useState(null);
    const [userIcon, setUserIcon] = useState(null);
    const [position, setPosition] = useState([0, 0]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        import("leaflet").then((leaflet) => {
            const icon = new leaflet.Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
                iconSize: [35, 35],
            });
            setL(leaflet);
            setUserIcon(icon);
        });
    }, []);

    useEffect(() => {
        if (!city?.city?.coord) return;
        setPosition([city.city.coord.lat, city.city.coord.lon]);
        setLoaded(true);
    }, [city]);

    if (!loaded || !L || !userIcon) return

    return (
        <MapContainer
            center={position}
            zoom={3}

            className="md:rounded-4xl rounded-2xl h-full xl:mt-3 sm:p-10 p-10 py-15 text-white"
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={false}
            touchZoom={false}
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
        </MapContainer>
    );
}
