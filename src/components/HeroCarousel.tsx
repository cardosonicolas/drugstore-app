"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  bannerImage?: string;
}

interface HeroCarouselProps {
  products: Product[];
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full group">
      {/* Carousel Container - Responsive Heights (Compact Banner) */}
      <div className="w-full h-[180px] md:h-[200px] lg:h-[160px] relative overflow-hidden">
        {/* Image */}
        <div
          style={{
            backgroundImage: `url(${
              products[currentIndex].bannerImage || products[currentIndex].image
            })`,
          }}
          className="w-full h-full bg-center bg-cover duration-500 transition-all ease-in-out"
        >
          {/* Overlay Gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-center lg:justify-end p-6 mt-10 md:p-8 lg:p-6">
            <div className="max-w-7xl mx-auto w-full">
              <span className="inline-block px-2 py-0.5 mb-1 text-[10px] md:text-xs font-semibold tracking-wider text-white uppercase bg-blue-600 rounded-full w-fit">
                Nuevo Ingreso
              </span>
              <h2 className="text-xl md:text-2xl lg:text-2xl font-bold text-white drop-shadow-lg">
                {products[currentIndex].name}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 hover:bg-black/40 text-white cursor-pointer transition-colors">
        <button onClick={prevSlide} aria-label="Previous slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 hover:bg-black/40 text-white cursor-pointer transition-colors">
        <button onClick={nextSlide} aria-label="Next slide">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {products.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`transition-all duration-300 cursor-pointer rounded-full ${
              currentIndex === slideIndex
                ? "bg-white w-8 h-2"
                : "bg-white/50 w-2 h-2 hover:bg-white/80"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
