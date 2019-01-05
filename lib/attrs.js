const reAttributes = /([\w-]+)\s*=\s*(?:(?:(["'])((?:(?!\2).)*)\2)|([\w-]+))|([\w-]+)/g

function camelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => {
    return letter.toUpperCase()
  })
}

exports.parseAttrs = attrString => {
  const attributes = {}

  let match = null

  let attrName = ''

  let attrValue = null

  if (!attrString) {
    return attributes
  }

  while ((match = reAttributes.exec(attrString))) {
    attrName = match[1] || match[5]
    if (!attrName) {
      continue
    }
    if (attrName.indexOf('-') !== -1) {
      attrName = camelCase(attrName)
    }
    attrValue = match[3] || match[4] || true
    attributes[attrName] = attrValue
  }

  return attributes
}

exports.stringifyAttrs = require('stringify-attributes')
