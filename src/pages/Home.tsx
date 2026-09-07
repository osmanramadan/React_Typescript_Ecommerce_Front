import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import axiosInstance from '@api/axios'
import type { IProduct } from '@types'

const normalizeProduct = (product: any): IProduct => ({
  ...product,
  price: Number(product.price ?? 0),
  rating: Number(product.rating ?? 0),
  reviewCount: Number(product.review_count ?? product.reviewCount ?? 0),
  numInStock: Number(product.num_in_stock ?? product.numInStock ?? 0),
  inStock: product.in_stock ?? product.inStock ?? true,
})

export default function Home() {
  const brandBlue = '#0E53BA'
  const brandLight = '#EAF3FF'
  const brandAccent = '#15B8A6'

  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadFeaturedProducts = async () => {
      try {
        const response = await axiosInstance.get<any[]>('/products')

        if (!isMounted) return

        const products = response.data.slice(0, 3).map(normalizeProduct)
        setFeaturedProducts(products)
      } catch (error) {
        if (isMounted) {
          setFeaturedProducts([])
        }
      } finally {
        if (isMounted) {
          setFeaturedLoading(false)
        }
      }
    }

    loadFeaturedProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const features = [
    {
      title: 'Quality products',
      text: 'Shop trusted essentials for home, pets, kids, and everyday life.',
    },
    {
      title: 'Fast delivery',
      text: 'Quick shipping and smooth checkout for a better online shopping experience.',
    },
    {
      title: 'Safe shopping',
      text: 'Enjoy secure payments, easy returns, and customer support whenever you need it.',
    },
  ]

  return (
    <Container className="py-4" style={{ paddingTop: '42px' }}>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #edf5ff 0%, #dfeeff 38%, #d3e4ff 100%)',
          borderRadius: '26px',
          padding: '36px 30px',
          marginBottom: '30px',
          border: '1px solid rgba(13, 110, 253, 0.12)',
          boxShadow: '0 18px 36px rgba(13, 110, 253, 0.10)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 18%, rgba(14,83,186,0.16), transparent 26%), radial-gradient(circle at 85% 75%, rgba(14,83,186,0.12), transparent 30%)',
          }}
        />

        <Row className="align-items-center g-4 position-relative">
          <Col md={7}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.06em',
                  color: brandBlue,
                }}
              >
                eco
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 52,
                  height: 30,
                  padding: '0 10px',
                  borderRadius: 999,
                  background: brandBlue,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  boxShadow: '0 10px 20px rgba(13, 110, 253, 0.28)',
                }}
              >
                market
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 3.4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 14,
                color: '#0f172a',
              }}
            >
              Smart shopping starts here.
            </h1>

            <p style={{ fontSize: '1.05rem', color: '#334155', maxWidth: '560px', marginBottom: 22 }}>
              Shop trusted essentials, discover the latest picks, and enjoy a faster, easier buying
              experience designed around your everyday life.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Button href="/products" size="lg" className="fw-semibold px-4" style={{ backgroundColor: brandBlue, borderColor: brandBlue }}>
                Shop now
              </Button>
              <Button href="/categories" variant="outline-primary" size="lg" className="fw-semibold px-4" style={{ borderColor: brandBlue, color: brandBlue }}>
                Explore categories
              </Button>
            </div>
          </Col>

          <Col md={5} className="text-center">
            <div
              style={{
                background: '#ffffff',
                borderRadius: '22px',
                padding: '14px',
                boxShadow: '0 18px 35px rgba(14, 83, 186, 0.12)',
                maxWidth: '400px',
                margin: '0 auto',
                border: '1px solid rgba(14, 83, 186, 0.10)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80"
                alt="Eco-mark product banner"
                style={{ width: '100%', height: '270px', objectFit: 'cover', borderRadius: '16px' }}
              />
            </div>
          </Col>
        </Row>
      </section>

      <section className="mb-4" style={{ marginTop: '48px' }}>
        <h2 className="mb-4">Why customers choose us</h2>
        <Row className="g-3">
          {features.map((feature) => (
            <Col key={feature.title} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: 52, height: 52, background: brandLight, color: brandAccent, fontSize: 20 }}
                  >
                    ✓
                  </div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text className="text-muted">{feature.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="mb-5" style={{ marginTop: '48px' }}>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h3 className="mb-3">Your everyday store, made simpler</h3>
            <p className="text-muted mb-3">
              Eco-market brings together trusted products, smooth browsing, and a cleaner shopping flow so
              you can discover what matters without the stress.
            </p>
            <p className="text-muted mb-0">
              Whether you are shopping for essentials, gifts, or lifestyle upgrades, we help you save time
              and shop with confidence.
            </p>
          </Col>
          <Col md={6}>
            <div
              style={{
                background: '#f8f9fa',
                borderRadius: '20px',
                padding: '24px',
                minHeight: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e9ecef',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🛍️</div>
                <h4 className="mb-2">Fresh deals every week</h4>
                <p className="text-muted mb-0">Explore trending items and special offers curated for you.</p>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      <section style={{ marginTop: '56px', marginBottom: '40px' }}>
        <h2 className="mb-4">Trending categories</h2>
        <Row className="g-3">
          {[
            { name: 'Home essentials', icon: '🏠' },
            { name: 'Pet care', icon: '🐾' },
            { name: 'Kitchen', icon: '🍽️' },
            { name: 'Baby needs', icon: '🍼' },
          ].map((item) => (
            <Col key={item.name} md={3} sm={6} xs={12}>
              <Card className="h-100 border-0 shadow-sm text-center">
                <Card.Body style={{ padding: '26px 18px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>{item.icon}</div>
                  <Card.Title style={{ fontSize: '1.05rem', marginBottom: 0 }}>{item.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section style={{ marginTop: '56px', marginBottom: '40px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="mb-0">Popular picks</h2>
          <Button href="/products" variant="outline-primary" style={{ borderColor: brandBlue, color: brandBlue }}>
            View all products
          </Button>
        </div>

        {featuredLoading ? (
          <Row className="g-3">
            {[1, 2, 3].map((item) => (
              <Col key={item} md={4} sm={6} xs={12}>
                <Card className="h-100 border-0 shadow-sm overflow-hidden">
                  <div
                    style={{
                      height: '180px',
                      background: '#f3f6fb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8aa3c2',
                      fontWeight: 700,
                    }}
                  >
                    Loading...
                  </div>
                  <Card.Body>
                    <div style={{ height: 14, background: '#edf3ff', borderRadius: 8, marginBottom: 12 }} />
                    <div style={{ height: 14, width: '70%', background: '#edf3ff', borderRadius: 8, marginBottom: 12 }} />
                    <div style={{ height: 12, width: '60%', background: '#edf3ff', borderRadius: 8 }} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : featuredProducts.length > 0 ? (
          <Row className="g-3">
            {featuredProducts.map((product) => (
              <Col key={product.id} md={4} sm={6} xs={12}>
                <Card className="h-100 border-0 shadow-sm overflow-hidden">
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    {product.badge && (
                      <span
                        className="d-inline-block mb-2 px-2 py-1 rounded-pill"
                        style={{ background: brandLight, color: brandBlue, fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        {product.badge}
                      </span>
                    )}
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-muted mb-3">
                      {product.rating.toFixed(1)} ★ · {product.reviewCount} reviews
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong style={{ color: brandBlue, fontSize: '1.05rem' }}>${product.price.toFixed(2)}</strong>
                      <Button href="/products" size="sm" style={{ backgroundColor: brandBlue, borderColor: brandBlue }}>
                        Shop now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-muted">No featured products available right now.</div>
        )}
      </section>

      <section style={{ marginTop: '56px', marginBottom: '40px' }}>
        <h2 className="mb-4">How it works</h2>
        <Row className="g-3">
          {[
            { step: '01', title: 'Browse', text: 'Explore categories and discover products that fit your routine.' },
            { step: '02', title: 'Choose', text: 'Save favorites, compare options, and find your best fit.' },
            { step: '03', title: 'Order', text: 'Enjoy fast checkout, trusted support, and easy delivery.' },
          ].map((item) => (
            <Col key={item.step} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="mb-3" style={{ color: brandAccent, fontWeight: 800, fontSize: '0.85rem' }}>
                    {item.step}
                  </div>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="text-muted">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section style={{ marginTop: '56px', marginBottom: '20px' }}>
        <div
          className="text-center"
          style={{
            background: 'linear-gradient(135deg, #0E53BA 0%, #0f66d9 100%)',
            color: '#fff',
            borderRadius: '24px',
            padding: '42px 24px',
            boxShadow: '0 20px 40px rgba(14, 83, 186, 0.25)',
          }}
        >
          <h2 className="mb-3 text-white">Ready to shop smarter?</h2>
          <p className="mb-4 mx-auto text-white-50" style={{ maxWidth: '620px' }}>
            Discover essentials, save your favorites, and enjoy a better shopping experience every day.
          </p>
          <Button href="/products" size="lg" style={{color:"white",backgroundColor: '#fff', borderColor: '#fff', fontWeight: 700 }}>
            Start shopping
          </Button>
        </div>
      </section>
    </Container>
  )
}
