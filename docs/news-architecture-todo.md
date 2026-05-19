# News Architecture TODO

Recommended future news flow:

1. RSS/news source/API intake
2. Protected cron route
3. Draft digest generation
4. Save to Neon/Postgres through Prisma
5. Admin review
6. Publish approved items to `/news`
7. Optional newsletter draft

Do not auto-publish scraped or syndicated news without review. LifeForgePrep news should remain educational commentary that connects industry developments to life insurance learning, LLQP concepts, professional conduct, and practical study actions.

Suggested `news_items` table:

- `id`
- `title`
- `slug`
- `category`
- `summary`
- `why_it_matters`
- `exam_connection`
- `source_name`
- `source_url`
- `published_at`
- `status`: `draft | published | archived`
- `created_at`
- `updated_at`

Current implementation note:

- The visible `/news` page uses a safe weekly static fallback.
- If `NEWS_ENGINE_ENABLED=true` and `DATABASE_URL` is configured, `lib/news/published.ts` can pull approved Prisma `NewsArticle` records and fall back to `data/weeklyNews.ts` if the database query fails.
