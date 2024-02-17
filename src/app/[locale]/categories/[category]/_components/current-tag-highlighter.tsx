"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import PostTag from "../../_components/post-tag";

/**
 * Component for highlighting the {@link PostTag | tag component} representing
 * the currently displayed tag.
 *
 * @remarks
 *
 * Uses element IDs to determine which tag to highlight.
 *
 * @returns Component.
 */
export default function CurrentTagHighlighter() {
  const pathname = usePathname();

  const tagID = Number.parseInt(pathname.split("/").at(-1) || "");

  useEffect(() => {
    if (!Number.isNaN(tagID)) {
      const target = document.getElementById(`tag-${tagID}`);
      if (target instanceof HTMLInputElement) target.checked = true;
    }
  });

  return <> </>;
}
