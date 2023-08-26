import fs from "fs";
import matter from "gray-matter";
import slugify from "slugify";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeToc from "rehype-toc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@leafac/rehype-shiki";
import * as shiki from "shiki";
import { readingTime } from "reading-time-estimator";

let p;
if (typeof getParserPre !== "undefined") {
  p = getParserPre(); // Llamada a la función y asignación del resultado a p
}
async function getParserPre() {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkMath)
    .use(rehypeMathjax)
    .use(remarkGfm)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: "poimandres" }),
    })
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeToc, {
      headings: ["h2", "h3"],
      cssClasses: {
        toc: "toc",
        tocList: "toc-list",
        tocAnchor: "toc-anchor",
      },
    })
    .use(rehypeAutolinkHeadings, {
      content: (arg) => ({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + arg.properties?.id,
          style: "margin-right: 10px",
        },
        children: [{ type: "text", value: "#" }],
      }),
    });
}

function getParser() {
  if (!p) {
    p = getParserPre().catch((e) => {
      p = undefined;
      throw e;
    });
  }
  return p;
}

const getPostBySlug = async (slug) => {
  const folder = "posts";
  const post = fs.readFileSync(`${folder}/${slug}`, "utf8");
  const { data, content } = matter(post);
  const parser = await getParser();
  const html = await parser.process(content);
  return {
    ...data,
    slug: slugify(data.title, { lower: true }),
    html: html.value.toString(),
    time: `${readingTime(content, 10, "es").minutes} minutos de lectura`,
  };
};

const getPosts = async () => {
  const posts = await Promise.all(
    fs.readdirSync("posts").map((slug) => getPostBySlug(slug))
  );
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

export default getPosts;
