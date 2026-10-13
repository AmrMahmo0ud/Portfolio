import { useEffect, useRef, useState } from 'react'

const canObserve = typeof window !== 'undefined' && 'IntersectionObserver' in window

/**
 * Fades its children in the first time they scroll into view. Without
 * IntersectionObserver (or with reduced motion, via CSS) content is shown as-is.
 */
export default function Reveal({ as: Tag = 'div', step = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(!canObserve)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  const classes = [canObserve && 'reveal', visible && 'is-visible', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={classes} style={{ '--reveal-step': step }} {...rest}>
      {children}
    </Tag>
  )
}
