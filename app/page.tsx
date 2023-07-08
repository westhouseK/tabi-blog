import { readFileSync, readdirSync } from "fs"

import path from "path"
import matter from "gray-matter"
import Link from "next/link"
import Footer from "./footer"
import Header from "./header"

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
      <main>
        {posts.map((post) => (
          <>
            <div key={post.slug}>
              <Link href={`articles/${post.slug}`}>{post.data.title}</Link>
            </div>
            <div>タグ：{post.data.tag}</div>
            <div>投稿日：{post.data.create_date}</div>
            <div>詳細：{post.data.description}</div>
            <div>
              -------------------------------------------------------------------------------------------------
            </div>
          </>
        ))}
      </main>
      <Footer />
    </>
  )
}
