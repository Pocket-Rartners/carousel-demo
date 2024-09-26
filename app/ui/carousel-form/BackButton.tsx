// components/BackButton.js
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/solid';

const BackButton = () => {
    return (
        <Link href="/" passHref>
            <button className="absolute top-4 left-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Back</span>
            </button>
        </Link>
    );
};

export default BackButton;
