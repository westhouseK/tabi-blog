import Image from "next/image"
import { FC, ImgHTMLAttributes } from "react"

const ArticleContentImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, title }) => {
  return <Image src={src ?? ""} alt={alt ?? ""} title={title} width={400} height={200} />
}
export default ArticleContentImage
