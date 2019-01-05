const stringifyAttrs = (attrs = {}) => {
  const res = Object.keys(attrs).reduce((res, key) => {
    const value = attrs[key]
    return [...res, value === '' ? `${key}` : `${key}=${JSON.stringify(value)}`]
  }, [])
  return res.length > 0 ? ` ${res.join(' ')}` : ''
}

function render(node) {
  if (typeof node === 'string') return node
  return `<${node.tag}${stringifyAttrs(node.attrs)}>${node.content
    .map(render)
    .join('')}</${node.tag}>`
}

module.exports = render
