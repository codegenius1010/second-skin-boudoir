import Image from 'next/image'
import { galleryImages } from '@/lib/site'

export function GalleryGrid({ limit }: { limit?: number }) {
  const images = limit ? galleryImages.slice(0, limit) : galleryImages
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{images.map((item, i) => <figure key={item.title} className="group overflow-hidden rounded-[1.75rem] border border-ivory/10 bg-smoke">
    <div className="relative h-80"><Image src={item.image} alt={item.alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" /></div>
    <figcaption className="p-5"><p className="text-xs uppercase tracking-[0.25em] text-champagne">{item.category}</p><h3 className="mt-2 font-serif text-xl text-ivory">{item.title}</h3></figcaption>
  </figure>)}</div>
}
