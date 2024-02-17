import { Post } from "@/strapi-types";
import Link from "next/link";
import styles from "./styles.module.scss";
import { useFormatter, useTranslations } from "next-intl";
import { ReactElement, useId } from "react";

/** A string representing an RGBA color. */
type RGBAString = `rgba(${number}, ${number}, ${number}, ${number})`;

/** Information about a SVG post cover. */
interface SVGCoverInfo {
  gradientColors: {
    start: RGBAString;
    end: RGBAString;
  };
  gradientId: string;
  rotationAngle: number;
}

/**
 * Returns a random RGBA color string.
 *
 * @returns A random RGBA color string.
 */
function makeColor(): RGBAString {
  function makeIntensity(): number {
    return Math.floor(Math.random() * 256);
  }

  return `rgba(${makeIntensity()}, ${makeIntensity()}, ${makeIntensity()}, ${
    makeIntensity() / 255
  })`;
}

/**
 * Returns data needed to make a post SVG cover.
 *
 * @returns Data about an SVG cover.
 */
function useSVGCoverInfo(): SVGCoverInfo {
  return {
    gradientColors: {
      start: makeColor(),
      end: makeColor(),
    },
    gradientId: useId(),
    rotationAngle: Math.floor(Math.random() * 360),
  };
}

/**
 * Makes a random SVG post cover.
 *
 * @param info - Cover information.
 * @returns React element containing the SVG.
 */
function makeSVGCover(info: SVGCoverInfo): ReactElement {
  return (
    <svg
      className={styles.post__cover}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 3.375 1"
    >
      <defs>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id={info.gradientId}
        >
          <stop
            stopColor={info.gradientColors.start}
            stopOpacity="1"
            offset="0%"
          ></stop>
          <stop
            stopColor={info.gradientColors.end}
            stopOpacity="1"
            offset="100%"
          ></stop>
        </linearGradient>
      </defs>
      <circle
        cx="1.6875"
        cy="0.5"
        r="0.5"
        fill={`url(#${info.gradientId})`}
        transform-origin="center"
        transform={`rotate(${info.rotationAngle})`}
      ></circle>
      <rect></rect>
    </svg>
  );
}

export default function PostPreview({ post }: { post: Post }) {
  const format = useFormatter();
  const t = useTranslations("PostPreview");

  const coverFallbackInfo = useSVGCoverInfo();

  return (
    <article className="passthrough" role="group" aria-label={post.title}>
      <Link
        className={styles["post-container"]}
        href={`/posts/${post.id}`}
        aria-label={post.title}
      >
        <div className={styles.post}>
          {/* Only show image if there is one */}
          {post.cover != null ? (
            <img
              className={styles.post__cover}
              src={post.cover.url}
              alt={post.cover?.alternativeText}
            />
          ) : (
            makeSVGCover(coverFallbackInfo)
          )}
          <div className={styles.post__card}>
            <div className={styles.post__details}>
              <div className={styles["post__details-top"]}>
                <ul
                  className={styles.post__tags}
                  aria-label={t("categories-list-label")}
                >
                  {post.tags.map((tag) => (
                    <li className={styles.post__tag} key={tag.id}>
                      {tag.name}
                    </li>
                  ))}
                </ul>
                <p className={styles.post__title}>{post.title}</p>
                <p>{post.summary}</p>
              </div>
              <div className={styles["post__details-bottom"]}>
                <p className={styles.post__date}>
                  {t("date", { date: format.dateTime(post.date) })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
