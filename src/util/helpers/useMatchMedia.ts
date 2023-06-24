import { useState, useRef, useEffect } from "react";

const useMatchMedia = (mediaQuery: string): boolean => {
    const [isMatching, setIsMatching] = useState(false);
    const isFirstRender = useRef(true);

    const handleMatchMediaChange = (e: MediaQueryListEvent) => {
        // console.log("handleMatchMediaChange", e.matches);
            setIsMatching(e.matches);
    };

    useEffect(() => {
        const matchQueryList = window.matchMedia(mediaQuery);
        matchQueryList.addEventListener("change", handleMatchMediaChange);

        if (isFirstRender.current) {
            setIsMatching(matchQueryList.matches);
            isFirstRender.current = false;
        };

        matchQueryList.addEventListener("change", handleMatchMediaChange);

        return () => {
            matchQueryList.removeEventListener(
                "change",
                handleMatchMediaChange
            );
        };
    }, [mediaQuery]);

    // console.log("matchMedia", isMatching);

    return isMatching;
};

export default useMatchMedia;
