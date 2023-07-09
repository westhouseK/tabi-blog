import { readFileSync, readdirSync } from "fs"

import path from "path"
import matter from "gray-matter"
import Image from "next/image"

export async function generateStaticParams() {
  const currentPostDir = path.join(process.cwd(), "articles")
  return readdirSync(currentPostDir).map((slug) => {
    return {
      slug,
    }
  })
}

async function getPost(slug: string) {
  const currentPostsDir = path.join(process.cwd(), "articles")
  return matter(readFileSync(path.join(currentPostsDir, slug, "article.md"), "utf-8"))
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
      <p>記事の本文</p>
      <div>{content}</div>
    </div>
  )
}
