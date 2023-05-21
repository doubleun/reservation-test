import Link from 'next/link'
import RoomDetail from './components/RoomDetail'
const roomPageTwClass = {
  nav: `container mx-auto pt-6`,
  button: `bg-slate-700 rounded-md p-2 text-white font-bold`,
}

export default function Room({ params }: { params: { room?: string } }) {
  return (
    <main>
      <nav className={roomPageTwClass.nav}>
        <ul>
          <li>
            <Link href="/" className={roomPageTwClass.button}>
              {`<-`} Go Back
            </Link>
          </li>
        </ul>
      </nav>
      <RoomDetail roomId={params?.room} />
    </main>
  )
}
