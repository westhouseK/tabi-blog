import Link from "next/link"
import style from "./header.module.scss"

const Header = () => {
  return (
    <header className={style.header}>
      <div>
        <Link className={style.logo} href='/'>
          Tabi blog
        </Link>
      </div>
    </header>
  )
}

export default Header
