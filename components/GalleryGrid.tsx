'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { galleryImages } from '@/lib/site'
import { ImageLightbox } from './ImageLightbox'

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function GalleryGrid({ limit }: { limit?: number }) {
  const [shuffledImages, setShuffledImages] = useState<typeof galleryImages>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const images = limit ? galleryImages.slice(0, limit) : galleryImages
    setShuffledImages(shuffleArray(images))
  }, [limit])

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shuffledImages.map((item, i) => (
          <button
            key={item.image}
            onClick={() => setSelectedIndex(i)}
            className="group relative h-80 overflow-hidden rounded-[1.75rem] border border-ivory/10 bg-smoke cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </button>
        ))}
      </div>

      <ImageLightbox
        isOpen={selectedIndex !== null}
        images={shuffledImages.map((item) => ({ src: item.image, alt: item.alt }))}
        index={selectedIndex ?? 0}
        onClose={() => setSelectedIndex(null)}
        onNavigate={setSelectedIndex}
      />
    </>
  )
}
