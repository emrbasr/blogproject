// Navigation Schema
import { defineType, defineField } from 'sanity'

export const navigation = defineType({
    name: 'navigation',
    title: 'Navigasyon',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Menü Başlığı',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Link',
            type: 'slug',
            description: 'Dahili sayfa linki (örn: /hakkimizda)',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'isExternal',
            title: 'Harici Link mi?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'externalUrl',
            title: 'Harici URL',
            type: 'url',
            hidden: ({ document }) => !document?.isExternal,
        }),
        defineField({
            name: 'order',
            title: 'Sıralama',
            type: 'number',
            validation: (Rule) => Rule.required(),
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
                title: `${order}. ${title}`,
            }
        },
    },
})
