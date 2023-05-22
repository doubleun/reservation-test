'use client'

import Image from 'next/image'
import {
  addRoomToUser,
  checkRoomAvailability,
  getUserInfo,
  removeRoomFromUser,
  searchUserReserved,
} from '@/app/utils/user'
import useSWR from 'swr'
import { mockGetRoomData } from '@/app/service'

const roomDetailTwClass = {
  container: `container mx-auto my-6`,
  image: `self-center`,
  detailContainer: `flex flex-col gap-4`,
  roomDetail: `flex flex-col justify-center gap-1`,
  buttonContainer: `flex justify-between`,
  reserveButton: `bg-green-700 rounded-md p-2 text-white disabled:bg-slate-800 disabled:cursor-not-allowed`,
  cancelButton: `bg-red-700 rounded-md p-2 text-white`,
}

function RoomDetail({ roomId }: { roomId: string | undefined }) {
  if (!roomId) return <h1>Room Id not found</h1>

  const { data: user, mutate, error: userError } = useSWR('/user', getUserInfo)

  const { data: room, error: roomError } = useSWR(`/room/${roomId}`, (_) =>
    mockGetRoomData(roomId)
  )

  // check user and room data validity
  if (!user || userError || !room || roomError || Array.isArray(room))
    return <h1>Invalid user or room data found</h1>

  // reserve function
  const handleReserveRoom = () => {
    try {
      // add new room reservation
      addRoomToUser(room, mutate)
    } catch (err) {
      console.error(err)
    }
  }

  // cancel function
  const handleCancelRoom = () => {
    try {
      // cancel room reservation
      removeRoomFromUser(roomId, mutate)
    } catch (err) {
      console.error(err)
    }
  }

  // check available date
  const handleCheckAvailability = (): boolean => {
    return !!searchUserReserved(room.id) || checkRoomAvailability(room)
  }

  return (
    <div className={roomDetailTwClass.container}>
      <div className={roomDetailTwClass.detailContainer}>
        {/* Image */}
        <div className={roomDetailTwClass.image}>
          <Image
            src={room.imgUrl}
            alt={`Room ${room.roomNo}`}
            width={500}
            height={300}
          />
        </div>
        {/* Room detail */}
        <div className={roomDetailTwClass.roomDetail}>
          <h1 className="font-bold text-2xl">Details:</h1>
          <h2>Room: {room.roomNo}</h2>
          <p>Capacity: {room.capacity}</p>
          <p>
            Date Available: {room.availableTime.start.toLocaleDateString()} -{' '}
            {room.availableTime.end.toLocaleDateString()}
          </p>
        </div>
        {/* Actions */}
        <div className={roomDetailTwClass.buttonContainer}>
          <button
            className={roomDetailTwClass.reserveButton}
            onClick={handleReserveRoom}
            disabled={handleCheckAvailability()}
          >
            Reserved
          </button>
          {/* display cancel reservation button */}
          {searchUserReserved(room.id) && (
            <button
              className={roomDetailTwClass.cancelButton}
              onClick={handleCancelRoom}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
