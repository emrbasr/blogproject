// Category Schema
import { defineType, defineField } from 'sanity'

export const category = defineType({
    name: 'category',
    title: 'Kategoriler',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Kategori Adı',
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
            title: 'Açıklama',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'icon',
            title: 'İkon',
            type: 'string',
            description: 'Lucide icon adı (örn: wrench, refrigerator, flame)',
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
            order: 'order',
        },
        prepare({ title, order }) {
            return {
                title: `${order || 0}. ${title}`,
            }
        },
    },
})
