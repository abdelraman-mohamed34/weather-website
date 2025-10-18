'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { swapTheme } from '../features/country/changeThemeSlice'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
    const theme = useSelector((state) => state.changeTheme.theme)
    const dispatch = useDispatch()

    const [darkMode, setDarkMode] = useState(theme === 'dark')

    useEffect(() => {
        const savedTheme = localStorage.getItem('storageTheme') || 'light'
        const isDark = savedTheme === 'dark'
        setDarkMode(isDark)
        document.documentElement.classList.toggle('dark', isDark)
        dispatch(swapTheme(savedTheme))
    }, [dispatch])

    const toggleTheme = () => {
        const newMode = darkMode ? 'light' : 'dark'
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle('dark', !darkMode)
        localStorage.setItem('storageTheme', newMode)
        dispatch(swapTheme(newMode))
    }

    return (
        <div className="flex items-center justify-start transition-colors duration-500">
            <label className="relative inline-flex items-center cursor-pointer w-20 h-10">
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleTheme}
                    className="sr-only peer"
                />
                <motion.div
                    className="absolute w-full h-full rounded-full"
                    style={{
                        background: darkMode
                            ? 'linear-gradient(90deg, #4B5563, #1F2937)'
                            : 'linear-gradient(90deg, #FDE68A, #FBBF24)',
                    }}
                    transition={{ duration: 0.5 }}
                />

                <motion.div
                    className="absolute left-1 top-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center"
                    animate={{
                        x: darkMode ? 40 : 0,
                        rotate: darkMode ? 360 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                    }}
                >
                    {darkMode ? <Moon className="w-4 h-4 text-gray-200" /> : <Sun className="w-4 h-4 text-yellow-500" />}
                </motion.div>
            </label>
        </div>

    )
}
