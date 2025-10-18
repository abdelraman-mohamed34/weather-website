'use client'

import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion, useInView } from "framer-motion";

export default function WeatherChart(props) {
    const [forecast, setForecast] = useState([]);
    const city = props.city

    useEffect(() => {
        const fetchForecast = async () => {
            const formatted = city?.list?.slice(0, 8).map((item) => ({
                time: new Date(item.dt_txt).getHours() + ":00",
                temp: item.main.temp,
            }));

            setForecast(formatted);
        };

        fetchForecast();
    }, [city]);

    return (
        <div className="w-full h-64 bg-gray-800/50 rounded-2xl text-white sm:p-10 py-5" tabIndex={-1} onMouseDown={(e) => e.preventDefault()}>
            <h2 className="text-gray-400 text-lg font-semibold mb-3 sm:pl-0 pl-5">Temperature Graph (Next 24h)</h2>
            <Suspense fallback={<div>Loading chart...</div>}>
                <ResponsiveContainer
                    width="100%"
                    height="80%"
                    style={{ overflow: "hidden", }}
                >
                    <LineChart data={forecast} className="focus:outline-none focus:ring-0 focus:border-none -ml-5 sm:p-0 p-2">
                        <CartesianGrid strokeDasharray="3 3" stroke="0" />
                        <XAxis dataKey="time" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="oklch(58.5% 0.233 277.117)"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            inView="true"
                            animationDuration={1000}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Suspense>
        </div >
    );
}
