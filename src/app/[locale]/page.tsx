"use server";

import { getRecentPosts } from "@/strapi-api";
import PostPreview from "@/components/post-preview/post-preview";
import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("Home");

  const recentPosts = await getRecentPosts(0, 10, locale);

  return (
    <>
      <h1>{t("title")}</h1>
      <h2>{t("recent")}</h2>
      <ul className={styles["post-list"]}>
        {recentPosts.map((post) => (
          <li className={styles["post-list__entry"]} key={post.id}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
