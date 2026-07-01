import ContentLoader from 'react-content-loader'

type CartSkeletonProps = {
  count?: number
}

const CartSkeleton = ({ count = 3 }: CartSkeletonProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2rem' }}>
    {Array.from({ length: count }).map((_, index) => (
      <ContentLoader
        key={index}
        speed={2}
        width="100%"
        height={160}
        viewBox="0 0 900 160"
        backgroundColor="#f2f2f2"
        foregroundColor="#e6e6e6"
        style={{ width: '100%' }}
      >
        <rect x="0" y="0" rx="16" ry="16" width="100%" height="160" />
        <rect x="20" y="20" rx="12" ry="12" width="120" height="120" />
        <rect x="160" y="28" rx="6" ry="6" width="200" height="18" />
        <rect x="160" y="60" rx="6" ry="6" width="260" height="14" />
        <rect x="160" y="90" rx="6" ry="6" width="160" height="14" />
        <rect x="760" y="36" rx="6" ry="6" width="90" height="20" />
        <rect x="760" y="70" rx="6" ry="6" width="70" height="20" />
      </ContentLoader>
    ))}

    <ContentLoader
      speed={2}
      width="100%"
      height={180}
      viewBox="0 0 900 180"
      backgroundColor="#f2f2f2"
      foregroundColor="#e6e6e6"
      style={{ width: '100%' }}
    >
      <rect x="0" y="0" rx="16" ry="16" width="100%" height="180" />
      <rect x="20" y="28" rx="6" ry="6" width="180" height="18" />
      <rect x="20" y="62" rx="6" ry="6" width="260" height="14" />
      <rect x="20" y="96" rx="6" ry="6" width="220" height="14" />
      <rect x="720" y="124" rx="8" ry="8" width="140" height="34" />
    </ContentLoader>
  </div>
)

export default CartSkeleton
