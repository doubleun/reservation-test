'use client'

import { RoomInterface } from '@/app/components/RoomCard/RoomCardContainer'
import { useState, useEffect } from 'react'

interface UserInfoInterface {
  role: 'user' | 'admin'
  reservations: Map<string, RoomInterface>
}

export const useUserInfo = (initialUserInfo?: UserInfoInterface) => {
  const [userInfo, setUserInfo] = useState<UserInfoInterface>(
    initialUserInfo || {
      role: 'user',
      reservations: new Map(),
    }
  )

  const addRoomToUser = (room: RoomInterface) => {
    if (userInfo.reservations.get(room.id))
      throw new Error('Reservation - Room is already reserved')

    userInfo.reservations.set(room.id, room)
    setUserInfo({
      ...userInfo,
    })
  }

  const removeRoomFromUser = (roomId: string) => {
    if (!userInfo.reservations.get(roomId))
      throw new Error('Cancel - Room is not found in current user')

    userInfo.reservations.delete(roomId)

    setUserInfo({
      ...userInfo,
    })
  }

  const setUserRole = (role: 'user' | 'admin') => {
    if (role !== 'user') {
      throw new Error('User data is incorrect')
    } else {
      setUserInfo({
        ...userInfo,
        role,
      })
    }
  }

  useEffect(() => {
    if (initialUserInfo) {
      setUserInfo(initialUserInfo)
    }
  }, [initialUserInfo])

  return { userInfo, addRoomToUser, removeRoomFromUser, setUserRole }
}

// import { RoomInterface } from '@/app/components/RoomCard/renderRoomCard'
// import { Dispatch, SetStateAction } from 'react'

// interface UserInfoInterface {
//   role: 'user' | 'admin'
//   reservations: Map<string, RoomInterface>
// }

// let userInfo: UserInfoInterface = {
//   role: 'user',
//   reservations: new Map(),
// }

// export const setUserInfo = (
//   newUserInfo: UserInfoInterface,
//   setState?: Dispatch<SetStateAction<UserInfoInterface>>
// ) => {
//   if (newUserInfo?.role !== 'user' || !newUserInfo?.reservations) {
//     throw new Error('User data is incorrect')
//   } else {
//     userInfo = newUserInfo
//     setState && setState(newUserInfo)
//   }
// }

// export const addRoomToUser = (
//   room: RoomInterface,
//   setState?: Dispatch<SetStateAction<UserInfoInterface>>
// ) => {
//   // check if room exists
//   if (userInfo.reservations.get(room.id))
//     throw new Error('Reservation - Room is already reserved')

//   userInfo.reservations.set(room.id, room)
//   setState && setState({ ...userInfo })
// }

// export const removeRoomFromUser = (
//   roomId: string,
//   setState?: Dispatch<SetStateAction<UserInfoInterface>>
// ) => {
//   // check if room exists
//   if (!userInfo.reservations.get(roomId))
//     throw new Error('Cancel - Room is not found in current user')

//   userInfo.reservations.delete(roomId)
//   console.log('behind - userInfo', userInfo)
//   setState && setState({ ...userInfo })
// }

// export const getUserInfo = (): UserInfoInterface => {
//   return userInfo
// }
