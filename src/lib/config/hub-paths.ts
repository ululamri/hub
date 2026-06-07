import { base } from '$app/paths';

const DEFAULT_SPARK_URL = 'https://spark.user.cloudjkt01.com';

export const sparkAppUrl = import.meta.env.PUBLIC_SPARK_APP_URL || DEFAULT_SPARK_URL;

export function hubPath(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return base || '/';
  return `${base}${normalized}`;
}

export function hubHref(path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;

  const [rawPath, hash] = path.split('#');
  const route = rawPath || '/';
  return `${hubPath(route)}${hash ? `#${hash}` : ''}`;
}
