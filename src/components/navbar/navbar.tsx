"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { useState } from "react";
import { SITE_NAME } from "@/constants";
import { useTranslations } from "use-intl";

export default function Navbar() {
  const [expanded, setHamburgerExpanded] = useState(false);
  const t = useTranslations("Navbar");

  const toggleHamburger = () => {
    setHamburgerExpanded(!expanded);
  };

  const locale = usePathname().split("/")[1];

  return (
    <>
      <a className={`${styles.skip}`} href="#main">
        {t("skip-link")}
      </a>
      <nav className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.left}>
            <span className={styles.name}>{SITE_NAME}</span>
            <div id="navbar-links" className={styles.links}>
              <Link
                href={`/${locale}`}
                onClick={() => setHamburgerExpanded(false)}
              >
                {t("home")}
              </Link>
              <Link
                href={`/${locale}/categories`}
                onClick={() => setHamburgerExpanded(false)}
              >
                {t("categories")}
              </Link>
              <Link
                href={`/${locale}/about`}
                onClick={() => setHamburgerExpanded(false)}
              >
                {t("about")}
              </Link>
            </div>
          </div>
          <button
            id="navbar-expand-button"
            className={styles.hamburger}
            type="button"
            onClick={toggleHamburger}
            aria-haspopup="true"
            aria-controls="navbar-links"
            aria-expanded={expanded}
            aria-label={t("toggle-fullscreen-navbar")}
          >
            <span className="material-symbols-outlined">
              {expanded ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
