'use client'

import { useState, useEffect } from 'react'
import { urlFor } from '@/sanity/lib/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroSlide {
    title: string
    subtitle: string
    image: {
        asset: {
            _ref: string
        }
    }
    ctaText: string
    ctaLink: string
}

interface HeroSliderProps {
    slides: HeroSlide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        if (slides?.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length)
            }, 5000)
            return () => clearInterval(timer)
        }
    }, [slides?.length])

    if (!slides || slides.length === 0) {
        return (
            <div className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Lider Teknik Servis
                    </h1>
                    <p className="text-xl text-slate-300">
                        Endüstriyel Mutfak Teknik Servis Hizmetleri
                    </p>
                </div>
            </div>
        )
    }

    const goToSlide = (index: number) => setCurrentSlide(index)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)

    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image */}
                    {slide.image && (
                        <img
                            src={urlFor(slide.image).width(1920).height(800).url()}
                            alt={slide.title || ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="container mx-auto px-4 text-center text-white">
                            {slide.title && (
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                                    {slide.title}
                                </h1>
                            )}
                            {slide.subtitle && (
                                <p className="text-lg md:text-xl lg:text-2xl mb-8 text-slate-200 max-w-2xl mx-auto">
                                    {slide.subtitle}
                                </p>
                            )}
                            {slide.ctaText && slide.ctaLink && (
                                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                    <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition-colors"
                        aria-label="Önceki"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white transition-colors"
                        aria-label="Sonraki"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </>
            )}

            {/* Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full transition-colors ${index === currentSlide ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
