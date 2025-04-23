'use client'
import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { getSliders } from '@/queries/getSliders'

type Slide = {
  _id: string
  title: string
  subtitle: string
  imageUrl: string
  buttonText: string
  buttonLink: string
}

export default function HomePage() {
  const [emblaRef] = useEmblaCarousel()
  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    fetch('/api/sliders')
      .then(res => res.json())
      .then(setSlides)
  }, [])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide) => (
          <div className="embla__slide" key={slide._id}>
            <img src={slide.imageUrl} alt={slide.title} />
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <a href={slide.buttonLink || '#'} target="_blank">
              <button>{slide.buttonText}</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}