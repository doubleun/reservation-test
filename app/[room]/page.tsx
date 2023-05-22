import RoomDetail from './components/RoomDetail'
import RoomNavBar from './components/RoomNavBar'

export default function Room({ params }: { params: { room?: string } }) {
  return (
    <main>
      <RoomNavBar />
      <RoomDetail roomId={params?.room} />
    </main>
  )
}
