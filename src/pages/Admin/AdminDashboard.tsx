import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import axiosInstance from '@api/axios'
import type { IOrder, IProduct } from '@types'

const emptyProductForm = {
  name: '',
  category: '',
  price: '',
  rating: '0',
  reviewCount: '0',
  image: '',
  badge: 'new',
  inStock: true,
  numInStock: '0',
}

const normalizeProduct = (product: any): IProduct => ({
  ...product,
  price: Number(product.price ?? 0),
  rating: Number(product.rating ?? 0),
  reviewCount: Number(product.review_count ?? product.reviewCount ?? 0),
  inStock: product.in_stock ?? product.inStock ?? true,
  numInStock: Number(product.num_in_stock ?? product.numInStock ?? 0),
})

const AdminDashboard = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const [error, setError] = useState('')
  const [productForm, setProductForm] = useState(emptyProductForm)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const loadAdminData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axiosInstance.get('/admin/orders'),
        axiosInstance.get('/admin/products'),
      ])

      setOrders(ordersRes.data)
      setProducts(productsRes.data.map(normalizeProduct))
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to load admin data')
    }
  }

  useEffect(() => {
    void loadAdminData()
  }, [])

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders],
  )

  const updateOrderStatus = async (orderId: number, status: IOrder['status']) => {
    try {
      await axiosInstance.patch(`/admin/orders/${orderId}/status`, { status })
      setOrders((current) =>
        current.map((order) => (order.id === orderId ? { ...order, status } : order)),
      )
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update order status')
    }
  }

  const handleProductSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = {
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        rating: Number(productForm.rating),
        reviewCount: Number(productForm.reviewCount),
        image: productForm.image,
        badge: productForm.badge,
        inStock: productForm.inStock,
        numInStock: Number(productForm.numInStock),
      }

      if (editingProductId) {
        const response = await axiosInstance.patch(`/admin/products/${editingProductId}`, payload)
        setProducts((current) =>
          current.map((product) => (product.id === editingProductId ? normalizeProduct(response.data) : product)),
        )
      } else {
        const response = await axiosInstance.post('/admin/products', payload)
        setProducts((current) => [normalizeProduct(response.data), ...current])
      }

      setProductForm(emptyProductForm)
      setEditingProductId(null)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const handleEditProduct = (product: IProduct) => {
    setEditingProductId(product.id)
    setProductForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      rating: String(product.rating),
      reviewCount: String(product.reviewCount || 0),
      image: product.image || '',
      badge: product.badge || 'new',
      inStock: product.inStock,
      numInStock: String(product.numInStock || 0),
    })
  }

  const handleDeleteProduct = async (productId: number) => {
    try {
      await axiosInstance.delete(`/admin/products/${productId}`)
      setProducts((current) => current.filter((product) => product.id !== productId))
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete product')
    }
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card body>
            <div className="text-muted">Total Orders</div>
            <h3>{orders.length}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card body>
            <div className="text-muted">Total Products</div>
            <h3>{products.length}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card body>
            <div className="text-muted">Revenue</div>
            <h3>${totalRevenue.toFixed(2)}</h3>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={5}>
          <Card>
            <Card.Header>{editingProductId ? 'Edit Product' : 'Add Product'}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleProductSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={productForm.name}
                    onChange={(e) => setProductForm((current) => ({ ...current, name: e.target.value }))}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    value={productForm.category}
                    onChange={(e) => setProductForm((current) => ({ ...current, category: e.target.value }))}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm((current) => ({ ...current, price: e.target.value }))}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={productForm.rating}
                        onChange={(e) => setProductForm((current) => ({ ...current, rating: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Review Count</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={productForm.reviewCount}
                        onChange={(e) => setProductForm((current) => ({ ...current, reviewCount: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Badge</Form.Label>
                      <Form.Select
                        value={productForm.badge}
                        onChange={(e) => setProductForm((current) => ({ ...current, badge: e.target.value }))}
                      >
                        <option value="new">new</option>
                        <option value="sale">sale</option>
                        <option value="bestseller">bestseller</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        value={productForm.numInStock}
                        onChange={(e) => setProductForm((current) => ({ ...current, numInStock: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    value={productForm.image}
                    onChange={(e) => setProductForm((current) => ({ ...current, image: e.target.value }))}
                  />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="In stock"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm((current) => ({ ...current, inStock: e.target.checked }))}
                  className="mb-3"
                />

                <div className="d-flex gap-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : editingProductId ? 'Update Product' : 'Add Product'}
                  </Button>
                  {editingProductId && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        setEditingProductId(null)
                        setProductForm(emptyProductForm)
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card>
            <Card.Header>Manage Orders</Card.Header>
            <Card.Body className="p-0">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id ?? `${order.userId}-${order.createdAt}`}>
                      <td>#{order.id}</td>
                      <td>{order.userId ?? 'Guest'}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <Form.Select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(Number(order.id), e.target.value as IOrder['status'])}
                          size="sm"
                        >
                          <option value="pending">pending</option>
                          <option value="paid">paid</option>
                          <option value="shipped">shipped</option>
                          <option value="completed">completed</option>
                        </Form.Select>
                      </td>
                      <td>
                        <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Header>Products</Card.Header>
        <Card.Body className="p-0">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.numInStock}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => handleEditProduct(product)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AdminDashboard
