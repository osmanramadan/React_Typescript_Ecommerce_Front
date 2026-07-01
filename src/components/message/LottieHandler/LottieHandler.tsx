import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import notFound from '@assets/lottieFiles/Not-Found.json'
import error from '@assets/lottieFiles/Error.json'
import initLoading from '@assets/lottieFiles/Init-Loading.json'
import loading from '@assets/lottieFiles/Loading.json'

import styles from './styles.module.css'

const lottieFilesMap = {
  notFound,
  error,
  loading,
  initLoading
}

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap
  message?: string
  className?: string
  width?: number | string
  height?: number | string
  loop?: boolean
  autoplay?: boolean
}

const LottieHandler = ({
  type,
  message,
  className = '',
  width = 400,
  height = 400,
  loop = true,
  autoplay = true,
}: LottieHandlerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      animationData: lottieFilesMap[type] as any,
    })

    return () => {
      animation.destroy()
    }
  }, [type, loop, autoplay])

  const containerClass = [styles.wrapper, className].filter(Boolean).join(' ')
  const messageClass = [styles.message, type === 'error' ? styles.error : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClass}>
      <div ref={containerRef} className={styles.animation} style={{ width, height }} />
      {message && <span className={messageClass}>{message}</span>}
    </div>
  )
}

export default LottieHandler
