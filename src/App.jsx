import { useSelector } from 'react-redux'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from './pages/Settings'
import Boards from './pages/Boards'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <>
      <Routes>
        <Route />
        <Route path="/" element={<Navigate to="/boards" replace={true} />} />
        {/* Protected Route */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route path="/boards/:boardId" element={<Board />} />
          <Route path="/settings/account" element={<Settings />} />
          <Route path="/settings/security" element={<Settings />} />
          <Route path="/boards" element={<Boards />} />
        </Route>
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
