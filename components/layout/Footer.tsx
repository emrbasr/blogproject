import Link from 'next/link'
import { client, urlFor } from '@/sanity/lib/client'
import { siteSettingsQuery, footerQuery } from '@/sanity/lib/queries'
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react'

interface FooterSection {
    title: string
    links: Array<{
        title: string
        url: string
    }>
}

interface SocialLink {
    platform: string
    url: string
}

interface FooterData {
    sections: FooterSection[]
    socialLinks: SocialLink[]
    copyrightText: string
}

interface SiteSettings {
    siteName: string
    logo?: {
        asset: {
            _ref: string
        }
    }
    phone: string
    email?: string
    address?: string
}

const socialIcons: Record<string, typeof Facebook> = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    youtube: Youtube,
}

export async function Footer() {
    const [settings, footerData]: [SiteSettings, FooterData] = await Promise.all([
        client.fetch(siteSettingsQuery),
        client.fetch(footerQuery),
    ])

    return (
        <footer className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        {settings?.logo ? (
                            <img
                                src={urlFor(settings.logo).width(150).url()}
                                alt={settings?.siteName || 'Lider Teknik Servis'}
                                className="h-12 w-auto mb-4 brightness-0 invert"
                            />
                        ) : (
                            <h3 className="text-xl font-bold mb-4 text-primary">
                                {settings?.siteName || 'Lider Teknik Servis'}
                            </h3>
                        )}

                        <div className="space-y-3 text-slate-300">
                            {settings?.phone && (
                                <a
                                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                                    className="flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    <Phone className="h-4 w-4" />
                                    {settings.phone}
                                </a>
                            )}
                            {settings?.email && (
                                <a
                                    href={`mailto:${settings.email}`}
                                    className="flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    {settings.email}
                                </a>
                            )}
                            {settings?.address && (
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 mt-1 shrink-0" />
                                    <span>{settings.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dynamic Footer Sections */}
                    {footerData?.sections?.map((section, idx) => (
                        <div key={idx}>
                            <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                            <ul className="space-y-2">
                                {section.links?.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={link.url}
                                            className="text-slate-300 hover:text-primary transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Social Links */}
                    {footerData?.socialLinks && footerData.socialLinks.length > 0 && (
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Bizi Takip Edin</h4>
                            <div className="flex gap-3">
                                {footerData.socialLinks.map((social, idx) => {
                                    const Icon = socialIcons[social.platform] || Facebook
                                    return (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-primary hover:text-white"
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-4">
                    <p className="text-center text-sm text-slate-400">
                        {footerData?.copyrightText || `© ${new Date().getFullYear()} Lider Teknik Servis. Tüm hakları saklıdır.`}
                    </p>
                </div>
            </div>
        </footer>
    )
}
