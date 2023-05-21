import RenderRoomCard from './RenderRoomCard'

const roomCardContainerTwClass = `grid grid-cols-2 grid-rows-1 place-items-center gap-y-4 py-8`

function RoomCardContainer() {
  // can be async
  const roomData = mockGetRoomData()

  if (!roomData || !Array.isArray(roomData)) return <h1>Room data not found</h1>
  return (
    <div className={roomCardContainerTwClass}>
      <RenderRoomCard roomData={roomData} />
    </div>
  )
}
export default RoomCardContainer

export interface RoomInterface {
  id: string
  imgUrl: string
  roomNo: number
  capacity: number
  availableTime: {
    start: Date
    end: Date
  }
}

const mockRoomImageUrl =
  'https://hdwallpaperim.com/wp-content/uploads/2017/08/25/121661-living_rooms-interiors-interior_design.jpg'

export const mockGetRoomData = (
  roomId?: string
): RoomInterface[] | RoomInterface | undefined => {
  const roomData = [
    {
      id: '1',
      imgUrl: mockRoomImageUrl,
      roomNo: 101,
      capacity: 2,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
    {
      id: '2',
      imgUrl: mockRoomImageUrl,
      roomNo: 102,
      capacity: 2,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
    {
      id: '3',
      imgUrl: mockRoomImageUrl,
      roomNo: 103,
      capacity: 2,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
    {
      id: '4',
      imgUrl: mockRoomImageUrl,
      roomNo: 201,
      capacity: 4,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
    {
      id: '5',
      imgUrl: mockRoomImageUrl,
      roomNo: 202,
      capacity: 4,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
    {
      id: '6',
      imgUrl: mockRoomImageUrl,
      roomNo: 203,
      capacity: 4,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
  ]

  if (roomId) {
    return roomData.find((room) => (room.id = roomId))
  } else {
    return roomData
  }
}
