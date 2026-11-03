'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageLightbox } from '@/components/ImageLightbox'

const images = [
  { image: '/images/boudoir/LH-126.jpg', alt: 'Playful editorial boudoir portrait', position: 'object-top' },
  { image: '/images/boudoir/BH-40.jpg', alt: 'Confident, relaxed boudoir portrait', position: 'object-center' },
  { image: '/images/boudoir/DG-88.jpg', alt: 'Elegant boudoir portrait in soft styling', position: 'object-center' },
  { image: '/images/boudoir/LM-002.jpg', alt: 'Confident full-length boudoir portrait in a lace slip', position: 'object-center' },
  { image: '/images/boudoir/VK-38.jpg', alt: 'Relaxed, empowered boudoir portrait', position: 'object-center' },
  { image: '/images/boudoir/YM-26.jpg', alt: 'Artistic boudoir portrait wrapped in soft fabric', position: 'object-center' },
]

export function BFGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item, i) => (
          <button
            key={item.image}
            onClick={() => setSelectedIndex(i)}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-bfGold/15 bg-bfCharcoal"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className={`object-cover transition duration-700 group-hover:scale-105 ${item.position}`}
              sizes="(min-width: 1024px) 33vw, 50vw"
            />
          </button>
        ))}
      </div>
      <ImageLightbox
        isOpen={selectedIndex !== null}
        images={images.map((item) => ({ src: item.image, alt: item.alt }))}
        index={selectedIndex ?? 0}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </>
  )
}
