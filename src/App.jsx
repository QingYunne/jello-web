import { useSelector } from 'react-redux'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { selectCurrentUser } from '~/redux/user/userSlice'

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
        <Route
          path="/"
          element={
            <Navigate to="/boards/6993ebfbd3eba4705c10274c" replace={true} />
          }
        />
        {/* Board */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route path="/boards/:boardId" element={<Board />} />
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
