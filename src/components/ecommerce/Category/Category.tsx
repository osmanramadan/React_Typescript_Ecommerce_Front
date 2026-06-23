import { useState } from "react"
import { Link } from "react-router-dom"
import type {ICategory} from "../../../types/category"
import styles from './styles.module.css'

const {
  card,
  imageWrap,
  image,
  fallback,
  overlay,
  name: nameClass,
  description: descriptionClass,
} = styles



const CategoryItem = ({category} : {category:ICategory}) => {
  const [imgError, setImgError] = useState(false)

  return (
    <Link to={`/products/${category.slug}`} className={card}>
      <div className={imageWrap}>
        {!imgError ? (
          <img
            src={category.image}
            alt={category.name}
            className={image}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={fallback} aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 21V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M12 12c0-3.5-2.5-6-6.5-6.2C5.3 9.8 8 12.4 12 12Z" fill="currentColor" />
              <path d="M12 9c0-3.2 2.3-5.5 5.8-5.7C18 7 15.6 9.3 12 9Z" fill="currentColor" />
            </svg>
          </div>
        )}
        <div className={overlay} />
      </div>

      <h3 className={nameClass}>{category.name}</h3>
      <p className={descriptionClass}>{category.description}</p>
    </Link>
  )
}

export default CategoryItem