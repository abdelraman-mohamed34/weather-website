'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Globe2, Thermometer, Wind, Moon, Sun } from 'lucide-react'
import ThemeToggle from '../components/theme'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'
import { swapTheme } from '../features/country/changeThemeSlice'

export default function SettingsPage() {
    const colors = useSelector((state) => state.changeTheme.colors)
    const theme = useSelector((state) => state.changeTheme.theme)

    const dispatch = useDispatch()

    const [settings, setSettings] = useState({
        language: 'en',
        tempUnit: 'C',
        windUnit: 'km/h',
    })

    // Dark mode toggle
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    // Load saved settings
    useEffect(() => {
        const saved = localStorage.getItem('settings')
        if (saved) {
            const save = JSON.parse(saved)
            if (save.theme) dispatch(swapTheme(save.theme))
            setSettings({
                language: save.language,
                tempUnit: save.tempUnit,
                windUnit: save.windUnit,
            })
        }
    }, [dispatch])

    const handleSave = () => {
        localStorage.setItem(
            'settings',
            JSON.stringify({ theme, ...settings })
        )
    }

    const settingsList = [
        {
            key: 'language',
            label: 'Language',
            icon: <Globe2 className="text-blue-500 dark:text-blue-400" />,
            options: [
                { value: 'en', label: 'English' },
                { value: 'ar', label: 'العربية' },
            ],
        },
        {
            key: 'tempUnit',
            label: 'Temperature Unit',
            icon: <Thermometer className="text-red-500 dark:text-red-400" />,
            options: [
                { value: 'C', label: '°C' },
                { value: 'F', label: '°F' },
            ],
        },
        {
            key: 'windUnit',
            label: 'Wind Speed Unit',
            icon: <Wind className="text-green-500 dark:text-green-400" />,
            options: [
                { value: 'km/h', label: 'km/h' },
                { value: 'm/s', label: 'm/s' },
            ],
        },
    ]

    return (
        <div className={`min-h-screen flex flex-col transition-all duration-500 ${colors.background}`}>
            <header className={`flex items-center justify-between px-6 py-4 ${colors.container} backdrop-blur-md shadow-md`}>
                <div className="flex items-center gap-2">
                    <Settings className={`w-6 h-6 ${colors.icon}`} />
                    <h1 className={`text-2xl font-semibold ${colors.containerText}`}>
                        Settings
                    </h1>
                </div>
            </header>

            <motion.main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className={`w-full max-w-3xl ${colors.container} backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6`}>
                    {settingsList.map((item) => (
                        <div
                            key={item.key}
                            className={`flex items-center justify-between border-b pb-4 ${colors.containerBorder}`}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon}
                                <span className={`text-lg ${colors.containerText}`}>{item.label}</span>
                            </div>
                            <select
                                value={settings[item.key]}
                                onChange={(e) =>
                                    setSettings({ ...settings, [item.key]: e.target.value })
                                }
                                className={`rounded-lg px-3 py-2 focus:outline-none ${colors.selectBg} ${colors.selectText}`}
                            >
                                {item.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <ThemeToggle />

                    <Link href="/">
                        <motion.button
                            onClick={handleSave}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full mt-6 font-semibold py-3 rounded-xl shadow-lg ${colors.buttonBg} ${colors.buttonText}`}
                        >
                            Save Settings
                        </motion.button>
                    </Link>
                </div>
            </motion.main>
        </div>
    )
}
