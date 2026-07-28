import Image from 'next/image'

interface TestimonialProps {
  quote: string
  author: string
  image: string
  imageAlt?: string
}

export function Testimonial({ quote, author, image, imageAlt = 'Client testimonial' }: TestimonialProps) {
  return (
    <div className="rounded-[2rem] border border-ivory/10 bg-gradient-to-br from-rose/15 to-champagne/10 p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="relative h-64 w-64 mx-auto md:mx-0 rounded-2xl overflow-hidden border border-ivory/20">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
        <div>
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-champagne text-lg">★</span>
            ))}
          </div>
          <blockquote className="font-serif text-xl leading-8 text-ivory mb-6">
            "{quote}"
          </blockquote>
          <p className="text-lg font-semibold text-champagne">— {author}</p>
        </div>
      </div>
    </div>
  )
}
