// Site Settings Schema
import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Ayarları',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Adı',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'phone',
            title: 'Telefon Numarası',
            type: 'string',
            description: 'Ana iletişim telefonu',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'whatsapp',
            title: 'WhatsApp Numarası',
            type: 'string',
            description: 'WhatsApp iletişim numarası (ülke kodu ile, örn: 905551234567)',
        }),
        defineField({
            name: 'email',
            title: 'E-posta',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Adres',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'workingHours',
            title: 'Çalışma Saatleri',
            type: 'string',
            description: 'Örn: Pazartesi - Cumartesi: 08:00 - 18:00',
        }),
    ],
    preview: {
        select: {
            title: 'siteName',
            media: 'logo',
        },
    },
})
