import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [35, 35],
});

export default function UserLocationMap(props) {
    const [position, setPosition] = useState([0, 0]);
    const [loaded, setLoaded] = useState(false);
    const city = props.city

    useEffect(() => {
        if (!city) return;
        if (!city.city || !city.city.coord) return;
        setPosition([city.city.coord.lat, city.city.coord.lon]);
        setLoaded(true);
    }, [city]);

    if (!loaded) return <div className="w-full md:h-100 sm:h-85 h-70 flex items-center justify-center text-white">Loading map...</div>;
    return (
        <MapContainer
            center={position}
            zoom={3}
            className="w-full h-full md:rounded-4xl rounded-2xl shadow-lg xl:mt-3"
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
                <Popup>You are in {city?.city?.name + ',' + city?.city?.country}</Popup>
            </Marker>
        </MapContainer>
    );
}
