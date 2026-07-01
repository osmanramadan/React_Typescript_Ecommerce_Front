import style from './styles.module.css'

const { grid } = style

type GridListProps<T> = {
  records: T[]
  renderItem: (record: T) => React.ReactNode
}

const GridList = <T,>({ records, renderItem }: GridListProps<T>) => {
  const renderList =
    records.length > 0 ? records.map((record) => renderItem(record)) : 'there are no items'
  console.log('rendering from gridlist')
  return <div className={grid}>{renderList}</div>
}

export default GridList
