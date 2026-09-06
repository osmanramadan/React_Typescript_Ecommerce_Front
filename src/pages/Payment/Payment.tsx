import { useMemo, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { ActPlaceOrder } from '@store/orders/ordersSlice'
import { ClearCart } from '@store/cart/CartSlice'
import { useCart } from '@hooks/useCart'
import styles from './styles.module.css'

export default function PaymentPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { productsFullData, items } = useCart()
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const totalPrice = useMemo(() => {
    return productsFullData.reduce((sum, product) => {
      return sum + product.price * (items[product.id] ?? 0)
    }, 0)
  }, [productsFullData, items])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!productsFullData.length) {
      return
    }

    const orderPayload = {
      userId: user?.id ?? null,
      total: totalPrice,
      items: productsFullData.map((product) => ({
        productId: product.id,
        name: product.name,
        quantity: items[product.id] ?? 0,
        price: product.price,
        image: product.image,
      })),
    }

    const result = await dispatch(ActPlaceOrder(orderPayload))

    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(ClearCart())
      navigate('/orders')
    }
  }

  return (
    <Container className={styles.page}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className={styles.card}>
            <Card.Body>
              <h2 className={styles.title}>Checkout</h2>
              <div className={styles.summaryBox}>
                <span>Order total</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>

              <Form onSubmit={handleSubmit} className={styles.form}>
                <Form.Group className="mb-3">
                  <Form.Label>Cardholder name</Form.Label>
                  <Form.Control
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card number</Form.Label>
                  <Form.Control
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry</Form.Label>
                      <Form.Control
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className={styles.submitBtn}>
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
