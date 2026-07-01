import ContentLoader from 'react-content-loader'

type CategoriesSkeletonProps = {
  count?: number
}

const CategoriesSkeleton = ({ count = 6 }: CategoriesSkeletonProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '1.25rem',
      marginTop: '50px',
    }}
  >
    {Array.from({ length: count }).map((_, idx) => (
      <ContentLoader
        key={idx}
        speed={9}
        width={220}
        height={290}
        viewBox="0 0 220 290"
        backgroundColor="#f2f2f2"
        foregroundColor="#e6e6e6"
      >
        <rect x="57" y="291" rx="2" ry="2" width="140" height="10" />
        <rect x="265" y="37" rx="2" ry="2" width="140" height="10" />
        <rect x="-100" y="23" rx="2" ry="2" width="400" height="184" />
        <rect x="101" y="239" rx="0" ry="0" width="1" height="2" />
        <rect x="1" y="219" rx="0" ry="0" width="80" height="12" />
        <rect x="5" y="243" rx="0" ry="0" width="2" height="1" />
        <rect x="-6" y="247" rx="0" ry="0" width="117" height="27" />
      </ContentLoader>
    ))}
  </div>
)

export default CategoriesSkeleton
