
export const ucfirst = value => 
  `${value.charAt(0).toUpperCase()}${value.substring(1)}`


export const upcase = value =>
  value.split(' ').map(word => ucfirst(word)).join(' ')

export const unhandleize = value =>
  upcase(value.replace(/-/g, ' '))

export const unescape = value =>
  value
    .replace(/&amp;/g, '&').replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<').replace(/&quot;/g, '"')
