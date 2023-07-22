import { readFileSync, readdirSync } from "fs"
import path from "path"

import { Fragment, HtmlHTMLAttributes, ReactNode, createElement } from "react"

import Image from "next/image"

import matter from "gray-matter"
import rehypeParse from "rehype-parse"
import rehypeReact from "rehype-react"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"
import { unified } from "unified"

import ArticleContentImage from "@/components/ArticleContentImage/ArticleContentImage"

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

// マークダウンにコンポーネントを配置するサンプル
const Myh3 = ({ children }: HtmlHTMLAttributes<HTMLElement>): JSX.Element => {
  return <h3 style={{ color: "red" }}>{children}</h3>
}

const toReactNode = (content: string) => {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        img: ArticleContentImage,
        h3: Myh3,
      },
    })
    .processSync(content).result as ReactNode // TODO: 型キャストしない方法を考える
}

export default async function Article({ params }: { params: { slug: string } }) {
  const { data, content } = await getPost(params.slug)

  return (
    <div>
      <Image src={`/${params.slug}/${data.main_image}`} width={600} height={350} alt={data.title} />
      <h1>記事の詳細</h1>
      <div>{toReactNode(content)}</div>
    </div>
  )
}
