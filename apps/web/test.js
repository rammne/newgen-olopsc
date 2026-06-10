import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '6b5ln4gy',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function run() {
  const data = await client.fetch(`*[_type == "scholarshipPage"][0] { scholarshipPrograms }`);
  console.log(JSON.stringify(data, null, 2));
}

run();
