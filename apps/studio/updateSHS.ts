import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const trackClusters = {
    _type: 'object',
    title: 'Specialized SHS Tracks',
    clusters: [
        {
            _type: 'object',
            _key: 'academic',
            name: 'Academic Track Clusters',
            tracks: [
                'ASH (Arts, Social Science, and Humanities)',
                'BE (Business and Entrepreneurship)',
                'STEM (Science, Technology, Engineering, and Mathematics)',
            ],
        },
        {
            _type: 'object',
            _key: 'techpro',
            name: 'TECHPRO Track Clusters',
            tracks: [
                'ICT (Information and Communication Technology)',
                'Family and Consumer Science',
            ],
        },
    ],
}

async function run() {
    console.log('Updating Senior High School document...')

    try {
        await client
            .patch('senior-high-school')
            .set({ trackClusters })
            // Optionally unset the generic curriculum highlights if they are redundant now.
            // But we can leave them or just set them to empty to avoid duplicate display.
            // Actually the TrackClusters component is rendered entirely separately.
            .commit()

        console.log('✅ Updated Senior High School curriculum with Track Clusters.')
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`❌ Failed to update:`, error.message)
        } else {
            console.error(`❌ Failed to update:`, error)
        }
    }
}

run()
