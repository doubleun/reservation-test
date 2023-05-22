import { RoomInterface } from '@/app/service'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'

// TODO: use object as type is better than enum
export enum UserRoles {
  user,
  admin,
}

export interface UserInfoInterface {
  role: UserRoles
  reservations: RoomInterface[]
}

let userInfo: UserInfoInterface = {
  role: UserRoles.user,
  reservations: [],
}

export const searchUserReserved = (
  roomId: string
): RoomInterface | undefined => {
  return userInfo.reservations.find(
    (reservedRoom) => reservedRoom.id === roomId
  )
}

export const checkRoomAvailability = (room: RoomInterface) => {
  const currentDate = new Date().getTime()
  return (
    room.availableTime.start.getTime() > currentDate ||
    currentDate > room.availableTime.end.getTime()
  )
}

export const setUserInfo = (
  newUserInfo: UserInfoInterface,
  setState?: Dispatch<SetStateAction<UserInfoInterface>>
) => {
  if (newUserInfo?.role !== UserRoles.user || !newUserInfo?.reservations) {
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
