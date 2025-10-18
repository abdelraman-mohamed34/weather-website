'use client'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { swapTheme } from "./features/country/changeThemeSlice";

export default function ThemeInitializer({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const saved = localStorage.getItem("storageTheme") || "light";
        dispatch(swapTheme(saved));
        document.body.classList.toggle("dark", saved === "dark");
    }, [dispatch]);

    return children;
}
