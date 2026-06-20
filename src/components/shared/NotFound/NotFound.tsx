import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import styles from './styles.module.css'

const {
  page,
  sprout,
  code,
  heading,
  subtext,
  actions,
  primaryBtn,
} = styles

const NotFound = () => {
  return (
    <Container className={page}>
      <svg
        className={sprout}
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M12 21V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 12c0-3.5-2.5-6-6.5-6.2C5.3 9.8 8 12.4 12 12Z" fill="currentColor" />
        <path d="M12 9c0-3.2 2.3-5.5 5.8-5.7C18 7 15.6 9.3 12 9Z" fill="currentColor" />
      </svg>

      <p className={code} aria-hidden="true">404</p>

      <h1 className={heading}>This page hasn't taken root</h1>
      <p className={subtext}>
        The link might be outdated, or the page may have been moved.
        Let's get you back to solid ground.
      </p>

      <div className={actions}>
        <Link to="/" replace={true} className={`btn ${primaryBtn}`}>
          Back to home
        </Link>
        <Link to="/store" replace={true} className="btn btn-outline-light">
          Browse the store
        </Link>
      </div>
    </Container>
  )
}

export default NotFound