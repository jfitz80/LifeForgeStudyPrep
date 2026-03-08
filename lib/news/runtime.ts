export function isLiveNewsEnabled() {
  return process.env.NEWS_ENGINE_ENABLED === 'true';
}

export function getNewsModeLabel() {
  return isLiveNewsEnabled() ? 'live' : 'static';
}
