import { Routes, Route } from 'react-router-dom'
import MainLayout from './shared/components/MainLayout.jsx'
import HomeView from './features/home/components/HomeView.jsx'
import SmoothCursor from './shared/components/ui/SmoothCursor.jsx'

function App() {
  return (
    <>
      <SmoothCursor />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeView />} />
        </Route>
      </Routes>
    </>
  )
}

export default App