"use client";
import { useState, useEffect, useRef } from "react";

const UrlCarousel = () => {
    const urls = [
        "https://www.weather.gov/",
        "https://www.nyse.com/index"
    ];

    const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
    const carouselRef = useRef(null); // Reference to the carousel container

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentUrlIndex((prevIndex) => (prevIndex + 1) % urls.length);
        }, 20000); // Change URL every 3 seconds

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [urls.length]);

    // Function to toggle fullscreen
    const goFullscreen = () => {
        if (carouselRef.current) {
            if (!document.fullscreenElement) {
                carouselRef.current.requestFullscreen().catch((err) => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div ref={carouselRef} style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
            <iframe
                src={urls[currentUrlIndex]}
                style={{
                    height: "100%",
                    width: "100%",
                    border: "none",
                }}
                title="URL Carousel"
            ></iframe>

            <button
                onClick={goFullscreen}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "10px 20px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Toggle Fullscreen
            </button>
        </div>
    );
};

export default UrlCarousel;
