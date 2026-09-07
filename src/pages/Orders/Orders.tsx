import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ActGetOrders } from '@store/orders/ordersSlice'
import styles from './styles.module.css'

const ORDERS_PER_PAGE = 5

export default function OrdersPage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { records, loading, error } = useAppSelector((state) => state.orders)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (user) {
      dispatch(ActGetOrders())
    }
  }, [dispatch, user])

  useEffect(() => {
    setCurrentPage(1)
  }, [records.length])

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(records.length / ORDERS_PER_PAGE))
  }, [records.length])

  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE
    return records.slice(startIndex, startIndex + ORDERS_PER_PAGE)
  }, [currentPage, records])

  if (!user) {
    return (
      <Container className={styles.page}>
        <Card className={styles.emptyCard}>
          <Card.Body>
            <h2>Please login</h2>
            <p>Please sign in to view your orders.</p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    )
  }

  return (
    <Container className={styles.page}>
      <h1 className={styles.title}>My Orders</h1>

      {loading === 'pending' && <p>Loading orders...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading || loading === 'succeeded' ? (
        records.length === 0 ? (
          <Card className={styles.emptyCard}>
            <Card.Body>
              <h3>No orders yet</h3>
              <p>Your recent purchases will appear here.</p>
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </Card.Body>
          </Card>
        ) : (
          <>
            <Row className="g-3">
              {currentOrders.map((order) => (
                <Col xs={12} key={order.id ?? `${order.createdAt}-${order.total}`}>
                  <Card className={styles.orderCard}>
                    <Card.Body>
                      <div className={styles.orderHeader}>
                        <div>
                          <p className={styles.label}>Order # {order.id ?? 'New'}</p>
                          <h4>{new Date(order.createdAt).toLocaleDateString()}</h4>
                        </div>
                        <span className={styles.status}>{order.status}</span>
                      </div>

                      {order.items.map((item) => (
                        <div key={`${order.id ?? 'new'}-${item.productId}`} className={styles.itemRow}>
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                        </div>
                      ))}

                      <div className={styles.orderHeader}>
                        <span className={styles.label}>Placed</span>
                        <small>
                          {Number.isNaN(new Date(order.createdAt).getTime())
                            ? 'Just now'
                            : new Date(order.createdAt).toLocaleDateString()}
                        </small>
                      </div>

                      <div className={styles.totalRow}>
                        <span>Total</span>
                        <strong>${order.total.toFixed(2)}</strong>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {records.length > ORDERS_PER_PAGE && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <span className="mx-2">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )
      ) : null}
    </Container>
  )
}
