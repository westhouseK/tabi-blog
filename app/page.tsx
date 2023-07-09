import { readFileSync, readdirSync } from "fs"

import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Footer from "./footer"
import Header from "./header"
import style from "./top.module.scss"

async function getPosts() {
  const currentPostsDir = path.join(process.cwd(), "posts")
  const postFiles = readdirSync(currentPostsDir)
  return postFiles.map((postFile) => {
    const slug = postFile.replace(/\.md$/, "")
    const post = matter(readFileSync(path.join(currentPostsDir, postFile), "utf-8"))
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
          {posts.map((post) => (
          <>
            <h3 className={style.top_article_ttl} key={post.slug}>
              <Link href={`articles/${post.slug}`}>{post.data.title}</Link>
            </h3>
            <div className={style.top_article_tag}>{post.data.tag}</div>
            <div className={style.top_article_date}>{post.data.created_date}</div>
            <div className={style.top_article_txt}>{post.data.description}</div>
            <div>
              -------------------------------------------------------------------------------------------------
            </div>
          </>
        ))}
          </section>
       
      </main>
      <Footer />
    </>
  )
}
