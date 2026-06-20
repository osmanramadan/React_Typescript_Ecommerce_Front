import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"
import NotFound from "../components/shared/NotFound/NotFound"

const RouteError = () => {

  let status = 400;
  let text = "Problem with server , try later"
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
       return <NotFound />
  }

  if (isRouteErrorResponse(error) && error.status === 400){
        status = error.status
        text =   error.statusText
  }

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 1.5rem',
      backgroundColor: '#1a1d20',
      color: 'rgba(255, 255, 255, 0.75)',
    }}>
      <h1 style={{
        margin: 0,
        fontSize: '5rem',
        fontWeight: 800,
        lineHeight: 1,
        color: '#fff',
        letterSpacing: '-0.02em',
      }}>
        {status}
      </h1>
      <p style={{
        margin: '0.75rem 0 1.75rem',
        maxWidth: '38ch',
        lineHeight: 1.6,
        color:'#fff'
      }}>
        {text}
      </p>
      <Link
        to="/"
        replace={true}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#2e7d32',
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