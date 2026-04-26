'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ImageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const images = [
    { src: '/mvp.png', alt: 'MVP' },
    { src: '/evp.png', alt: 'EVP' },
  ];

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setCurrentImageIndex(0);
        }}
        className="btn-primary mt-4 inline-flex px-5 py-2.5 text-sm"
      >
        View Our Process
      </button>

      {isOpen && isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black w-screen h-screen overflow-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsFullScreen(false)}
            className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-white hover:bg-slate-200 rounded-full text-black font-bold text-xl"
          >
            ✕
          </button>

          {/* Image Display */}
          <div className="relative w-screen h-screen flex items-center justify-center">
            <Image
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation Controls */}
          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-8 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
            <button
              onClick={handlePrev}
              className="px-6 py-3 bg-white hover:bg-blue-500 hover:text-white text-black rounded-lg font-semibold transition-all"
            >
              ← Previous
            </button>

            <div className="text-white font-bold text-2xl">
              {currentImageIndex + 1} / {images.length}
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-white hover:bg-blue-500 hover:text-white text-black rounded-lg font-semibold transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {isOpen && !isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-slate-300 hover:bg-slate-400 rounded-full text-slate-900 font-bold text-lg"
            >
              ✕
            </button>

            {/* Expand Button */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="absolute top-6 left-6 z-10 w-10 h-10 flex items-center justify-center bg-slate-300 hover:bg-slate-400 rounded-full text-slate-900 font-bold text-lg"
              title="Full Screen"
            >
              ⛶
            </button>

            {/* Image Display */}
            <div className="relative w-full bg-slate-100 cursor-pointer mt-2" onClick={handleNext}>
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                width={1000}
                height={700}
                className="w-full h-auto block"
                priority
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 p-6 bg-white rounded-b-lg border-t border-slate-200">
              <button
                onClick={handlePrev}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-black rounded-lg font-semibold transition-all"
              >
                ← Previous
              </button>

              <div className="text-slate-700 font-bold text-lg min-w-[80px] text-center">
                {currentImageIndex + 1} / {images.length}
              </div>

              <button
                onClick={handleNext}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-black rounded-lg font-semibold transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
