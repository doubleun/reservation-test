import RoomNavBar from '@/app/[room]/components/RoomNavBar'
import EditRoomDetail from '../components/EdirRoomDetail'

export default function Room({ params }: { params: { room?: string } }) {
  return (
    <main>
      <RoomNavBar />
      <EditRoomDetail roomId={params?.room} />
    </main>
  )
}
