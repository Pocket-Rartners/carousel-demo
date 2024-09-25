import UrlCarousel from "@/app/ui/Carousel";

const CarrouselDisplay: React.FC = () => {
    const urls = [
        "https://www.weather.gov/",
        "https://www.nyse.com/index"
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">URL Carousel</h1>
            <UrlCarousel urls={urls} interval={5000} />
        </div>
    );
};

export default CarrouselDisplay;
