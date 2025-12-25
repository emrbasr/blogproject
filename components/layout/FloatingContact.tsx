import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { Phone, MessageCircle } from 'lucide-react'

interface SiteSettings {
    phone: string
    whatsapp?: string
}

export async function FloatingContact() {
    const settings: SiteSettings = await client.fetch(siteSettingsQuery)

    if (!settings?.phone && !settings?.whatsapp) return null

    return (
        <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
            {/* WhatsApp Button */}
            {settings?.whatsapp && (
                <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
                    aria-label="WhatsApp ile iletişime geç"
                >
                    <MessageCircle className="h-7 w-7" />
                </a>
            )}

            {/* Phone Button */}
            {settings?.phone && (
                <a
                    href={`tel:${settings.phone.replace(/\s/g, '')}`}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
                    aria-label="Telefon ile ara"
                >
                    <Phone className="h-7 w-7" />
                </a>
            )}
        </div>
    )
}
