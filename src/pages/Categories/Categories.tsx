import { useEffect, useMemo, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CategoryItem from '@components/ecommerce/Category/Category'
import styles from './styles.module.css'
import { useCategory } from '@hooks/useCategory'
import Loading from '@components/message/Loading/Loading'
import GridList from '@components/shared/GridList/GridList'

const { page, header, title, subtitle, empty } = styles
const CATEGORIES_PER_PAGE = 6

const Categories = () => {
  const { loading, records, error } = useCategory()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [records.length])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(records.length / CATEGORIES_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, records.length])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(records.length / CATEGORIES_PER_PAGE)),
    [records.length],
  )

  const currentCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE
    return records.slice(startIndex, startIndex + CATEGORIES_PER_PAGE)
  }, [currentPage, records])

  return (
    <Container className={page}>
      <Loading status={loading} error={error} type="category">
        <div className={header}>
          <h1 className={title}>Shop by category</h1>
          <p className={subtitle}>Find what you need, sourced and packaged responsibly.</p>
        </div>

        {records.length > 1 && loading === 'succeeded' ? (
          <>
            <GridList
              records={currentCategories}
              renderItem={(record) => <CategoryItem key={record.id} category={record} />}
            />

            {records.length > CATEGORIES_PER_PAGE && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <span className="mx-2">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className={empty}>
            <p>No categories found yet.</p>
          </div>
        )}
      </Loading>
    </Container>
  )
}

export default Categories
