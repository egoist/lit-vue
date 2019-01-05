const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse')
const generator = require('@babel/generator')
const posthtml = require('posthtml')
const renderHTML = require('./renderHTML')

module.exports = async (content, filename = 'foo.js') => {
  const ext = path.extname(filename).slice(1)
  const ast = parse(content, {
    sourceType: 'module',
    sourceFilename: filename,
    plugins: [
      ext === 'ts' && 'typescript',
      'classProperties',
      'objectRestSpread',
      'optionalChaining',
      'asyncGenerators'
    ].filter(Boolean)
  })

  let html = ''
  const styles = []

  // Extract template the code
  traverse.default(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value !== 'lit-vue') {
        return
      }

      for (const specifier of path.node.specifiers) {
        if (specifier.type !== 'ImportSpecifier') {
          continue
        }

        if (specifier.imported.name === 'html') {
          const binding = path.scope.getBinding(specifier.local.name)
          for (let i = 0; i < binding.referencePaths.length; i++) {
            if (i > 0) {
              throw new Error(
                `[lit-vue] You can only call \`html\` once in a single-file component.`
              )
            }
            const ref = binding.referencePaths[i].parentPath
            html = ref.get('quasi').evaluate().value
            ref.replaceWith({ type: 'Identifier', name: 'undefined' })
          }
        }
      }

      // Remove the import
      path.remove()
    }
  })

  // Extract styles from the template
  const template = await posthtml(
    [
      tree => {
        tree.walk(node => {
          if (node.tag === 'style') {
            styles.push(renderHTML(node))
            return
          }
          return node
        })
        return tree
      }
    ],
    { sync: false }
  )
    .process(html)
    .then(res => {
      return res.html.trim()
    })

  return `
  <template>
  ${template}
  </template>

  <script lang="${ext}">
  ${generator.default(ast).code}
  </script>

  ${styles.join('\n')}
    `
}
