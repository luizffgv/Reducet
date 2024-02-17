import { getPost } from "@/strapi-api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BASE_URL } from "@/env";
import PostComponent from "@/components/post/post";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; post: string };
}): Promise<Metadata> {
  const id = Number.parseInt(params.post);
  if (Number.isNaN(id)) throw new Error("Invalid post ID.");

  const post = await getPost(id, params.locale);

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      type: "article",
      publishedTime: post.date.toISOString(),
      images: post.cover?.url,
      url: `${BASE_URL}/posts/${post.id}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { locale: string; post: string };
}) {
  const id = Number.parseInt(params.post);
  if (Number.isNaN(id)) notFound();

  const post = await getPost(id, params.locale).catch(() => notFound());

  return (
    <>
      <PostComponent post={post} />
    </>
  );
}
