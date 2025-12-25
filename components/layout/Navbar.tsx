import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { siteSettingsQuery, navigationQuery } from '@/sanity/lib/queries'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavItem {
    _id: string
    title: string
    slug?: { current: string }
    isExternal: boolean
    externalUrl?: string
    order: number
}

interface SiteSettings {
    siteName: string
    logo?: {
        asset: {
            _ref: string
        }
    }
    phone: string
}

export async function Navbar() {
    const [settings, navItems]: [SiteSettings, NavItem[]] = await Promise.all([
        client.fetch(siteSettingsQuery),
        client.fetch(navigationQuery),
    ])

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    {settings?.logo ? (
                        <img
                            src={urlFor(settings.logo).width(150).url()}
                            alt={settings?.siteName || 'Lider Teknik Servis'}
                            className="h-10 w-auto"
                        />
                    ) : (
                        <span className="text-xl font-bold text-primary">
                            {settings?.siteName || 'Lider Teknik Servis'}
                        </span>
                    )}
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems?.map((item) => (
                        <Link
                            key={item._id}
                            href={item.isExternal ? item.externalUrl || '#' : `/${item.slug?.current || ''}`}
                            target={item.isExternal ? '_blank' : undefined}
                            rel={item.isExternal ? 'noopener noreferrer' : undefined}
                            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* Phone Button */}
                {settings?.phone && (
                    <Button asChild className="hidden sm:flex bg-primary hover:bg-primary/90">
                        <a href={`tel:${settings.phone.replace(/\s/g, '')}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            {settings.phone}
                        </a>
                    </Button>
                )}

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2" aria-label="Menü">
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
        </header>
    )
}
