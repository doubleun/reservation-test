'use client'

import Image from 'next/image'
import Link from 'next/link'
import Badge from '../Badge'
import { RoomInterface } from './RoomCardContainer'
import { getUserInfo, searchUserReserved } from '@/app/utils'
import useSWR from 'swr'

const roomCardTwClass = {
  roomCard: ``,
  roomNo: `flex justify-between`,
  button: `bg-blue-700 text-white py-1 px-4 rounded-md`,
}

function RenderRoomCard({ roomData }: { roomData: RoomInterface[] }) {
  const { data: user } = useSWR('/user', getUserInfo)
  if (!user) return <h1>User data not found</h1>

  console.log('user: ', user)
  return (
    <>
      {roomData.map((room) => {
        return (
          <div className={roomCardTwClass.roomCard}>
            <div className="room-card-image">
              <Image
                src={room.imgUrl}
                alt={`Room ${room.roomNo}`}
                width={300}
                height={100}
              />
            </div>
            <div className="card-content">
              <div className={roomCardTwClass.roomNo}>
                <h2>Room: {room.roomNo}</h2>
                {searchUserReserved(room.id) ? (
                  <Badge text="Reserved" />
                ) : (
                  <h1>ddd</h1>
                )}
              </div>
              <p>Capacity: {room.capacity}</p>
              <p>
                Date Available: {room.availableTime.start.toLocaleDateString()}{' '}
                - {room.availableTime.end.toLocaleDateString()}
              </p>
            </div>
            <div className="card-footer">
              {/* insert your buttons or other footer components here */}
              <Link className={roomCardTwClass.button} href={`/${room.id}`}>
                View
              </Link>
            </div>
          </div>
        )
      })}
    </>
  )
}
export default RenderRoomCard
