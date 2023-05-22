import NabBar from './components/NabBar'
import RoomCardContainer from './components/RoomCard/RoomCardContainer'

export default function Home() {
  return (
    <div className="container mx-auto">
      <NabBar />
      <main className="container mx-auto">
        <RoomCardContainer />
      </main>
    </div>
  )
}
