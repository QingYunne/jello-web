import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'

export default function AccountVerification() {
  let [searchParams] = useSearchParams()
  const { email, token } = Object.fromEntries([...searchParams])

  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (email && token)
      verifyUserAPI({ email, token }).then(() => setVerified(true))
  }, [email, token])

  if (!email || !token) return <Navigate to="/404" />
  if (!verified) <PageLoadingSpinner caption="Verifying your account..." />

  return <div>AccountVerification</div>
}
