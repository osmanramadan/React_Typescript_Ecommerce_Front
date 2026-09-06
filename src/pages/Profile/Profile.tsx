import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authLogout } from '@store/auth/authSlice'

export default function Profile() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  return (
    <Container className={styles.page}>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Account</Card.Title>
              {user ? (
                <>
                  <p>
                    <strong>Name: </strong>
                    {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {user.email}
                  </p>

                  <div className={styles.actions}>
                    <Button variant="danger" onClick={() => dispatch(authLogout())}>
                      Logout
                    </Button>
                    <Link to="/orders" className="btn btn-outline-secondary ms-2">
                      Orders
                    </Link>
                    <Link to="/profile/edit" className="btn btn-outline-primary ms-2">
                      Edit Profile
                    </Link>
                  </div>
                </>
              ) : (
                <p>
                  Please <Link to="/login">login</Link> to view your profile.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
