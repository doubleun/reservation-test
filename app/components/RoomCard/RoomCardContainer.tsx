import { mockGetRoomData } from '@/app/service'
import RenderRoomCard from './RenderRoomCard'

const roomCardContainerTwClass = `grid grid-cols-2 grid-rows-1 place-items-center gap-y-4 py-8`

async function RoomCardContainer() {
  // can be async
  const roomData = await mockGetRoomData()

  if (!roomData || !Array.isArray(roomData)) return <h1>Room data not found</h1>
  return (
    <div className={roomCardContainerTwClass}>
      <RenderRoomCard roomData={roomData} />
    </div>
  )
}
export default RoomCardContainer
