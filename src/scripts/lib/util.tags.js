
const getValueByPrefix = (tags, param) => {
  const prefix = `__${param}:`
  const tag = tags.find(tag => tag.indexOf(prefix) === 0)

  return tag ? tag.slice(prefix.length) : tag
}

/**
 * Product Info
 */
export const getSynopsis = tags =>
  getValueByPrefix(tags, 'synopsis')
