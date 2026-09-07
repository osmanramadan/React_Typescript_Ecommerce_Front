import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, accessToken } = useAppSelector((state) => state.auth)
  const isAdmin = Boolean(user && accessToken && user.role === 'admin')

  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default AdminRoute
