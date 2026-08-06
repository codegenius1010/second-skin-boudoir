'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageLightboxProps {
  isOpen: boolean
  image: string
  alt: string
  onClose: () => void
}

export function ImageLightbox({ isOpen, image, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative h-[85vh] w-[85vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          sizes="85vw"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          aria-label="Close lightbox"
        >
          <span className="text-2xl leading-none">×</span>
        </button>
      </div>
    </div>
  )
}
