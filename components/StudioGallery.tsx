'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageLightbox } from './ImageLightbox'
import { studioImages } from '@/lib/site'

export function StudioGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selected, setSelected] = useState<{ image: string; alt: string } | null>(null)

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {studioImages.map((item) => (
          <button
            key={item.image}
            onClick={() => {
              setSelected(item)
              setLightboxOpen(true)
            }}
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
        isOpen={lightboxOpen}
        image={selected?.image || ''}
        alt={selected?.alt || 'Studio image'}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}
