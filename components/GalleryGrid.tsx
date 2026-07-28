'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { galleryImages } from '@/lib/site'

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function GalleryGrid({ limit }: { limit?: number }) {
  const shuffledImages = useMemo(() => {
    const images = limit ? galleryImages.slice(0, limit) : galleryImages
    return shuffleArray(images)
  }, [limit])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shuffledImages.map((item) => (
          <button
            key={item.image}
            onClick={() => setSelectedImage(item.image)}
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

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-4xl w-full">
            <Image
              src={selectedImage}
              alt="Full size gallery image"
              width={1200}
              height={1600}
              className="h-full w-full object-contain"
              priority
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-ivory hover:bg-black/80 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  )
}
