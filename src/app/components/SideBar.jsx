'use client'
import React from 'react'
import { FaWind } from "react-icons/fa";
import { CiBookmark, CiMap, CiSettings } from "react-icons/ci";
import Link from 'next/link';

function SideBar(props) {

    const iconSize = 20;
    const nav = [
        { id: 1, name: 'map', icon: <CiMap size={iconSize} />, function: '/map' },
        { id: 2, name: 'saved', icon: <CiBookmark size={iconSize} />, function: '/saved' },
        { id: 3, name: 'settings', icon: <CiSettings size={iconSize} />, function: '#' },
    ]

    const defaultStyles = 'sm:bg-gray-800 bg-gray-900 sm:rounded-2xl sm:p-5 p-4 px-7 flex items-center sm:flex-col sm:sticky sm:top-1 fixed z-[2000] bottom-0 w-full sm:h-screen transition-all duration-300'

    return (
        <div className={props.style ? props.style : defaultStyles}>
            <Link href={'/'} className='cursor-context-menu'>
                <span className='aspect-square w-15 h-15 sm:mb-10 sm:mr-0 sm:flex hidden justify-center items-center rounded-xl shadow-3xl bg-gradient-to-r from-red-500 to-orange-400'>
                    <FaWind className="size-7" />
                </span>
            </Link>
            <nav className='flex justify-center sm:w-auto w-full'>
                <ul className='w-full flex sm:justify-center justify-around sm:flex-col text-gray-400 gap-5'>
                    {nav.map((i) => (
                        <Link
                            key={i.id}
                            href={i.function}
                        >
                            <li className='flex justify-center flex-col items-center hover:text-gray-100 cursor-pointer transition-all duration-300'>
                                {i.icon}
                                <h1 className='mt-1'>
                                    {i.name}
                                </h1>
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default SideBar
