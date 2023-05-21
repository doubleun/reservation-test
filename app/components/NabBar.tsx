import Link from 'next/link'

const navbarTwClass = {
  container: `container mx-auto rounded-md pt-4`,
  adminButton: `bg-red-700 rounded-md p-2 text-white font-bold`,
}

function NabBar() {
  return (
    <nav className={navbarTwClass.container}>
      <ul>
        <li>
          <Link href="/admin" className={navbarTwClass.adminButton}>
            Go to admin
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default NabBar
