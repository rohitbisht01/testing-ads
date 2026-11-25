import { useEffect, useRef } from 'react'
import { trackEvent } from './analytics.js'

const READ_TIME_MS = 30000

export function useArticleTracking(article) {
  const endRef = useRef(null)
  const viewSentRef = useRef(false)
  const readSentRef = useRef(false)

  useEffect(() => {
    if (viewSentRef.current) return
    viewSentRef.current = true
    trackEvent('article_view', { articleId: article.id, title: article.title })
  }, [article.id, article.title])

  useEffect(() => {
    const sendRead = (trigger) => {
      if (readSentRef.current) return
      readSentRef.current = true
      trackEvent('article_read', { articleId: article.id, trigger })
    }

    const timer = setTimeout(() => sendRead('time'), READ_TIME_MS)
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) sendRead('scroll')
    })
    if (endRef.current) observer.observe(endRef.current)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [article.id])

  return endRef
}
