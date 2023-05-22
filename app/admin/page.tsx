import NabBar from '@/app/components/NabBar'
import RoomCardContainer from '@/app/components/RoomCard/RoomCardContainer'
import RoomNavBar from '../[room]/components/RoomNavBar'
import { UserRoles } from '../utils'

export default function Admin() {
  return (
    <div className="container mx-auto">
      <RoomNavBar />
      <h2>Logged in as Admin</h2>
      <main className="container mx-auto">
        <RoomCardContainer roleEnter={UserRoles.admin} />
      </main>
    </div>
  )
}
