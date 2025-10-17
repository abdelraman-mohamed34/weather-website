'use client';
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient.jsx'), { ssr: false });

export default function Page() {
    return <MapClient />;
}
