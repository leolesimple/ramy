"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeColorMeta() {
    const { theme } = useTheme();

    useEffect(() => {
        let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }
        meta.content = theme === "dark" ? "#fbfafa" : "#0c0a0a";
    }, [theme]);

    return null;
}
