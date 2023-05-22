import Link from 'next/link'

const roomNavBarTwClass = {
  nav: `container mx-auto pt-6`,
  button: `bg-slate-700 rounded-md p-2 text-white font-bold`,
}

function RoomNavBar() {
  return (
    <nav className={roomNavBarTwClass.nav}>
      <ul>
        <li>
          <Link href="/" className={roomNavBarTwClass.button}>
            {`<-`} Go Back
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default RoomNavBar
