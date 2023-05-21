'use client'

import Image from 'next/image'
import {
  RoomInterface,
  mockGetRoomData,
} from '@/app/components/RoomCard/RoomCardContainer'
import {
  addRoomToUser,
  getUserInfo,
  removeRoomFromUser,
  searchUserReserved,
} from '@/app/utils/user'
import useSWR, { useSWRConfig } from 'swr'

const roomDetailTwClass = {
  container: `container mx-auto my-6`,
  image: `self-center`,
  detailContainer: `flex flex-col gap-4`,
  roomDetail: `flex flex-col justify-center gap-1`,
  buttonContainer: `flex justify-between`,
  reserveButton: `bg-green-700 rounded-md p-2 text-white disabled:bg-slate-800 disabled:cursor-not-allowed`,
  cancelButton: `bg-red-700 rounded-md p-2 text-white`,
}

function RoomDetail({ room }: { room: RoomInterface }) {
  const { data: user, mutate } = useSWR('/user', getUserInfo)
  // const [userInfo, setUserInfo] = useState(user)
  if (!user) return <h1>User data not found</h1>

  // reserve function
  const handleReserveRoom = (roomId: string) => {
    try {
      const room = mockGetRoomData(roomId)
      if (!room || Array.isArray(room))
        throw new Error('Reservation - Room data is invalid')

      // add new room reservation
      addRoomToUser(room, mutate)
      // setUserInfo(user)
    } catch (err) {
      console.error(err)
    }
  }

  // cancel function
  const handleCancelRoom = (roomId: string) => {
    try {
      // cancel room reservation
      removeRoomFromUser(roomId, mutate)
      // setUserInfo(user)
    } catch (err) {
      console.error(err)
    }
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
            onClick={() => handleReserveRoom(room.id)}
            disabled={searchUserReserved(room.id)}
          >
            Reserved
          </button>
          {/* display cancel reservation button */}
          {searchUserReserved(room.id) && (
            <button
              className={roomDetailTwClass.cancelButton}
              onClick={() => handleCancelRoom(room.id)}
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
