'use client'

import React, { useEffect } from 'react'
import { FaWind } from "react-icons/fa";
import { CiBookmark, CiMap, CiSettings } from "react-icons/ci";
import { FiHome } from "react-icons/fi";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '../features/country/showSidebarSlice';
import { motion, AnimatePresence } from "framer-motion";

function SideBar() {
    const showBar = useSelector((state) => state.showSidebar.stateComponent)
    const dispatch = useDispatch()
    const iconSize = 20;
    const hideNav = () => {
        dispatch(hide())
    }
    const nav = [
        { id: 1, name: 'Home', icon: <FiHome size={iconSize} />, route: '/', function: hideNav },
        { id: 2, name: 'map', icon: <CiMap size={iconSize} />, route: '/map', function: hideNav },
        { id: 3, name: 'saved', icon: <CiBookmark size={iconSize} />, route: '/saved', function: hideNav },
        { id: 4, name: 'settings', icon: <CiSettings size={iconSize} />, route: '#', function: hideNav },
    ]

    useEffect(() => {
        if (showBar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showBar]);

    return (
        <>
            <AnimatePresence>
                {showBar && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full h-screen bg-black/80 fixed left-0 top-0 z-[1000] pointer-events-auto"
                        onClick={() => dispatch(hide())}
                    />
                )}
            </AnimatePresence>
            <div className={`z-[2000] bg-gray-800 md:rounded-2xl rounded-r-2xl md:p-5 pt-12 px-7 flex items-center flex-col md:sticky fixed top-0 
                md:top-1 bottom-0 h-screen transition-all duration-300 pointer-events-auto  md:translate-x-0 ${!showBar ? '-translate-x-full' : 'translate-x-0'}`}>
                <button className='absolute left-1 top-2 md:hidden' onClick={() => dispatch(hide())}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <Link href={'/'} className='cursor-context-menu'>
                    <span className='aspect-square w-15 h-15 md:mb-10 mb-5 md:mr-0 flex justify-center items-center rounded-xl shadow-3xl bg-gradient-to-r from-red-500 to-orange-400'>
                        <FaWind className="size-7" />
                    </span>
                </Link>
                <nav className='flex justify-center sm:w-auto w-full'>
                    <ul className='w-full flex md:justify-center justify-around flex-col text-gray-400 gap-5'>
                        {nav.map((i) => (
                            <Link
                                key={i.id}
                                href={i.route}
                            >
                                <li onClick={i.function} className='flex md:justify-center md:flex-col gap-2 items-center hover:text-gray-100 cursor-pointer transition-all duration-300'>
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
        </>
    )
}

export default SideBar
