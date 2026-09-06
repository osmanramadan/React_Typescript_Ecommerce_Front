import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type FooterItem = {
  title: string
  description: string
  badge?: string
}

type FooterSectionPageProps = {
  title: string
  description: string
  items: FooterItem[]
  ctaText?: string
  ctaTo?: string
}

function FooterSectionPage({
  title,
  description,
  items,
  ctaText = 'Continue shopping',
  ctaTo = '/products',
}: FooterSectionPageProps) {
  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold mb-2">eco mark</p>
          <h1 className="mb-0">{title}</h1>
        </div>

        <Link to={ctaTo}>
          <Button variant="primary">{ctaText}</Button>
        </Link>
      </div>

      <p className="text-muted mb-4" style={{ maxWidth: '700px' }}>
        {description}
      </p>

      <Row className="g-4">
        {items.map((item) => (
          <Col key={item.title} md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                {item.badge && (
                  <span className="badge bg-light text-primary mb-3">{item.badge}</span>
                )}
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-muted mb-0">{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export function NewArrivalsPage() {
  return (
    <FooterSectionPage
      title="New arrivals"
      description="Fresh picks added to our collection for modern everyday living."
      items={[
        { title: 'Bamboo table set', description: 'A compact kitchen upgrade for smaller spaces.', badge: 'New' },
        { title: 'Compost caddy', description: 'Simple waste sorting that fits your daily routine.', badge: 'Popular' },
        { title: 'Reusable travel kit', description: 'Lightweight essentials for everyday carry and commuting.', badge: 'Fresh' },
      ]}
    />
  )
}

export function BestSellersPage() {
  return (
    <FooterSectionPage
      title="Best sellers"
      description="Our most loved essentials chosen by customers who want practical, well-made pieces."
      items={[
        { title: 'Bamboo toothbrush set', description: 'A clean swap for everyday oral care routines.', badge: 'Top pick' },
        { title: 'Reusable produce bags', description: 'Made for easier weekly shopping and less plastic use.', badge: 'Best value' },
        { title: 'Seed starter kit', description: 'A simple way to begin a more sustainable home garden.', badge: 'Loved' },
      ]}
    />
  )
}

export function DealsPage() {
  return (
    <FooterSectionPage
      title="Deals"
      description="Limited-time offers on eco-friendly essentials and everyday favorites."
      items={[
        { title: 'Weekend essentials', description: 'Bundle savings on practical home and personal care items.', badge: 'Save 25%' },
        { title: 'Refill bundle', description: 'Smart value packs for daily routines and repeat purchases.', badge: 'Bundle' },
        { title: 'Family pantry picks', description: 'Useful staples and kitchen favorites at a lower price.', badge: 'Limited' },
      ]}
    />
  )
}

export function GiftCardsPage() {
  return (
    <FooterSectionPage
      title="Gift cards"
      description="Send a thoughtful, flexible gift that helps someone choose what they love most."
      items={[
        { title: 'Digital gift card', description: 'Instant email delivery for birthdays, thank-yous, and celebrations.', badge: 'Instant' },
        { title: 'Classic ecomark card', description: 'Great for gifting everyday essentials with flexibility.', badge: 'Popular' },
        { title: 'Seasonal bundle card', description: 'Perfect for holidays and thoughtful surprises any time of year.', badge: 'New' },
      ]}
    />
  )
}

export function TrackOrderPage() {
  return (
    <FooterSectionPage
      title="Track order"
      description="Follow your delivery status and stay updated until your package arrives."
      items={[
        { title: 'Order status', description: 'Check when your order has been packed, shipped, or delivered.', badge: 'Live' },
        { title: 'Delivery timing', description: 'See estimated arrival windows for each item in your order.', badge: 'Fast' },
        { title: 'Support help', description: 'Need help? We can guide you through a delayed or missing order.', badge: 'Assistance' },
      ]}
      ctaText="View my orders"
      ctaTo="/orders"
    />
  )
}

export function ReturnsPage() {
  return (
    <FooterSectionPage
      title="Returns"
      description="We make it easy to return items that do not meet expectations."
      items={[
        { title: 'Return window', description: 'Most unused items can be returned within the return period listed at purchase.', badge: 'Easy' },
        { title: 'Refunds', description: 'Refunds are issued as soon as your return is reviewed.', badge: 'Simple' },
        { title: 'Exchange support', description: 'Need a different size or style? We can help with replacements.', badge: 'Helpful' },
      ]}
    />
  )
}

export function ShippingInfoPage() {
  return (
    <FooterSectionPage
      title="Shipping info"
      description="Everything you need to know about delivery options, timing, and order updates."
      items={[
        { title: 'Standard delivery', description: 'Reliable shipping for everyday orders and essentials.', badge: '3-5 days' },
        { title: 'Express delivery', description: 'Faster delivery for time-sensitive purchases.', badge: 'Priority' },
        { title: 'Tracking updates', description: 'Stay informed with delivery status notifications and order alerts.', badge: 'Updated' },
      ]}
    />
  )
}



export function PrivacyPage() {
  return (
    <FooterSectionPage
      title="Privacy"
      description="Your personal information is handled with care and transparency."
      items={[
        { title: 'Data protection', description: 'We use customer data only to process orders and improve your experience.', badge: 'Safe' },
        { title: 'Cookies', description: 'We use limited cookies to understand browsing behavior and keep the site working smoothly.', badge: 'Essential' },
        { title: 'Your choices', description: 'You can manage your settings and contact support if you need help.', badge: 'Control' },
      ]}
      ctaText="Back home"
      ctaTo="/"
    />
  )
}

export function TermsPage() {
  return (
    <FooterSectionPage
      title="Terms"
      description="Helpful information about ordering, use of the site, and account responsibilities."
      items={[
        { title: 'Orders and payments', description: 'Orders are subject to product availability and order confirmation.', badge: 'Updated' },
        { title: 'Account usage', description: 'Users are responsible for account accuracy and secure login details.', badge: 'Important' },
        { title: 'Site access', description: 'We aim to provide a smooth shopping experience while maintaining service quality.', badge: 'Fair use' },
      ]}
      ctaText="Explore products"
      ctaTo="/products"
    />
  )
}

export function CookiesPage() {
  return (
    <FooterSectionPage
      title="Cookies"
      description="We use cookies to keep the site functional, personal, and easy to use."
      items={[
        { title: 'Essential cookies', description: 'These keep pages, cart, and checkout features working correctly.', badge: 'Required' },
        { title: 'Preference cookies', description: 'These remember your chosen settings and browsing preferences.', badge: 'Helpful' },
        { title: 'Analytics', description: 'We use limited data to understand general browsing patterns and improve site quality.', badge: 'Insights' },
      ]}
      ctaText="Back home"
      ctaTo="/"
    />
  )
}
