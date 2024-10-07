"use client";
import React, { useEffect, useState } from "react";
import Carousel from "@/app/ui/carousel-component/Carousel";


const CarrouselDisplay: React.FC<{ params: { id: string } }> = ({ params }) => {
    const id = params.id;
    console.log(params)
    const [carouselData, setCarouselData]: Carousel = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        useEffect(() => {
            if (id) {
                const fetchCarrousel = async () => {
                    try {
                        const response = await fetch(`http://localhost:8080/api/carousel/${id}`);
                        if (!response.ok) {
                            throw new Error("Failed to fetch carousels");
                        }
                        const data = await response.json();
                        setCarouselData(data);
                    } catch (err: any) {
                        setError(err.message);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchCarrousel();
            } else {
                setLoading(false);
            }
        }, [id]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">URL Carousel</h1>
            <Carousel carousel={carouselData} />
        </div>
    );
};

export default CarrouselDisplay;