'use client'

import Image from 'next/image'
import Link from 'next/link'
import Badge from '../Badge'
import {
  UserRoles,
  checkRoomAvailability,
  getUserInfo,
  searchUserReserved,
} from '@/app/utils'
import useSWR from 'swr'
import { RoomInterface } from '@/app/service'

const roomCardTwClass = {
  roomCard: ``,
  roomNo: `flex justify-between`,
  button: `bg-blue-700 text-white py-1 px-4 rounded-md`,
}

function RenderRoomCard({
  roomData,
  roleEnter = UserRoles.user,
}: {
  roomData: RoomInterface[]
  roleEnter?: UserRoles
}) {
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
                {searchUserReserved(room.id) && <Badge text="Reserved" />}
                {checkRoomAvailability(room) && (
                  <Badge text="Not available" className="bg-red-600" />
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
              {roleEnter === UserRoles.user && (
                <Link className={roomCardTwClass.button} href={`/${room.id}`}>
                  View
                </Link>
              )}

              {/* for admin */}
              {roleEnter === UserRoles.admin && (
                <Link
                  className={roomCardTwClass.button}
                  href={`/admin/${room.id}`}
                >
                  Edit
                </Link>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}
export default RenderRoomCard
