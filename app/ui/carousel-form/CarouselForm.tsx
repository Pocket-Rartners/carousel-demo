import React, { useState, useEffect } from 'react';
import SlideItem from './SlideItem';
import CarouselName from './CarouselName';
import { Carousel, Slide } from './types';

interface CarouselFormProps {
    initialData?: Carousel;
    onSubmit: (data: Carousel) => Promise<void>;
}

const CarouselForm: React.FC<CarouselFormProps> = ({ initialData, onSubmit }) => {
    const [slides, setSlides] = useState<Slide[]>([{ url: '', transitionType: '', transitionInterval: 0 }]);
    const [name, setName] = useState('');
    const [draggedSlideIndex, setDraggedSlideIndex] = useState<number | null>(null);
    const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setSlides(initialData.slides);
        }
    }, [initialData]);

    const handleDragStart = (index: number) => {
        setDraggedSlideIndex(index);
        setIsDragging(true);
    };

    const handleDragOver = (index: number) => {
        if (draggedSlideIndex === null || draggedSlideIndex === index) return;

        const updatedSlides = [...slides];
        const draggedSlide = updatedSlides[draggedSlideIndex];

        updatedSlides.splice(draggedSlideIndex, 1);
        updatedSlides.splice(index, 0, draggedSlide);

        setSlides(updatedSlides);
        setDraggedSlideIndex(index);
        setDraggedOverIndex(index);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedSlideIndex(null);
        setDraggedOverIndex(null);
    };

    const handleSlideChange = (index: number, field: 'url' | 'transitionType' | 'transitionInterval', value: string) => {
        const newSlides = [...slides];
        newSlides[index][field] = value;
        setSlides(newSlides);
    };

    const addSlideInput = () => {
        setSlides([...slides, { url: '', transitionType: '', transitionInterval: 0 }]);
    };

    const toggleCollapse = (index: number) => {
        const newSlides = [...slides];
        newSlides[index].isCollapsed = !newSlides[index].isCollapsed;
        setSlides(newSlides);
    };

    const handleDeleteSlide = (index: number) => {
        const newSlides = slides.filter((_, i) => i !== index);
        setSlides(newSlides);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData: Carousel = {
            id: initialData ? initialData.id : Date.now().toString(),
            name,
            slides,
        };
        console.log(formData)
        await onSubmit(formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto overflow-auto">
                <h1 className="text-center text-xl font-semibold bg-blue-500 text-white py-2 rounded mb-6">
                    {initialData ? 'Edit Carousel' : 'Create a Carousel'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <CarouselName name={name} setName={setName} />

                    <div className="space-y-4">
                        {slides.map((slideData, index) => (
                            <div
                                key={index}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    handleDragOver(index);
                                }}
                                onDragEnd={handleDragEnd}
                                className={`transition-transform ${
                                    isDragging && draggedOverIndex === index ? 'transform scale-105' : ''
                                }`}
                                style={{
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                <SlideItem
                                    index={index}
                                    slideData={slideData}
                                    handleSlideChange={handleSlideChange}
                                    toggleCollapse={toggleCollapse}
                                    handleDeleteSlide={handleDeleteSlide}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addSlideInput}
                        className="w-full bg-blue-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Add Another Slide
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {initialData ? 'Save' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CarouselForm;
