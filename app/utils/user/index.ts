import { RoomInterface } from '@/app/components/RoomCard/RoomCardContainer'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'

export interface UserInfoInterface {
  role: 'user' | 'admin'
  reservations: Map<string, RoomInterface>
}

let userInfo: UserInfoInterface = {
  role: 'user',
  reservations: new Map(),
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
  if (userInfo.reservations.get(room.id))
    throw new Error('Reservation - Room is already reserved')

  userInfo.reservations.set(room.id, room)
  mutate && mutate({ ...userInfo })
}

export const removeRoomFromUser = (
  roomId: string,
  mutate?: KeyedMutator<UserInfoInterface>
) => {
  // check if room exists
  if (!userInfo.reservations.get(roomId))
    throw new Error('Cancel - Room is not found in current user')

  userInfo.reservations.delete(roomId)
  console.log('behind - userInfo', userInfo)
  mutate && mutate({ ...userInfo })
}

export const getUserInfo = (): UserInfoInterface => {
  return userInfo
}
