/* eslint-disable react-hooks/exhaustive-deps */
import { useCommonStore } from "@/store/common";
import { useEffect } from "react";

export const ResizeController = () => {
    const setIsMobile = useCommonStore((state) => state.setIsMobile);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return null;
};

export default ResizeController;
