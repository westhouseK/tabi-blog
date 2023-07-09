import { readFileSync, readdirSync } from "fs"

import path from "path"
import matter from "gray-matter"
import Image from "next/image"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import { unified } from "unified"

export async function generateStaticParams() {
  const currentPostDir = path.join(process.cwd(), "articles")
  return readdirSync(currentPostDir).map((slug) => {
    return {
      slug,
    }
  })
}

async function getPost(slug: string) {
  const { data, content } = matter(
    readFileSync(path.join(process.cwd(), "articles", slug, "article.md"), "utf-8"),
  )
  const result = (
    await unified()
      .use(remarkParse)
      .use(remarkToc, {
        heading: "目次",
      })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content)
  ).toString()

  return {
    data,
    content: result,
  }
}

export default async function Article({ params }: { params: { slug: string } }) {
  const { data, content } = await getPost(params.slug)

  return (
    <div>
      <Image
        src={`/${params.slug}/article-main-visual.jpg`}
        width={600}
        height={350}
        alt={data.title}
      />
      <h1>記事の詳細</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}
