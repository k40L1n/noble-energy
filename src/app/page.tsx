'use client'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

type Slide = {
  _id: string
  title: string
  subtitle: string
  imageUrl: string
  buttonText: string
  buttonLink: string
}

export default function HomePage() {
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [slides, setSlides] = useState<Slide[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  useEffect(() => {
    fetch('/api/sliders')
      .then(res => res.json())
      .then(setSlides)
  }, [])

  useEffect(() => {
    if (!emblaApi) return;
  
    const onSelect = (): void => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
  
    emblaApi.on('select', onSelect);
  
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div className="embla w-full h-full">
        <div className="embla__viewport h-full" ref={viewportRef}>
          <div className="embla__container flex h-full">
            {slides.map((slide) => (
              <div className="embla__slide flex items-center justify-center flex-col text-center px-4" key={slide._id}>
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-auto h-full object-contain mb-4"
                />
                <h2 className="text-white text-3xl font-bold mb-2">{slide.title}</h2>
                <p className="text-white text-lg mb-4">{slide.subtitle}</p>
                <a href={slide.buttonLink || '#'} target="_blank" rel="noopener noreferrer">
                  <button className="bg-white text-black px-4 py-2 rounded">{slide.buttonText}</button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between absolute top-1/2 left-0 right-0 px-4 z-10">
        <button onClick={scrollPrev} className="text-white text-4xl">{'‹'}</button>
        <button onClick={scrollNext} className="text-white text-4xl">{'›'}</button>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full ${index === selectedIndex ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  )
}