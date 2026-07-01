import { Container } from 'react-bootstrap'
import CategoryItem from '@components/ecommerce/Category/Category'
import styles from './styles.module.css'
import { useCategory } from '@hooks/useCategory'
import Loading from '@components/message/Loading/Loading'
import GridList from '@components/shared/GridList/GridList'

const { page, header, title, subtitle , empty } = styles

const Categories = () => {
  const { loading, records, error } = useCategory()

  return (
    <Container className={page}>
      <Loading status={loading} error={error} type="category">
        <div className={header}>
          <h1 className={title}>Shop by category</h1>
          <p className={subtitle}>Find what you need, sourced and packaged responsibly.</p>
        </div>

        {records.length > 1 && loading === 'succeeded' ? (
          <GridList
            records={records}
            renderItem={(record) => <CategoryItem key={record.id} category={record} />}
          />
        ) : (
          <div className={empty}>
            <p>No categories found yet . </p>
          </div>  )
        
        }
      </Loading>
    </Container>
  )
}

export default Categories
