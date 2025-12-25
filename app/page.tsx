import { client } from '@/sanity/lib/client'
import { homePageQuery, featuredServicesQuery, servicesQuery } from '@/sanity/lib/queries'
import { HeroSlider } from '@/components/home/HeroSlider'
import { ServiceGrid } from '@/components/services/ServiceGrid'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const [homePage, services] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(servicesQuery),
  ])

  // Use featured services if available, otherwise show all
  const featuredServices = await client.fetch(featuredServicesQuery)
  const displayServices = featuredServices?.length > 0 ? featuredServices : services?.slice(0, 8)

  return (
    <>
      {/* Hero Section */}
      <HeroSlider slides={homePage?.heroSlides || []} />

      {/* Services Section */}
      <ServiceGrid
        services={displayServices || []}
        title={homePage?.servicesTitle || 'Yapılan İşlerimiz'}
        subtitle={homePage?.servicesSubtitle || 'Endüstriyel mutfak ekipmanlarında profesyonel teknik servis hizmetleri sunuyoruz.'}
      />

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Teknik Servis Hizmeti mi Arıyorsunuz?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Endüstriyel mutfak ekipmanlarınız için profesyonel teknik servis hizmeti sunuyoruz.
            Hemen arayın, size yardımcı olalım.
          </p>
          <a
            href="tel:+905551234567"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Hemen Arayın
          </a>
        </div>
      </section>
    </>
  )
}
