'use client'

import Image from 'next/image'
import useSWR, { useSWRConfig } from 'swr'
import {
  RoomInterface,
  mockGetRoomData,
  updateMockRoomData,
} from '@/app/service'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'

const roomDetailTwClass = {
  container: `container mx-auto my-6`,
  image: `self-center`,
  detailContainer: `flex flex-col gap-4`,
  roomDetail: `flex flex-col justify-center gap-1`,
  textInput: `flex gap-4`,
  dateInput: `border-2 border-slate-500`,
  buttonContainer: `flex justify-between mt-4`,
  dateInputContainer: ``,
  submitButton: `bg-blue-700 rounded-md p-2 text-white disabled:bg-slate-800 disabled:cursor-not-allowed`,
}

interface EditRoomFormInterface extends HTMLFormControlsCollection {
  roomNo: HTMLInputElement
  capacity: HTMLInputElement
  dateStart: HTMLInputElement
  dateEnd: HTMLInputElement
}

// TODO: Reuse the same room detail components
function EditRoomDetail({ roomId }: { roomId: string | undefined }) {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
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
    if (!formRef.current) return
    const { roomNo, capacity, dateStart, dateEnd } =
      (formRef.current?.elements as EditRoomFormInterface) ?? {}

    e.preventDefault()
    try {
      // validate form
      if (
        !roomNo?.value ||
        !capacity?.value ||
        !dateStart?.value ||
        !dateEnd?.value
      ) {
        throw new Error('Form values are missing')
      }

      // edit room detail
      const newRoomData: RoomInterface = {
        ...room,
        roomNo: Number(roomNo.value),
        capacity: Number(capacity.value),
        availableTime: {
          start: new Date(dateStart.value),
          end: new Date(dateEnd.value),
        },
      }
      // updateRoom
      console.log('oldRoomData: ', room)
      console.log('newRoomData: ', newRoomData)
      updateMockRoomData({ data: newRoomData, mutate })
      revalidate(`/${roomId}`)
      revalidate(`/`)
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={roomDetailTwClass.container}>
      <form
        ref={formRef}
        name="form"
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
              id="roomNo"
              className="border-2 border-slate-600 rounded-sm"
              defaultValue={room.roomNo}
            />
          </div>
          {/* Capacity - input */}
          <div className={roomDetailTwClass.textInput}>
            <p>Capacity: </p>
            <input
              type="number"
              id="capacity"
              className="border-2 border-slate-600 rounded-sm"
              defaultValue={room.capacity}
            />
          </div>
          {/* Date available - input */}
          <div className={roomDetailTwClass.dateInputContainer}>
            <p>Date Available:</p>
            <input
              type="date"
              id="dateStart"
              className={roomDetailTwClass.dateInput}
              defaultValue={room?.availableTime?.start
                ?.toISOString()
                ?.substring(0, 10)}
            />
            <input
              type="date"
              id="dateEnd"
              className={roomDetailTwClass.dateInput}
              defaultValue={room?.availableTime?.end
                ?.toISOString()
                ?.substring(0, 10)}
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
