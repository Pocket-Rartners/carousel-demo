// CarouselName.tsx
import React from 'react';

interface CarouselNameProps {
    name: string;
    setName: (name: string) => void;
}

const CarouselName: React.FC<CarouselNameProps> = ({ name, setName }) => {
    return (
        <div className="space-y-2 p-4 bg-blue-100 rounded transition-transform duration-300">
            <label className="block text-gray-700 font-medium">Carousel Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter carousel name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
        </div>
    );
};

export default CarouselName;
