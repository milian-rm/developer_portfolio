import { Routes, Route } from 'react-router-dom'
import HomeView from './features/home/components/HomeView.jsx'
import DetailsView from './features/details/components/DetailsView.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/detalles" element={<DetailsView />} />
    </Routes>
  )
}

export default App