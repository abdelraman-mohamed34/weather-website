"use client";
import SideBar from "./components/SideBar";
import RightBar from "./components/RightBar";
import Header from "./Header/page";
import MainCards from "./components/mainFolder/MainCards";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchApiCountries } from "./features/country/fetchCountrySlice"; // ✅ تأكد من المسار

export default function Home() {
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.country);
  const [city, setCity] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ لو الدولة موجودة في الـ Redux
      if (country && country.city) {
        setCity(country);
      } else {
        // ✅ لو فيه بيانات محفوظة في localStorage
        const saved = localStorage.getItem("currentCountry");
        if (saved) {
          try {
            setCity(JSON.parse(saved));
          } catch (err) {
            console.error("Error parsing localStorage data", err);
          }
        } else {
          // ✅ أول مرة تفتح الصفحة — جيب بيانات مصر
          dispatch(fetchApiCountries({ name: "Egypt" }));
        }
      }
    }
  }, [country, dispatch]);

  return (
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
  );
}
