"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel as CarouselType } from "@/app/ui/types";

interface CarouselProps {
    carousel?: CarouselType;
}

const transitionVariants = {
    Slide: {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
    },
    Fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    Zoom: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.2, opacity: 0 },
    },
};

const defaultTransitionType = 'fade';

const Carousel: React.FC<CarouselProps> = ({ carousel }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isFullscreen, setIsFullscreen]: boolean = useState();
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const advanceSlide = useCallback(() => {
        if (carousel && carousel.slides) {
            setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % carousel.slides.length);
        }
    }, [carousel]);

    useEffect(() => {
        if (!carousel || !carousel.slides || carousel.slides.length === 0) {
            return;
        }

        const currentSlide = carousel.slides[currentSlideIndex];
        const timer = setTimeout(advanceSlide, currentSlide.transitionInterval * 1000);

        return () => clearTimeout(timer);
    }, [currentSlideIndex, carousel, advanceSlide]);

    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            if (iframeRef.current) {
                iframeRef.current.requestFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    if (!carousel || !carousel.slides || carousel.slides.length === 0) {
        return <div className="w-full h-screen bg-gray-200 flex items-center justify-center">No slides available</div>;
    }

    const currentSlide = carousel.slides[currentSlideIndex];
    const transitionType = (currentSlide.transitionType in transitionVariants)
        ? currentSlide.transitionType
        : defaultTransitionType;
    console.log(transitionType)

    return (
        <div className="w-full h-screen overflow-hidden relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlideIndex}
                    className="absolute top-0 left-0 w-full h-full"
                    initial={transitionVariants[transitionType as keyof typeof transitionVariants].initial}
                    animate={transitionVariants[transitionType as keyof typeof transitionVariants].animate}
                    exit={transitionVariants[transitionType as keyof typeof transitionVariants].exit}
                    transition={{ duration: 0.5 }}
                >
                    <iframe
                        ref={iframeRef}
                        src={currentSlide.url}
                        className="w-full h-full border-0"
                        title={`Slide ${currentSlideIndex + 1}`}
                        sandbox="allow-same-origin allow-scripts"
                    />
                </motion.div>
            </AnimatePresence>

            <button
                onClick={toggleFullscreen}
                className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200"
            >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
        </div>
    );
};

export default Carousel;