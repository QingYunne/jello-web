import { Route, Routes, Navigate } from 'react-router-dom'

import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

function App() {
  return (
    <>
      <Routes>
        <Route />
        <Route
          path="/"
          element={
            <Navigate to="/boards/6993ebfbd3eba4705c10274c" replace={true} />
          }
        />
        {/* Board */}
        <Route path="/boards/:boardId" element={<Board />} />
        {/* Authentication */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/account/verification" element={<AccountVerification />} />
        {/* 404 Page */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
