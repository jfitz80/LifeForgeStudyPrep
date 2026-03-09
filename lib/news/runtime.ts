export function isLiveNewsEnabled() {
  return process.env.NEWS_ENGINE_ENABLED === 'true';
}

export function getNewsModeLabel() {
  return isLiveNewsEnabled() ? 'live' : 'static';
}

export function hasBearerSecret(request: Request, secret: string) {
  const auth = request.headers.get('authorization');
  const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  return bearer === secret;
}

export function hasIngestTokenHeader(request: Request, secret: string) {
  return request.headers.get('x-ingest-token') === secret;
}

export function isIngestAuthorized(request: Request) {
  const secret = process.env.NEWS_INGEST_TOKEN;
  if (!secret) return false;

  return hasIngestTokenHeader(request, secret) || hasBearerSecret(request, secret);
}

export function isCronAuthorized(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && hasBearerSecret(request, cronSecret)) {
    return true;
  }

  // Fallback for manual testing or shared token setup.
  return isIngestAuthorized(request);
}
