import Link from "next/link";
import styles from "./post-tag.module.scss";

/**
 * A clickable component that redirects to the specified tag in `/categories/`.
 *
 * @remarks
 *
 * Must be manually marked as checked.
 *
 * The element ID is the provided ID prefixed by `tag-`.
 *
 * @param props - Properties.
 * @param props.name - Name of the tag.
 * @param props.tagID - ID of the tag.
 * @returns Tag component.
 */
export default async function PostTag({
  name,
  tagID,
}: {
  name: string;
  tagID: number;
}) {
  return (
    <Link
      href={`/categories/${tagID}`}
      className={styles.tag}
      aria-label={name}
    >
      <label aria-hidden="true">
        <input
          id={`tag-${tagID}`}
          type="radio"
          name="tag"
          tabIndex={-1}
        ></input>
        {name}
      </label>
    </Link>
  );
}
