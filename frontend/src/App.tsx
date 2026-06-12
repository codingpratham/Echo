import { BrowserRouter, Routes, Route } from 'react-router'
import Auth from './Pages/auth/Auth'
import MainPage from './Pages/MainPage'
import ProtectedRoute from '../lib/ProtectedRoute'


const App = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
