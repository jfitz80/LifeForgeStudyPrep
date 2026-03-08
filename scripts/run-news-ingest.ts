import { ingestNewsJob } from '../lib/news/ingest';

async function run() {
  const result = await ingestNewsJob();

  if (!result.ok) {
    console.error('News ingest failed:', result);
    process.exit(1);
  }

  console.log('News ingest complete:', result);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
