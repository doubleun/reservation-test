const mockRoomImageUrl =
  'https://hdwallpaperim.com/wp-content/uploads/2017/08/25/121661-living_rooms-interiors-interior_design.jpg'

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

export const mockGetRoomData = async (
  roomId?: string
): Promise<RoomInterface | RoomInterface[] | undefined> => {
  // const id = Array.isArray(roomId) ? roomId.spl
  console.log('roomId: ', roomId)
  const roomData: RoomInterface[] = [
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
        start: new Date('2023-04-01'),
        end: new Date('2023-05-01'),
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
      id: '5',
      imgUrl: mockRoomImageUrl,
      roomNo: 104,
      capacity: 2,
      availableTime: {
        start: new Date('2023-04-01'),
        end: new Date('2023-05-01'),
      },
    },
    {
      id: '5',
      imgUrl: mockRoomImageUrl,
      roomNo: 201,
      capacity: 4,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
    {
      id: '6',
      imgUrl: mockRoomImageUrl,
      roomNo: 202,
      capacity: 4,
      availableTime: {
        start: new Date('2023-06-01'),
        end: new Date('2023-07-01'),
      },
    },
    {
      id: '7',
      imgUrl: mockRoomImageUrl,
      roomNo: 203,
      capacity: 4,
      availableTime: {
        start: new Date('2023-05-01'),
        end: new Date('2023-06-01'),
      },
    },
    {
      id: '8',
      imgUrl: mockRoomImageUrl,
      roomNo: 204,
      capacity: 4,
      availableTime: {
        start: new Date('2023-10-01'),
        end: new Date('2023-11-01'),
      },
    },
  ]

  if (roomId) {
    const room = roomData.find((room) => room.id === roomId)
    console.log('fetching. . . room', room)
    return new Promise<RoomInterface>((resolve, reject) => {
      if (room) resolve(room)
      else reject(undefined)
    })
  } else {
    return new Promise<RoomInterface[]>((resolve) => {
      resolve(roomData)
    })
  }
}
