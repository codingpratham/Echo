import { BrowserRouter, Routes, Route } from 'react-router'
import Auth from './Pages/auth/Auth'


const App = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
