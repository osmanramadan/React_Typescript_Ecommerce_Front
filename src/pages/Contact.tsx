import { Button, Col, Container, Form, Row } from 'react-bootstrap'

export default function Contact() {
  const brandBlue = '#0E53BA'
  const brandLight = '#EAF3FF'

  const infoCards = [
    { icon: '📍', title: 'Visit us', text: '123 Market Street, Dubai, UAE' },
    { icon: '📞', title: 'Call us', text: '+971 55 123 4567' },
    { icon: '✉️', title: 'Email us', text: 'support@eco-ma.com' },
  ]

  return (
    <Container className="py-4" style={{ paddingTop: '42px' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, #edf5ff 0%, #dfeeff 38%, #d3e4ff 100%)',
          borderRadius: '26px',
          padding: '38px 30px',
          marginBottom: '32px',
          border: '1px solid rgba(14, 83, 186, 0.12)',
          boxShadow: '0 18px 36px rgba(14, 83, 186, 0.08)',
        }}
      >
        <Row className="align-items-center g-4">
          <Col md={7}>
            <h1 style={{ fontSize: 'clamp(2.1rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>
              We’d love to hear from you.
            </h1>
            <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '600px', marginBottom: 0 }}>
              Ask a question, share feedback, or get help with your order. Our support team is ready to assist.
            </p>
          </Col>

          <Col md={5} className="text-center">
            <div
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 18px 35px rgba(14, 83, 186, 0.12)',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 8 }}>💬</div>
              <div style={{ color: brandBlue, fontWeight: 700 }}>Support team</div>
            </div>
          </Col>
        </Row>
      </section>

      <section className="mb-5">
        <Row className="g-3">
          {infoCards.map((item) => (
            <Col key={item.title} md={4}>
              <div
                className="h-100"
                style={{
                  background: '#fff',
                  border: '1px solid #edf2f7',
                  borderRadius: '18px',
                  padding: '26px 20px',
                  textAlign: 'center',
                  boxShadow: '0 10px 20px rgba(15, 23, 42, 0.03)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{item.icon}</div>
                <h5 style={{ marginBottom: 8 }}>{item.title}</h5>
                <p className="text-muted mb-0">{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <Row className="g-4 align-items-start">
          <Col lg={5}>
            <div
              style={{
                background: `linear-gradient(135deg, ${brandBlue} 0%, #0f66d9 100%)`,
                color: '#fff',
                borderRadius: '22px',
                padding: '28px 24px',
                minHeight: '100%',
              }}
            >
              <h3 className="text-white mb-3">Need help fast?</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
                We are here to answer product questions, order concerns, and support requests.
              </p>

              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <strong>Business hours:</strong>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>Mon - Sat: 9:00 AM - 8:00 PM</div>
                </div>
                <div>
                  <strong>Response time:</strong>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>Usually within 1 business day</div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <div
              style={{
                background: '#fff',
                borderRadius: '22px',
                border: '1px solid #edf2f7',
                padding: '28px',
                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
              }}
            >
              <h3 className="mb-4">Send us a message</h3>

              <Form>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Full name</Form.Label>
                      <Form.Control type="text" placeholder="Your name" />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="you@example.com" />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Subject</Form.Label>
                      <Form.Control type="text" placeholder="How can we help?" />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Button
                      type="submit"
                      size="lg"
                      style={{ backgroundColor: brandBlue, borderColor: brandBlue, paddingInline: '26px' }}
                    >
                      Send message
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  )
}
