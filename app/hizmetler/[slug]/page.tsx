import { client, urlFor } from '@/sanity/lib/client'
import { serviceBySlugQuery, servicesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const revalidate = 60

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const service = await client.fetch(serviceBySlugQuery, { slug })

    if (!service) {
        return { title: 'Hizmet Bulunamadı' }
    }

    return {
        title: `${service.title} | Lider Teknik Servis`,
        description: service.description || `${service.title} - Lider Teknik Servis`,
    }
}

export async function generateStaticParams() {
    const services = await client.fetch(servicesQuery)
    return services?.map((service: any) => ({
        slug: service.slug.current,
    })) || []
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const [service, settings, allServices] = await Promise.all([
        client.fetch(serviceBySlugQuery, { slug }),
        client.fetch(siteSettingsQuery),
        client.fetch(servicesQuery),
    ])

    if (!service) {
        notFound()
    }

    // Find prev/next services
    const currentIndex = allServices?.findIndex((s: any) => s.slug.current === slug) ?? -1
    const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null
    const nextService = currentIndex < (allServices?.length || 0) - 1 ? allServices[currentIndex + 1] : null

    return (
        <>
            {/* Breadcrumb */}
            <section className="bg-slate-100 py-4">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-sm text-slate-600">
                        <Link href="/" className="hover:text-primary">Anasayfa</Link>
                        <span>/</span>
                        <Link href="/hizmetler" className="hover:text-primary">Hizmetler</Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium">{service.title}</span>
                    </nav>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Image & Gallery */}
                        <div className="lg:col-span-2">
                            {/* Main Image */}
                            {service.mainImage && (
                                <div className="rounded-lg overflow-hidden mb-6">
                                    <img
                                        src={urlFor(service.mainImage).width(800).height(500).url()}
                                        alt={service.title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {/* Title & Description */}
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {service.title}
                            </h1>

                            {service.category && (
                                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
                                    {service.category.title}
                                </span>
                            )}

                            {/* Rich Content */}
                            {service.content ? (
                                <div className="prose prose-lg prose-slate max-w-none mb-8">
                                    <PortableText value={service.content} />
                                </div>
                            ) : (
                                service.description && (
                                    <p className="text-lg text-slate-600 mb-8">{service.description}</p>
                                )
                            )}

                            {/* Gallery */}
                            {service.gallery && service.gallery.length > 0 && (
                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Galeri</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {service.gallery.map((image: any, index: number) => (
                                            <div key={index} className="rounded-lg overflow-hidden aspect-square">
                                                <img
                                                    src={urlFor(image).width(300).height(300).url()}
                                                    alt={`${service.title} - Görsel ${index + 1}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Contact Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-50 rounded-lg p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">
                                    İletişime Geçin
                                </h3>
                                <p className="text-slate-600 mb-6">
                                    Bu hizmet hakkında bilgi almak için bizimle iletişime geçin.
                                </p>

                                <div className="space-y-3">
                                    {settings?.phone && (
                                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                                            <a href={`tel:${settings.phone.replace(/\s/g, '')}`}>
                                                <Phone className="mr-2 h-5 w-5" />
                                                {settings.phone}
                                            </a>
                                        </Button>
                                    )}

                                    {settings?.whatsapp && (
                                        <Button asChild variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                                            <a
                                                href={`https://wa.me/${settings.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <MessageCircle className="mr-2 h-5 w-5" />
                                                WhatsApp
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prev/Next Navigation */}
            {(prevService || nextService) && (
                <section className="py-8 border-t bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between">
                            {prevService ? (
                                <Link
                                    href={`/hizmetler/${prevService.slug.current}`}
                                    className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    <span className="hidden sm:inline">{prevService.title}</span>
                                    <span className="sm:hidden">Önceki</span>
                                </Link>
                            ) : (
                                <div />
                            )}

                            {nextService ? (
                                <Link
                                    href={`/hizmetler/${nextService.slug.current}`}
                                    className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
                                >
                                    <span className="hidden sm:inline">{nextService.title}</span>
                                    <span className="sm:hidden">Sonraki</span>
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
