import { readFileSync, readdirSync } from "fs"

import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Footer from "./footer"
import Header from "./header"
import style from "./top.module.scss"

async function getPosts() {
  const currentPostsDir = path.join(process.cwd(), "articles")
  const postDirs = readdirSync(currentPostsDir)
  return postDirs.map((slug) => {
    const post = matter(readFileSync(path.join(currentPostsDir, slug, "article.md"), "utf-8"))
    return {
      slug,
      data: post.data,
    }
  })
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <>
      <Header />
      <main className={style.container}>
        <div className={style.kv}>KV</div>
        <div>カテゴリ別記事</div>
        <section>
          <h2 className={style.top_section_ttl}>人気記事</h2>
          <div className={style.top_section_inner}>
            {posts.map((post) => (
              <>
                <div className={style.top_section_article}>
                  <h3 className={style.top_article_ttl} key={post.slug}>
                    <Link href={`articles/${post.slug}`}>{post.data.title}</Link>
                  </h3>
                  <p className={style.top_article_tag}>{post.data.tag}</p>
                  <p className={style.top_article_date}>{post.data.created_date}</p>
                  <p className={style.top_article_txt}>{post.data.description}</p>
                </div>
              </>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
