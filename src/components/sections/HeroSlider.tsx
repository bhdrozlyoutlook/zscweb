'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroSlide } from '@/types';

interface Props {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goTo = useCallback((index: number, dir: 'next' | 'prev') => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next');
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, slides.length, goTo]);

  // Auto-play
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-2xl">
            {/* Subtitle */}
            {slide.subtitle && (
              <p
                className="text-sm uppercase tracking-[0.2em] mb-6 transition-all duration-700"
                style={{ color: '#d1d5db' }}
              >
                {slide.subtitle}
              </p>
            )}

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-6 transition-all duration-700"
              style={{ color: '#ffffff' }}
            >
              {slide.title}
            </h1>

            {/* Divider */}
            <div className="w-16 h-1 mb-6" style={{ backgroundColor: '#ffffff' }} />

            {/* Description */}
            {slide.description && (
              <p
                className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg transition-all duration-700"
                style={{ color: '#d1d5db' }}
              >
                {slide.description}
              </p>
            )}

            {/* Button */}
            {slide.buttonText && slide.buttonLink && (
              <Link
                href={slide.buttonLink}
                className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:gap-5"
                style={{ backgroundColor: '#ffffff', color: '#111827' }}
              >
                {slide.buttonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20 max-w-md">
              <div>
                <div className="text-3xl md:text-4xl font-semibold mb-1" style={{ color: '#ffffff' }}>
                  15<span className="text-xl">+</span>
                </div>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#9ca3af' }}>Yıl Deneyim</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold mb-1" style={{ color: '#ffffff' }}>6</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#9ca3af' }}>Faaliyet Alanı</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold mb-1" style={{ color: '#ffffff' }}>3</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: '#9ca3af' }}>Üniversite</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              className="transition-all duration-300"
              style={{
                width: i === current ? '32px' : '10px',
                height: '10px',
                backgroundColor: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
