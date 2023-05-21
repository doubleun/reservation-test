import { RoomInterface } from '@/app/components/RoomCard/RoomCardContainer'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'

export interface UserInfoInterface {
  role: 'user' | 'admin'
  reservations: RoomInterface[]
}

let userInfo: UserInfoInterface = {
  role: 'user',
  reservations: [],
}

export const searchUserReserved = (roomId: string): boolean => {
  return Boolean(
    userInfo.reservations.find((reservedRoom) => reservedRoom.id === roomId)
  )
}

export const setUserInfo = (
  newUserInfo: UserInfoInterface,
  setState?: Dispatch<SetStateAction<UserInfoInterface>>
) => {
  if (newUserInfo?.role !== 'user' || !newUserInfo?.reservations) {
    throw new Error('User data is incorrect')
  } else {
    userInfo = newUserInfo
    setState && setState(newUserInfo)
  }
}

export const addRoomToUser = (
  room: RoomInterface,
  mutate?: KeyedMutator<UserInfoInterface>
) => {
  // check if room exists
  if (searchUserReserved(room.id))
    throw new Error('Reservation - Room is already reserved')

  console.log('behind - userInfo', userInfo)
  const newReservations: UserInfoInterface['reservations'] = [
    ...userInfo.reservations,
    room,
  ]
  userInfo = { ...userInfo, reservations: newReservations }
  mutate && mutate({ ...userInfo, reservations: newReservations })
}

export const removeRoomFromUser = (
  roomId: string,
  mutate?: KeyedMutator<UserInfoInterface>
) => {
  // check if room exists
  if (!searchUserReserved(roomId))
    throw new Error('Cancel - Room is not found in current user')

  console.log('behind - userInfo', userInfo)
  const newReservations: UserInfoInterface['reservations'] =
    userInfo.reservations.filter((reserved) => reserved.id !== roomId)
  userInfo = { ...userInfo, reservations: newReservations }
  mutate && mutate({ ...userInfo, reservations: newReservations })
}

export const getUserInfo = async (): Promise<UserInfoInterface> => {
  return new Promise((resolve) => {
    resolve(userInfo)
  })
}
