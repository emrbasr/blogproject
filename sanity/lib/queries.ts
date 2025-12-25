// GROQ Queries for Sanity data fetching
import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  logo,
  phone,
  whatsapp,
  email,
  address,
  workingHours
}`

// Navigation
export const navigationQuery = groq`*[_type == "navigation"] | order(order asc){
  _id,
  title,
  slug,
  isExternal,
  externalUrl,
  order
}`

// Footer
export const footerQuery = groq`*[_type == "footer"][0]{
  sections[]{
    title,
    links[]{
      title,
      url
    }
  },
  socialLinks[]{
    platform,
    url
  },
  copyrightText
}`

// Home Page
export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroSlides[]{
    title,
    subtitle,
    image,
    ctaText,
    ctaLink
  },
  servicesTitle,
  servicesSubtitle
}`

// About Page
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  title,
  heroImage,
  content,
  mission,
  vision,
  values[]{
    title,
    description
  }
}`

// All Services
export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  slug,
  description,
  mainImage,
  featured,
  category->{
    title,
    slug
  }
}`

// Featured Services
export const featuredServicesQuery = groq`*[_type == "service" && featured == true] | order(order asc){
  _id,
  title,
  slug,
  description,
  mainImage,
  category->{
    title,
    slug
  }
}`

// Single Service by Slug
export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  content,
  mainImage,
  gallery,
  category->{
    title,
    slug
  }
}`

// All Categories
export const categoriesQuery = groq`*[_type == "category"] | order(order asc){
  _id,
  title,
  slug,
  description,
  icon,
  order
}`
