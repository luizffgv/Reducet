import { STRAPI_HOST } from "@/env";

/**
 * Fetches a media upload from CMS.
 *
 * @param _request - Unused.
 * @param parameters - Parameters containing media file name.
 * @returns Forwarded response from CMS.
 */
export async function GET(
  _request: Request,
  { params: { file } }: { params: { file: string } }
) {
  return await fetch(`${STRAPI_HOST}/uploads/${file}`);
}
