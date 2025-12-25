'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './sanity/schemas'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = 'production'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    schema: {
        types: schemaTypes,
    },
    plugins: [
        structureTool(),
        visionTool({ defaultApiVersion: '2024-01-01' }),
    ],
})
