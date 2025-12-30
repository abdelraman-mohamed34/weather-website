# 🌤️ Weather Website

A modern and responsive **Weather Web Application** built with **Next.js**, **Redux**, **Tailwind CSS**, and **Material UI (MUI)**.

---

## 🔗 Live Demo

https://weather-website-omega-liard.vercel.app/

---

## 📌 Overview

A simple and fast weather application that allows users to search for any city and view real-time weather data with a clean and responsive UI.

---

## ✨ Features

- Search weather by city
- Display current temperature and conditions
- Wind speed and humidity
- Responsive design
- Fast UI updates
- Redux state management

---

## 🛠️ Tech Stack

- Next.js
- JavaScript
- Tailwind CSS
- Material UI (MUI)
- Redux
- Weather API

---

## 📁 Project Structure

weather-website/
├─ src/
│  ├─ app/                         # Next.js App Router
│  │  ├─ page.jsx                  # Main page (Home)
│  │  ├─ layout.jsx                # Root layout
│  │  ├─ globals.css               # Global styles
│  │  └─ loading.jsx               # Global loading UI
│  │
│  ├─ components/                  # Reusable UI components
│  │  ├─ SearchBar.jsx             # City search input
│  │  ├─ WeatherCard.jsx           # Weather information card
│  │  ├─ WeatherDetails.jsx        # Extra weather details
│  │  └─ Loader.jsx                # Loading spinner
│  │
│  ├─ redux/                       # Redux state management
│  │  ├─ store.js                  # Redux store
│  │  └─ weatherSlice.js           # Weather state & reducers
│  │
│  ├─ services/                    # API services
│  │  └─ weatherService.js         # Weather API calls
│  │
│  ├─ utils/                       # Helper functions
│  │  └─ formatTemperature.js
│  │
│  └─ constants/                   # Static constants
│     └─ apiUrls.js
│
├─ public/                         # Static assets
│  ├─ icons/
│  └─ images/
│
├─ .env.local                      # Environment variables
├─ .gitignore
├─ next.config.mjs                 # Next.js configuration
├─ postcss.config.mjs              # PostCSS config
├─ tailwind.config.js              # Tailwind config
├─ jsconfig.json                   # Path aliases
├─ package.json
├─ package-lock.json
└─ README.md
