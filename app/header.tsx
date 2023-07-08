import Link from "next/link"
import style from "./header.module.css"

const Header = () => {
  return (
    <header>
      <div>
        <Link className={style.logo} href="/">
          Tabi blog
        </Link>
      </div>
    </header>
  )
}

export default Header