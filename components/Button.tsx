import Link from 'next/link'
import { clsx } from 'clsx'

type ButtonProps = { href: string; children: React.ReactNode; variant?: 'primary' | 'secondary'; className?: string }
export function Button({ href, children, variant = 'primary', className }: ButtonProps) {
  return (
    <Link href={href} className={clsx('inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition duration-300', variant === 'primary' ? 'bg-champagne text-charcoal hover:bg-ivory' : 'border border-champagne/50 text-ivory hover:bg-ivory/10', className)}>
      {children}
    </Link>
  )
}
