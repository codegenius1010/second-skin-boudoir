'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './Button'
import { ImageLightbox } from './ImageLightbox'

interface PortfolioPreviewProps {
  images: string[]
}

export function PortfolioPreview({ images }: PortfolioPreviewProps) {
  const [shuffled, setShuffled] = useState<string[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    // Shuffle images on client mount
    const shuffledImages = [...images].sort(() => Math.random() - 0.5)
    setShuffled(shuffledImages)
  }, [images])

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    setLightboxOpen(true)
  }

  return (
    <div>
      <div className="mb-12 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shuffled.map((image, idx) => (
          <button
            key={`${image}-${idx}`}
            onClick={() => handleImageClick(image)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-ivory/10 cursor-pointer hover:border-ivory/30 transition-colors"
          >
            <Image
              src={image}
              alt="Portfolio image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <Button href="/boudoir-portfolio">View Full Portfolio</Button>
      </div>
      <ImageLightbox
        isOpen={lightboxOpen}
        image={selectedImage}
        alt="Portfolio image"
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}
