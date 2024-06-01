import Link from "next/link"

const AppHeader = () => {


  return (
    <div className="app-header">
      <Link href="/">На главную</Link>
      <Link href="/about">About</Link>
      <Link href="/about/detail">About detail</Link>
    </div>
  )
}

export default AppHeader