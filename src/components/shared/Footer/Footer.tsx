import { useState, type FormEvent } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styles from './styles.module.css'

const {
  footer,
  brand,
  brandMark,
  tagline,
  heading,
  linkList,
  socialRow,
  socialLink,
  newsletterForm,
  newsletterInput,
  newsletterButton,
  bottomBar,
  bottomLinks,
} = styles

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: wire up to actual subscribe endpoint
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className={footer}>
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={4} lg={3}>
            <h2 className={brand}>
              <span>eco</span>
              <span className={brandMark}>ma</span>
            </h2>
            <p className={tagline}>Everyday essentials, sourced responsibly.</p>
            <div className={socialRow}>
              <a href="#" className={socialLink} aria-label="Facebook">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.78 8.44-4.94 8.44-9.94Z" />
                </svg>
              </a>
              <a href="#" className={socialLink} aria-label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.41.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.22-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.41a3.74 3.74 0 0 1-1.38-.89 3.74 3.74 0 0 1-.89-1.38c-.17-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.22.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.05-.36 2.22-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.74.07-.96.04-1.48.2-1.82.34-.46.18-.78.39-1.13.73-.34.35-.55.67-.73 1.13-.14.34-.3.86-.34 1.82-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.04.96.2 1.48.34 1.82.18.46.39.78.73 1.13.35.34.67.55 1.13.73.34.14.86.3 1.82.34 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.82-.34.46-.18.78-.39 1.13-.73.34-.35.55-.67.73-1.13.14-.34.3-.86.34-1.82.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.82a3.05 3.05 0 0 0-.73-1.13 3.05 3.05 0 0 0-1.13-.73c-.34-.14-.86-.3-1.82-.34-1.24-.06-1.6-.07-4.74-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.6-3.39a1.16 1.16 0 1 1 0 2.32 1.16 1.16 0 0 1 0-2.32Z" />
                </svg>
              </a>
              <a href="#" className={socialLink} aria-label="X (formerly Twitter)">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-7.2 8.23L23 22h-6.9l-5.4-7.06L4.6 22H1.5l7.7-8.81L1 2h7l4.9 6.46L18.9 2Zm-2.42 18.17h1.9L7.6 3.73H5.56l10.92 16.44Z" />
                </svg>
              </a>
            </div>
          </Col>

          <Col xs={6} md={2}>
            <h3 className={heading}>Shop</h3>
            <ul className={linkList}>
              <li>
                <a href="#">New arrivals</a>
              </li>
              <li>
                <a href="#">Best sellers</a>
              </li>
              <li>
                <a href="#">Deals</a>
              </li>
              <li>
                <a href="#">Gift cards</a>
              </li>
            </ul>
          </Col>

          <Col xs={6} md={2}>
            <h3 className={heading}>Support</h3>
            <ul className={linkList}>
              <li>
                <a href="#">Track order</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Shipping info</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </Col>

          <Col xs={12} md={4} lg={3} className="ms-auto">
            <h3 className={heading}>Stay in the loop</h3>
            <p className={tagline}>Restock alerts and offers, once or twice a month.</p>
            {subscribed ? (
              <p className={tagline} role="status">
                You're subscribed.
              </p>
            ) : (
              <Form className={newsletterForm} onSubmit={handleSubscribe}>
                <Form.Control
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={newsletterInput}
                  aria-label="Email address"
                />
                <Button type="submit" className={newsletterButton}>
                  Subscribe
                </Button>
              </Form>
            )}
          </Col>
        </Row>

        <div className={bottomBar}>
          <span>© {new Date().getFullYear()} ecoma. All rights reserved.</span>
          <div className={bottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
