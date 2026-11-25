const pending = []
let flushTimer = null

function send(eventType, eventData) {
  console.info('[adgeist]', eventType, eventData)
  window.adsbyadgeist.trackCustomEvent(eventType, eventData)
}

function flushWhenReady() {
  if (flushTimer) return
  flushTimer = setInterval(() => {
    if (!window.adsbyadgeist) return
    clearInterval(flushTimer)
    flushTimer = null
    pending.splice(0).forEach(([eventType, eventData]) => send(eventType, eventData))
  }, 300)
}

export function trackEvent(eventType, eventData = {}) {
  if (window.adsbyadgeist) {
    send(eventType, eventData)
    return
  }
  pending.push([eventType, eventData])
  flushWhenReady()
}
