import LottieHandler from '@components/message/LottieHandler/LottieHandler'
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'


const RouteError = () => {

  const error = useRouteError()


  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        backgroundColor: '#1a1d20',
        color: 'rgba(255, 255, 255, 0.75)',
      }}
    >
      {
         isRouteErrorResponse(error) && error.status === 404 ? 
          <LottieHandler type="notFound" message='This Page Not Found'/>:
          <LottieHandler type="error" message='Un Expected Error'/>
        
      }


      
      <Link
        to="/"
        replace={true}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#FB2C56',
          borderRadius: '0.375rem',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 500,
        }}
      >
        Back to home
      </Link>
    </div>
  )
}

export default RouteError
