'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

function LocationBtn(props) {
    const city = props.city
    return (
        <Link href="/map">
            <motion.button
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(56, 189, 248, 0.5)",
                    backgroundColor: "#f0f9ff",
                    color: "#0c4a6e"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute md:top-5 left-5 text-gray-600 rounded-2xl bg-white px-3 p-1 cursor-pointer flex items-center gap-1 shadow-md z-20"
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    animate={{
                        rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                    whileHover={{
                        rotate: [0, -15, 15, -15, 0],
                        scale: 1.2
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </motion.svg>
                {city?.city?.name + ',' + city?.city?.country}
            </motion.button>
        </Link>
    )
}

export default LocationBtn
