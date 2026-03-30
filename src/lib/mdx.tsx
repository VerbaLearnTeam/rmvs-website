import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 style={{ marginTop: 48, marginBottom: 16 }} {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 style={{ marginTop: 32, marginBottom: 12 }} {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      style={{ color: "var(--cyan)", textDecoration: "underline", textUnderlineOffset: 3 }}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  code: (props: React.ComponentProps<"code">) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.88em",
            padding: "2px 6px",
            borderRadius: 4,
            background: "var(--cyan-subtle)",
            color: "var(--cyan)",
          }}
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      style={{
        background: "var(--code-bg)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: 20,
        overflow: "auto",
        fontSize: "0.88rem",
        lineHeight: 1.6,
        margin: "24px 0",
        fontFamily: "var(--font-mono)",
      }}
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      style={{
        borderLeft: "3px solid var(--cyan)",
        paddingLeft: 20,
        margin: "24px 0",
        color: "var(--white-dim)",
        fontStyle: "italic",
      }}
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div style={{ overflowX: "auto", margin: "24px 0" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
        }}
        {...props}
      />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      style={{
        textAlign: "left",
        padding: "10px 14px",
        borderBottom: "2px solid var(--border-hover)",
        fontWeight: 600,
        color: "var(--white-bright)",
      }}
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td
      style={{
        padding: "10px 14px",
        borderBottom: "1px solid var(--border)",
        color: "var(--white-dim)",
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr
      style={{
        border: "none",
        height: 1,
        background: "linear-gradient(90deg, transparent, var(--cyan-border), transparent)",
        margin: "48px 0",
      }}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong style={{ color: "var(--white-bright)", fontWeight: 600 }} {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul style={{ paddingLeft: 24, margin: "16px 0" }} {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol style={{ paddingLeft: 24, margin: "16px 0" }} {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li style={{ marginBottom: 8, lineHeight: 1.7, color: "var(--white-dim)" }} {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p style={{ margin: "16px 0", lineHeight: 1.75, color: "var(--white-dim)" }} {...props} />
  ),
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });

  return content;
}
