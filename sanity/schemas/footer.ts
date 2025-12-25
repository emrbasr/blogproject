// Footer Schema
import { defineType, defineField, defineArrayMember } from 'sanity'

export const footer = defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'sections',
            title: 'Footer Bölümleri',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'footerSection',
                    title: 'Bölüm',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Bölüm Başlığı',
                            type: 'string',
                        }),
                        defineField({
                            name: 'links',
                            title: 'Linkler',
                            type: 'array',
                            of: [
                                defineArrayMember({
                                    type: 'object',
                                    name: 'link',
                                    fields: [
                                        defineField({
                                            name: 'title',
                                            title: 'Link Başlığı',
                                            type: 'string',
                                        }),
                                        defineField({
                                            name: 'url',
                                            title: 'URL',
                                            type: 'string',
                                        }),
                                    ],
                                }),
                            ],
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
        defineField({
            name: 'socialLinks',
            title: 'Sosyal Medya Linkleri',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'socialLink',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Facebook', value: 'facebook' },
                                    { title: 'Instagram', value: 'instagram' },
                                    { title: 'Twitter', value: 'twitter' },
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'YouTube', value: 'youtube' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'platform',
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'copyrightText',
            title: 'Copyright Metni',
            type: 'string',
            description: 'Örn: © 2024 Lider Teknik Servis. Tüm hakları saklıdır.',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Footer Ayarları',
            }
        },
    },
})
