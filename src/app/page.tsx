'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const images = [
    '/ecoradar-slide-eat (1)_page-0001.jpg',
    '/ecoradar-slide-eat (1)_page-0002.jpg',
    '/ecoradar-slide-eat (1)_page-0003.jpg',
    '/ecoradar-slide-eat (1)_page-0004.jpg',
    '/ecoradar-slide-eat (1)_page-0005.jpg',
    '/ecoradar-slide-eat (1)_page-0006.jpg',
    '/ecoradar-slide-eat (1)_page-0007.jpg',
    '/ecoradar-slide-eat (1)_page-0008.jpg',
    '/ecoradar-slide-eat (1)_page-0009.jpg',
    '/ecoradar-slide-eat (1)_page-0010.jpg',
    '/ecoradar-slide-eat (1)_page-0011.jpg',
    '/ecoradar-slide-eat (1)_page-0012.jpg',
    '/ecoradar-slide-eat (1)_page-0013.jpg',
    '/ecoradar-slide-eat (1)_page-0014.jpg',
    '/ecoradar-slide-eat (1)_page-0015.jpg',
    '/ecoradar-slide-eat (1)_page-0016.jpg',
    '/ecoradar-slide-eat (1)_page-0017.jpg',
    '/ecoradar-slide-eat (1)_page-0018.jpg',
    '/ecoradar-slide-eat (1)_page-0019.jpg',
    '/ecoradar-slide-eat (1)_page-0020.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 9000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  // Função para avançar
  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    startTimer();
  };

  // Função para voltar
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    startTimer();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full relative">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-contain"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentIndex === index
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}