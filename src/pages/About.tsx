import { Button, Card, Col, Container, Row } from 'react-bootstrap'

export default function About() {
  const brandBlue = '#0E53BA'
  const brandLight = '#EAF3FF'
  const brandAccent = '#15B8A6'

  const values = [
    {
      title: 'Quality first',
      text: 'We focus on reliable products, practical design, and everyday usefulness.',
      icon: '✅',
    },
    {
      title: 'Customer care',
      text: 'Our team is here to make your shopping experience smooth and stress-free.',
      icon: '🤝',
    },
    {
      title: 'Smart value',
      text: 'We combine trusted essentials with competitive pricing and easy shopping.',
      icon: '💡',
    },
  ]

  const stats = [
    { number: '10k+', label: 'Happy customers' },
    { number: '500+', label: 'Products curated' },
    { number: '24/7', label: 'Support available' },
    { number: '4.8/5', label: 'Average rating' },
  ]

  return (
    <Container className="py-4" style={{ paddingTop: '42px' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, #edf5ff 0%, #dfeeff 38%, #d3e4ff 100%)',
          borderRadius: '26px',
          padding: '38px 30px',
          marginBottom: '36px',
          border: '1px solid rgba(14, 83, 186, 0.12)',
          boxShadow: '0 18px 36px rgba(14, 83, 186, 0.08)',
        }}
      >
        <Row className="align-items-center g-4">
          <Col md={7}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.06em', color: brandBlue }}>
                eco
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 54,
                  height: 30,
                  padding: '0 10px',
                  borderRadius: 999,
                  background: brandBlue,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                }}
              >
                mark
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.1rem)', fontWeight: 800, marginBottom: 16 }}>
              We make everyday shopping simpler.
            </h1>
            <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '620px', marginBottom: 22 }}>
              Eco-mark was built for people who want smart, trusted, and convenient shopping without the stress.
              We bring together practical essentials, thoughtful service, and a smooth digital experience.
            </p>
            <Button href="/products" size="lg" style={{ backgroundColor: brandBlue, borderColor: brandBlue }}>
              Discover products
            </Button>
          </Col>

          <Col md={5}>
            <div
              style={{
                background: '#fff',
                borderRadius: '22px',
                padding: '18px',
                boxShadow: '0 18px 35px rgba(14, 83, 186, 0.14)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
                alt="About Eco-mark"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '18px' }}
              />
            </div>
          </Col>
        </Row>
      </section>

      <section className="mb-5">
        <Row className="g-4 text-center">
          {stats.map((item) => (
            <Col key={item.label} md={3} sm={6} xs={12}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body style={{ padding: '30px 20px' }}>
                  <div style={{ color: brandBlue, fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>
                    {item.number}
                  </div>
                  <div className="text-muted">{item.label}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5">
        <h2 className="mb-4 text-center">What we stand for</h2>
        <Row className="g-3">
          {values.map((item) => (
            <Col key={item.title} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body style={{ padding: '28px 22px' }}>
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: 52,
                      height: 52,
                      background: brandLight,
                      fontSize: '1.5rem',
                    }}
                  >
                    {item.icon}
                  </div>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <div
              style={{
                background: '#f8f9fa',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid #e9ecef',
              }}
            >
              <h3 className="mb-3">Our story</h3>
              <p className="text-muted mb-3">
                Eco-mark started with a simple idea: shopping online should feel personal, clear, and reliable.
              </p>
              <p className="text-muted mb-3">
                We wanted to create a store that makes it easy to find useful products, save favorites, and
                shop with confidence every day.
              </p>
              <p className="text-muted mb-0">
                Today, we continue to grow with that same vision—helping customers discover useful essentials for
                home, life, and family routines.
              </p>
            </div>
          </Col>

          <Col md={6}>
            <div
              style={{
                background: `linear-gradient(135deg, ${brandBlue} 0%, #0f66d9 100%)`,
                color: '#fff',
                borderRadius: '20px',
                padding: '28px',
                minHeight: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>🌍</div>
              <h3 className="text-white mb-3">Built around real life</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 0 }}>
                We focus on everyday needs, practical products, and a shopping experience that feels easy and dependable.
              </p>
            </div>
          </Col>
        </Row>
      </section>

      <section className="text-center" style={{ marginTop: '40px' }}>
        <h3 className="mb-3">Ready to explore?</h3>
        <p className="text-muted mb-4">Browse products made for comfort, convenience, and everyday life.</p>
        <Button href="/products" size="lg" style={{ backgroundColor: brandBlue, borderColor: brandBlue }}>
          Shop now
        </Button>
      </section>
    </Container>
  )
}
