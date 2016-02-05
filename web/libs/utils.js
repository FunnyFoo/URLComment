
export function afterCreated(time) {
  const now = new Date().getTime()
  const duration = Math.floor((now - new Date(time).getTime()) / 1000)
  const seconds = duration % 60
  const minutes = Math.floor(duration / 60) % 60
  const hours = Math.floor(duration / 3600) % 24
  const days = Math.floor(duration / 86400)

  if (days) return (days === 1) ? days + ' day' : days + ' days'
  else if (hours) return (hours === 1) ? hours + ' hour' : hours + ' hours'
  else if (minutes) return (minutes === 1) ? minutes + ' minute' : minutes + ' minutes'
  else return (seconds === 1) ? seconds + ' second' : seconds + ' seconds'
}
