import Link from 'next/link'
import { urlFor } from '@/sanity/lib/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

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

interface ServiceCardProps {
    service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
            {/* Image */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                {service.mainImage && (
                    <img
                        src={urlFor(service.mainImage).width(400).height(300).url()}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}
                {service.category && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                        {service.category.title}
                    </span>
                )}
            </div>

            {/* Content */}
            <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    {service.title}
                </h3>
                {service.description && (
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {service.description}
                    </p>
                )}
                <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90">
                    <Link href={`/hizmetler/${service.slug.current}`}>
                        İncele
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
