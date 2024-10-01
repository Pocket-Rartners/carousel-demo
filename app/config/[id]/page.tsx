"use client";
import CarrouselForm from "@/app/ui/carousel-form/CarouselForm";
import BackButton from "@/app/ui/carousel-form/BackButton";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Slide {
    url: string;
    transitionType: string;
    transitionInterval: number;
}
interface Carousel {
    id: string;
    name: string;
    slides: Slide[];
}

const Config: React.FC<{ params: { id: string } }> = ({ params }) => {
    const router = useRouter();
    const id = params.id;
    const [carrouselData, setCarrouselData] = useState<Carousel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id && id !== 'new') {
            const fetchCarrousel = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/carousel/${id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch carousels");
                    }
                    const data = await response.json();
                    setCarrouselData(data);
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

    const handleSave = async (data: Carousel) => {
        const method = id && id !== 'new' ? 'PUT' : 'POST';
        const url = id && id !== 'new' ? `/api/carousels/${id}` : `/api/carousels`;

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="">
            <BackButton />
            <CarrouselForm initialData={carrouselData} onSubmit={handleSave} />
        </div>
    );
};

export default Config;
