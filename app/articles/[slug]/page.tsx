import { readFileSync, readdirSync } from "fs"
import path from "path"

export async function generateStaticParams() {
  const currentPostDir = path.join(process.cwd(), "articles")
  return readdirSync(currentPostDir).map((slug) => {
    return {
      slug,
    }
  })
}

async function getPost(slug: string) {
  return readFileSync(path.join(process.cwd(), "articles", slug, "article.md"), "utf-8")
}

export default function Article({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  return (
    <div>
      <h1>記事の詳細</h1>
      <p>記事のスラッグ: {params.slug}</p>
      <p>記事の本文: {post}</p>
    </div>
  )
}
