import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Categories");

  return <p>{t("select-prompt")}</p>;
}
