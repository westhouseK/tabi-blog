import { readFileSync, readdirSync } from "fs"
import path from "path"

import Image from "next/image"
import Link from "next/link"

import matter from "gray-matter"

import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"

import style from "./top.module.scss"

async function getPosts() {
  const currentPostsDir = path.join(process.cwd(), "articles")
  const postDirs = readdirSync(currentPostsDir)
  return postDirs.map((slug) => {
    const { data } = matter(readFileSync(path.join(currentPostsDir, slug, "article.md"), "utf-8"))
    return {
      slug,
      data,
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
              <div className={style.top_section_article} key={post.slug}>
                <Link className={style.top_link} href={`articles/${post.slug}`}>
                  <div className={style.top_article_img}>
                    <Image
                      src={`/${post.slug}/${post.data.main_image}`}
                      width={300}
                      height={200}
                      alt={post.data.title}
                    />
                  </div>
                  <h3 className={style.top_article_ttl}>{post.data.title}</h3>
                  <p className={style.top_article_tag}>{post.data.tags}</p>
                  <p className={`${style.top_article_date} ${style.txt_en}`}>
                    {post.data.created_date}
                  </p>
                  <p className={style.top_article_txt}>{post.data.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
