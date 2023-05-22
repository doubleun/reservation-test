'use client'

import Image from 'next/image'
import {
  addRoomToUser,
  checkRoomAvailability,
  getUserInfo,
  removeRoomFromUser,
  searchUserReserved,
} from '@/app/utils/user'
import useSWR, { useSWRConfig } from 'swr'
import { mockGetRoomData } from '@/app/service'
import { useRef } from 'react'

const roomDetailTwClass = {
  container: `container mx-auto my-6`,
  image: `self-center`,
  detailContainer: `flex flex-col gap-4`,
  roomDetail: `flex flex-col justify-center gap-1`,
  textInput: `flex gap-4`,
  dateInput: `border-2 border-slate-500`,
  buttonContainer: `flex justify-between mt-4`,
  submitButton: `bg-blue-700 rounded-md p-2 text-white disabled:bg-slate-800 disabled:cursor-not-allowed`,
}

// TODO: Reuse the same room detail components
function EditRoomDetail({ roomId }: { roomId: string | undefined }) {
  const formRef = useRef<HTMLFormElement>(null)
  if (!roomId) return <h1>Room Id not found</h1>

  const {
    data: room,
    mutate,
    error: roomError,
  } = useSWR(`/room/${roomId}`, (_) => mockGetRoomData(roomId))
  const { mutate: revalidate } = useSWRConfig()

  if (!room || Array.isArray(room) || roomError)
    return <h1>Room data is not valid</h1>

  // reserve function
  const handleSubmitRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // edit room detail
      console.log('handle submit room')

      // addRoomToUser(room, mutate)
      revalidate(`/${roomId}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={roomDetailTwClass.container}>
      <form
        ref={formRef}
        onSubmit={handleSubmitRoom}
        className={roomDetailTwClass.detailContainer}
      >
        {/* Image */}
        <div className={roomDetailTwClass.image}>
          <Image
            src={room.imgUrl}
            alt={`Room ${room.roomNo}`}
            width={500}
            height={300}
          />
        </div>
        {/* Edit room detail */}
        <div className={roomDetailTwClass.roomDetail}>
          <h1 className="font-bold text-2xl">Details:</h1>
          {/* Room no - input */}
          <div className={roomDetailTwClass.textInput}>
            <h2>Room: </h2>
            <input
              type="number"
              className="border-2 border-slate-600 rounded-sm"
              defaultValue={room.capacity}
            />
          </div>
          {/* Capacity - input */}
          <div className={roomDetailTwClass.textInput}>
            <p>Capacity: {room.capacity}</p>
            <input
              type="number"
              className="border-2 border-slate-600 rounded-sm"
              defaultValue={room.capacity}
            />
          </div>
          {/* Date available - input */}
          <div className={roomDetailTwClass.dateInputContainer}>
            <p>Date Available:</p>
            <input
              type="date"
              id="start"
              name="start"
              className={roomDetailTwClass.dateInput}
              defaultValue={room.availableTime.start
                .toISOString()
                .substring(0, 10)}
            />
            <input
              type="date"
              id="end"
              name="end"
              className={roomDetailTwClass.dateInput}
              defaultValue={room.availableTime.end
                .toISOString()
                .substring(0, 10)}
            />
          </div>
        </div>
        {/* Actions */}
        <div className={roomDetailTwClass.buttonContainer}>
          <button className={roomDetailTwClass.submitButton}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditRoomDetail
