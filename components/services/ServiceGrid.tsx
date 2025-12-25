import { ServiceCard } from './ServiceCard'

interface Service {
    _id: string
    title: string
    slug: {
        current: string
    }
    description?: string
    mainImage: {
        asset: {
            _ref: string
        }
    }
    category?: {
        title: string
        slug: {
            current: string
        }
    }
}

interface ServiceGridProps {
    services: Service[]
    title?: string
    subtitle?: string
}

export function ServiceGrid({ services, title, subtitle }: ServiceGridProps) {
    if (!services || services.length === 0) {
        return null
    }

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                {(title || subtitle) && (
                    <div className="text-center mb-12">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    )
}
