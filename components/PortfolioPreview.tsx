'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from './Button'

interface PortfolioPreviewProps {
  images: string[]
}

export function PortfolioPreview({ images }: PortfolioPreviewProps) {
  const [shuffled, setShuffled] = useState<string[]>([])

  useEffect(() => {
    // Shuffle images on client mount
    const shuffledImages = [...images].sort(() => Math.random() - 0.5)
    setShuffled(shuffledImages)
  }, [images])

  return (
    <div>
      <div className="mb-12 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shuffled.map((image, idx) => (
          <div key={`${image}-${idx}`} className="group relative aspect-square overflow-hidden rounded-xl border border-ivory/10">
            <Image
              src={image}
              alt="Portfolio image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button href="/boudoir-portfolio">View Full Portfolio</Button>
      </div>
    </div>
  )
}
