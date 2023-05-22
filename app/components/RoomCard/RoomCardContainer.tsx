'use client'

import { mockGetRoomData } from '@/app/service'
import RenderRoomCard from './RenderRoomCard'
import { UserRoles } from '@/app/utils'
import useSWR from 'swr'

const roomCardContainerTwClass = `grid grid-cols-2 grid-rows-1 place-items-center gap-y-4 py-8`

function RoomCardContainer({ roleEnter }: { roleEnter: UserRoles }) {
  // can be async
  const { data: roomData } = useSWR('/', mockGetRoomData)
  console.log('roomData: ', roomData)

  if (!roomData || !Array.isArray(roomData)) return <h1>Room data not found</h1>
  return (
    <div className={roomCardContainerTwClass}>
      <RenderRoomCard roomData={roomData} roleEnter={roleEnter} />
    </div>
  )
}
export default RoomCardContainer
