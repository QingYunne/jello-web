import { useSearchParams, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'

export default function AccountVerification() {
  let [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { email, token } = Object.fromEntries([...searchParams])

  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setVerified(true))
        .catch(() => setError(true))
    }
  }, [email, token, navigate])

  if (!email || !token) return <Navigate to="/404" />
  if (error) return <Navigate to="/404" />
  if (!verified) return <PageLoadingSpinner caption="Verifying your account..." />

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}
