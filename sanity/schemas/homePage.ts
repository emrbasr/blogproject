// Home Page Schema
import { defineType, defineField, defineArrayMember } from 'sanity'

export const homePage = defineType({
    name: 'homePage',
    title: 'Ana Sayfa',
    type: 'document',
    fields: [
        defineField({
            name: 'heroSlides',
            title: 'Hero Slider',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'heroSlide',
                    title: 'Slide',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Başlık',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: 'Alt Başlık',
                            type: 'string',
                        }),
                        defineField({
                            name: 'image',
                            title: 'Görsel',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: 'ctaText',
                            title: 'Buton Metni',
                            type: 'string',
                        }),
                        defineField({
                            name: 'ctaLink',
                            title: 'Buton Linki',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            media: 'image',
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'servicesTitle',
            title: 'Hizmetler Bölüm Başlığı',
            type: 'string',
            description: 'Örn: Yapılan İşlerimiz',
        }),
        defineField({
            name: 'servicesSubtitle',
            title: 'Hizmetler Alt Başlık',
            type: 'text',
            rows: 2,
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Ana Sayfa İçeriği',
            }
        },
    },
})
