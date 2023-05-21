import NabBar from './components/NabBar'
import RoomCardContainer from './components/RoomCard/RoomCardContainer'

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
