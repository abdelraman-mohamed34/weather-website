"use client";

import Card from "./components/mainFolder/Card";
import SideBar from "./components/SideBar";
import RightBar from "./components/RightBar";
import Header from "./Header/page";
import MainCards from "./components/mainFolder/MainCards";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Home() {

  const { country } = useSelector((state) => state.country)

  const [city, setCity] = useState(null)

  useEffect(() => {
    if (country && country.city) {
      setCity(country)
    } else {
      const saved = localStorage.getItem('currentCountry')
      if (saved) {
        try {
          setCity(JSON.parse(saved))
        } catch (err) {
          console.error('Error parsing localStorage data', err)
        }
      }
    }
  }, [country])

  return (
    <>
      <div className="relative grid sm:grid-cols-[7rem_1fr] gap-3 p-3">
        <SideBar />

        <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_25rem] md:grid-cols-[1fr] gap-3">
          <div>
            <Header city={city} />
            <MainCards city={city} />
          </div>

          <RightBar city={city} />
        </div>
      </div>
    </>

  );
}
