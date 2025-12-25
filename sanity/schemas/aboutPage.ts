// About Page Schema
import { defineType, defineField, defineArrayMember } from 'sanity'

export const aboutPage = defineType({
    name: 'aboutPage',
    title: 'Hakkımızda Sayfası',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Sayfa Başlığı',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroImage',
            title: 'Kapak Görseli',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'content',
            title: 'İçerik',
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
            name: 'mission',
            title: 'Misyon',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'vision',
            title: 'Vizyon',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'values',
            title: 'Değerlerimiz',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'value',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Başlık',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Açıklama',
                            type: 'text',
                            rows: 2,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                        },
                    },
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Hakkımızda Sayfası',
            }
        },
    },
})
