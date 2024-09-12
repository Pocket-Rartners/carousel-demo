import Carrousel from "@/app/ui/carrousel";
import UrlCarousel from "@/app/ui/carrousel";

const Home: React.FC = () => {
    const urls: string[] = [
        '/page1',
        '/page2',
        '/page3',
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">URL Carousel</h1>
            <UrlCarousel urls={urls} interval={5000} />
        </div>
    );
};

export default Home;
