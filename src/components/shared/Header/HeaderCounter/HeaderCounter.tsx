import type { ComponentType, SVGProps } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

interface HeaderCounterProps {
  toPage: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  itemCount: number
}

const HeaderCounter = ({ toPage, icon: Icon, itemCount }: HeaderCounterProps) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className={styles.counterIcon}
      onClick={() => navigate(`/${toPage}`)}
      aria-label={`${toPage}, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
    >
      <Icon className={styles.counterSvg} />
      {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
    </button>
  )
}

export default HeaderCounter
