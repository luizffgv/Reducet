import { getTags } from "@/strapi-api";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import styles from "./layout.module.scss";
import PostTag from "./_components/post-tag";

export default async function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const t = await getTranslations("Categories");

  const tags = (await getTags(locale)).sort(
    ({ name: lhsName }, { name: rhsName }) =>
      lhsName.localeCompare(rhsName, locale)
  );

  return (
    <>
      <h1 className={styles.title}>{t("title")}</h1>
      <section
        className={styles["category-selector"]}
        aria-label={t("category-selector")}
      >
        <ul id="tags" className={styles["category-selector__categories-list"]}>
          {tags.map((tag) => (
            <li key={tag.id} className={styles["category-container"]}>
              <PostTag name={tag.name} tagID={tag.id} />
            </li>
          ))}
        </ul>
      </section>
      {children}
    </>
  );
}
