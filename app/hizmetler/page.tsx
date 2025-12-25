import { client } from '@/sanity/lib/client'
import { servicesQuery, categoriesQuery } from '@/sanity/lib/queries'
import { ServiceGrid } from '@/components/services/ServiceGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hizmetlerimiz | Lider Teknik Servis',
    description: 'Lider Teknik Servis olarak sunduğumuz endüstriyel mutfak teknik servis hizmetleri. Tüm yapılan işlerimizi inceleyin.',
}

export const revalidate = 60

export default async function HizmetlerPage() {
    const [services, categories] = await Promise.all([
        client.fetch(servicesQuery),
        client.fetch(categoriesQuery),
    ])

    return (
        <>
            {/* Hero Section */}
            <section className="bg-slate-900 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Hizmetlerimiz
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Endüstriyel mutfak ekipmanlarında profesyonel teknik servis, bakım ve onarım hizmetleri
                    </p>
                </div>
            </section>

            {/* Categories Filter (if available) */}
            {categories && categories.length > 0 && (
                <section className="py-8 bg-white border-b">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-3">
                            <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
                                Tümü
                            </button>
                            {categories.map((category: any) => (
                                <button
                                    key={category._id}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                                >
                                    {category.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Grid */}
            <ServiceGrid services={services || []} />

            {/* Empty State */}
            {(!services || services.length === 0) && (
                <section className="py-24 text-center">
                    <div className="container mx-auto px-4">
                        <p className="text-xl text-slate-500">
                            Henüz hizmet eklenmemiş. Lütfen daha sonra tekrar kontrol edin.
                        </p>
                    </div>
                </section>
            )}
        </>
    )
}
