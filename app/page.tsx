"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
export default function Home() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/carousels");
        if (!response.ok) {
          throw new Error("Failed to fetch carousels");
        }
        const data = await response.json();
        setCarousels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  const handleDelete = (id) => {
    setCarousels(carousels.filter((carousel) => carousel.id !== id));
  };


  const handleEdit = (id) => {
    console.log(`Redirect to edit carousel ${id}...`);
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex justify-center items-center text-red-500">Error: {error}</div>;
  }

  return (
      <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-700">Your Carousels</h1>
            <Link href="/config/new">
              <button
                  className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <PlusIcon className="w-5 h-5 mr-2"/>
                Create New
              </button>
            </Link>
          </div>

          {/* Carousel List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carousels.length > 0 ? (
                carousels.map((carousel) => (
                    <div
                        key={carousel.id}
                        className="bg-white p-4 shadow rounded-lg flex flex-col justify-between"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{carousel.name}</h2>
                        <p className="text-gray-500">Slides: {carousel.slides}</p>
                        <p className="text-gray-400 text-sm">Created: {carousel.createdAt}</p>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <Link href={`/config/${carousel.id}`} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                          <button
                              onClick={() => handleEdit(carousel.id)}
                              className="text-blue-500 hover:text-blue-700 focus:outline-none"
                          >
                            <PencilIcon className="w-5 h-5"/>
                          </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(carousel.id)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 col-span-full text-center">No carousels found. Create a new one!</p>
            )}
          </div>
        </div>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
