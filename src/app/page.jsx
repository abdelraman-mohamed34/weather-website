'use client';
import SideBar from "./components/SideBar";
import RightBar from "./components/RightBar";
import Header from "./Header/page";
import MainCards from "./components/mainFolder/MainCards";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchApiCountries } from "./features/country/fetchCountrySlice";
import { useMediaQuery } from "@mui/material";

export default function Home() {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.country);
  const theme = useSelector((state) => state.changeTheme.theme);
  const [city, setCity] = useState(null);
  const mediumWindow = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (country && country.city) {
        setCity(country);
      } else {
        const saved = localStorage.getItem("currentCountry");
        if (saved) setCity(JSON.parse(saved));
        else dispatch(fetchApiCountries({ name: "Egypt" }));
      }
    }
  }, [country, dispatch]);

  return (
    <div className="relative grid md:grid-cols-[7rem_1fr] gap-3 md:p-3">
      <SideBar />
      <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_25rem] md:grid-cols-[1fr] gap-3">
        <div>
          <Header city={city} />
          <MainCards city={city} />
        </div>
        {!mediumWindow && <RightBar city={city} />}
      </div>
    </div>
  );
}
