import { BrowserRouter, Routes, Route } from 'react-router'
import Auth from './Pages/auth/Auth'
import MainPage from './Pages/MainPage'
import  ProtectedRoute from '../lib/ProtectedRoute'
import OnBoarding from './Pages/auth/OnBoarding'


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
        <Route path='*' element={<div className="p-4">invalid route</div>} />
        <Route path='/auth/onboarding' element={
              <ProtectedRoute>
                <OnBoarding />
              </ProtectedRoute>
          
        } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
