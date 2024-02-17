function requireFromEnv(key: string): string {
  const value = process.env[key];

  if (value == null)
    throw new Error(`Required environment variable does not exist: ${key}.`);

  return value;
}

const BASE_URL = requireFromEnv("BASE_URL");
const STRAPI_HOST = requireFromEnv("STRAPI_HOST");
const STRAPI_TOKEN = requireFromEnv("STRAPI_TOKEN");

export { BASE_URL, STRAPI_HOST, STRAPI_TOKEN };
