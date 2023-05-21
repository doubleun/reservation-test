import Link from 'next/link'
import RoomDetail from './components/RoomDetail'
import { mockGetRoomData } from '../components/RoomCard/RoomCardContainer'

const roomPageTwClass = {
  nav: `container mx-auto pt-6`,
  button: `bg-slate-700 rounded-md p-2 text-white font-bold`,
}

export default function Room({ params }: { params: { room?: string } }) {
  // can be get from cache
  const roomData = mockGetRoomData(params?.room)
  if (!roomData || Array.isArray(roomData))
    return <h1>Invalid room data found</h1>
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
      <RoomDetail room={roomData} />
    </main>
  )
}
