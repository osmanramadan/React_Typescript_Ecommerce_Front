import ContentLoader from 'react-content-loader'

type ProductsSkeletonProps = {
  count?: number
}

const ProductsSkeleton = ({ count = 5 }: ProductsSkeletonProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
      gap: '20px',
      marginTop: '50px',
    }}
  >
    {Array.from({ length: count }).map((_, index) => (
      <ContentLoader
        key={index}
        speed={2}
        width="100%"
        height={330}
        viewBox="0 0 280 330"
        backgroundColor="#f2f2f2"
        foregroundColor="#e6e6e6"
        style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}
      >
        <rect x="0" y="0" rx="16" ry="16" width="280" height="180" />
        <rect x="0" y="204" rx="6" ry="6" width="200" height="18" />
        <rect x="0" y="236" rx="6" ry="6" width="140" height="14" />
        <rect x="0" y="262" rx="6" ry="6" width="110" height="14" />
        <rect x="0" y="294" rx="6" ry="6" width="90" height="20" />
        <rect x="220" y="290" rx="10" ry="10" width="60" height="28" />
      </ContentLoader>
    ))}
  </div>
)

export default ProductsSkeleton
