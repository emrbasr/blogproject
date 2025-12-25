import { client, urlFor } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Metadata } from 'next'
import { Target, Eye, Star } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Hakkımızda | Lider Teknik Servis',
    description: 'Lider Teknik Servis hakkında bilgi edinin. Endüstriyel mutfak alanında uzman teknik servis ekibimizle tanışın.',
}

export const revalidate = 60

interface AboutPage {
    title: string
    heroImage?: {
        asset: {
            _ref: string
        }
    }
    content: any[]
    mission?: string
    vision?: string
    values?: Array<{
        title: string
        description: string
    }>
}

export default async function HakkimizdaPage() {
    const aboutPage: AboutPage = await client.fetch(aboutPageQuery)

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[300px] md:h-[400px] bg-slate-900">
                {aboutPage?.heroImage && (
                    <img
                        src={urlFor(aboutPage.heroImage).width(1920).height(600).url()}
                        alt={aboutPage.title || 'Hakkımızda'}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        {aboutPage?.title || 'Hakkımızda'}
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {aboutPage?.content && (
                            <div className="prose prose-lg prose-slate max-w-none">
                                <PortableText value={aboutPage.content} />
                            </div>
                        )}

                        {!aboutPage?.content && (
                            <div className="text-center text-slate-600">
                                <p className="text-lg">
                                    Lider Teknik Servis olarak, endüstriyel mutfak sektöründe üstün kaliteli teknik servis hizmeti sunuyoruz.
                                    Deneyimli ekibimiz ve profesyonel yaklaşımımızla müşterilerimizin her türlü ihtiyacına çözüm üretiyoruz.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            {(aboutPage?.mission || aboutPage?.vision) && (
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {aboutPage?.mission && (
                                <div className="bg-white p-8 rounded-lg shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            <Target className="h-6 w-6 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">Misyonumuz</h2>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{aboutPage.mission}</p>
                                </div>
                            )}

                            {aboutPage?.vision && (
                                <div className="bg-white p-8 rounded-lg shadow-md">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                            <Eye className="h-6 w-6 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">Vizyonumuz</h2>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{aboutPage.vision}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Values */}
            {aboutPage?.values && aboutPage.values.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
                            Değerlerimiz
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {aboutPage.values.map((value, index) => (
                                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Star className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                                    </div>
                                    <p className="text-slate-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
