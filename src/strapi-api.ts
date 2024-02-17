import { STRAPI_HOST, STRAPI_TOKEN } from "@/env";
import { Post, PostRaw, Tag, TagRaw } from "@/strapi-types";
import qs from "qs";

/**
 * Fetches a blog {@link Post | post} from Strapi.
 *
 * @param id - Post ID.
 * @param locale - Locale for the posts.
 * @returns Fetched post.
 *
 * @throws {@link Error}
 * Thrown if the post wasn't retrieved successfully.
 */
export async function getPost(id: number, locale: string): Promise<Post> {
  const queryString = qs.stringify({
    locale,
    populate: ["cover", "tags"],
  });

  const res = await fetch(`${STRAPI_HOST}/api/posts/${id}?${queryString}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) throw new Error("Strapi response was not OK.");

  const json = await res.json();

  return new Post(json.data);
}

/**
 * Fetches recent {@link Post | posts} from Strapi.
 *
 * @param start - Number of posts to skip.
 * @param limit - Maximum number of posts to fetch.
 * @param locale - Locale for the posts.
 * @returns Array of posts.
 *
 * @throws {@link Error}
 * Thrown if the posts weren't retrieved successfully.
 */
export async function getRecentPosts(
  start: number,
  limit: number,
  locale: string
): Promise<Post[]> {
  const queryString = qs.stringify({
    locale,
    populate: ["cover", "tags"],
    sort: "date:desc",
    pagination: {
      start,
      limit,
    },
  });

  const res = await fetch(`${STRAPI_HOST}/api/posts?${queryString}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    next: {
      revalidate: 300,
    },
  });

  if (!res.ok) throw new Error("Strapi response was not OK.");

  const json = await res.json();
  const data = json.data as PostRaw[];

  return data.map((postData) => new Post(postData));
}

/**
 * Fetches {@link Post | posts} with a specific tag.
 *
 * @returns Array of matching posts.
 */
export async function getPostsWithTag(
  tagID: number,
  locale: string
): Promise<Post[]> {
  const queryString = qs.stringify({
    locale,
    populate: ["cover", "tags"],
    filters: {
      tags: {
        id: {
          $eq: tagID,
        },
      },
    },
  });

  const res = await fetch(`${STRAPI_HOST}/api/posts?${queryString}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  });

  if (!res.ok) throw new Error("Strapi response was not OK.");

  const json = await res.json();

  const postsRaw = json.data as PostRaw[];

  return postsRaw.map((postRaw) => new Post(postRaw));
}

/**
 * Fetches post {@link Tag | tags} from Strapi.
 *
 * @param locale - Locale for the tags.
 * @returns Array of tags
 */
export async function getTags(locale: string) {
  const queryString = qs.stringify({
    locale,
    populate: "posts",
  });

  const res = await fetch(`${STRAPI_HOST}/api/tags?${queryString}`, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Strapi response was not OK.");

  const json = await res.json();
  const rawTags = json.data as TagRaw[];

  return rawTags.map((rawTag) => new Tag(rawTag));
}
