'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function FlyToLocation({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 7, { duration: 1.5 });
        }
    }, [position, map]);

    return null;
}