import PostPreview from "@/components/post-preview/post-preview";
import { getPostsWithTag } from "@/strapi-api";
import { notFound } from "next/navigation";
import CurrentTagHighlighter from "./_components/current-tag-highlighter";
import styles from "./page.module.scss";

export default async function Page({
  params: { category, locale },
}: {
  params: { category: string; locale: string };
}) {
  const categoryID = Number.parseInt(category);
  if (Number.isNaN(categoryID)) notFound();

  const posts = await getPostsWithTag(categoryID, locale);

  return (
    <>
      <CurrentTagHighlighter />
      <ul className={styles.list}>
        {posts.map((post) => (
          <PostPreview post={post} key={post.id} />
        ))}
      </ul>
    </>
  );
}
