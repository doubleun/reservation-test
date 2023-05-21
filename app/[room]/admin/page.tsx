import NabBar from '@/app/components/NabBar'
import RoomCardContainer from '@/app/components/RoomCard/RoomCardContainer'

export default function Home() {
  return (
    <>
      <NabBar />
      <main className="container mx-auto">
        <RoomCardContainer />
      </main>
    </>
  )
}
