import pick from 'lodash/pick'

export const getLocation = url => {
  const a = document.createElement('a')
  a.href = url

  return pick(a, [
    'hash',
    'host',
    'hostname',
    'href',
    'origin',
    'pathname',
    'port',
    'protocol',
    'search'
  ])
}
