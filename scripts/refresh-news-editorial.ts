import { db } from '../lib/db';
import { buildEditorial, sanitizeExcerpt } from '../lib/news/editorial';

async function run() {
  const articles = await db.newsArticle.findMany({
    select: { id: true, title: true, excerpt: true }
  });

  let updated = 0;

  for (const article of articles) {
    const editorial = buildEditorial(article.title, sanitizeExcerpt(article.excerpt ?? ''));

    await db.newsArticle.update({
      where: { id: article.id },
      data: {
        summary: editorial.summary,
        whyItMatters: editorial.whyItMatters,
        whoItAffects: editorial.whoItAffects,
        llqpAngle: editorial.llqpAngle
      }
    });

    updated += 1;
  }

  console.log(`Refreshed editorial fields for ${updated} articles.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
