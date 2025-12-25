
// Service/Work Portfolio Schema
import { defineType, defineField, defineArrayMember } from 'sanity'

export const service = defineType({
    name: 'service',
    title: 'Hizmetler / Yapılan İşler',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Kısa Açıklama',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'mainImage',
            title: 'Ana Görsel',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Detaylı İçerik',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                }),
                defineArrayMember({
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                }),
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Galeri',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                }),
            ],
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
        defineField({
            name: 'featured',
            title: 'Öne Çıkan',
            type: 'boolean',
            initialValue: false,
            description: 'Ana sayfada gösterilsin mi?',
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
        }),
    ],
    orderings: [
        {
            title: 'Sıralama',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            category: 'category.title',
        },
        prepare({ title, media, category }) {
            return {
                title,
                subtitle: category,
                media,
            }
        },
    },
})
