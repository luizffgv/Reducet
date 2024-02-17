import Markdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import styles from "./styles.module.scss";
import { Post } from "@/strapi-types";

export default function PostComponent(
  props: { post: Post } | { title: string; content: string }
) {
  return (
    <div className={styles.container}>
      {/* Only show image if there is one */}
      {"post" in props && props.post?.cover != null ? (
        <img
          className={styles.cover}
          src={props.post.cover.url}
          alt={props.post.cover.alternativeText}
        />
      ) : (
        <></>
      )}
      <div className={styles.content}>
        <h1>{"post" in props ? props.post.title : props.title}</h1>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ children, className, ...rest }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <Prism
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{
                    marginTop: "24px",
                    marginBottom: "24px",
                  }}
                >
                  {String(children).trim()}
                </Prism>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
            pre(props) {
              return <>{props.children}</>;
            },
            table({ children, ...rest }) {
              return (
                <div className={styles["content__table-container"]}>
                  <table {...rest}>{children}</table>
                </div>
              );
            },
          }}
        >
          {"post" in props ? props.post.content : props.content}
        </Markdown>
      </div>
    </div>
  );
}
