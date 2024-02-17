import { useTranslations } from "next-intl";
import PostComponent from "@/components/post/post";
import { SITE_NAME } from "@/constants";

export default function Page() {
  const t = useTranslations("About");

  return (
    <PostComponent
      title={t("title")}
      content={t("content", { blogName: SITE_NAME })}
    />
  );
}
