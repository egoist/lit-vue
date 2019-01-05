const compile = require('../lib/compile')

test('simple', async () => {
  const result = await compile(
    `
  import html from 'lit-vue/html'

  const template: string = html\`
  <div></div>
  <style scoped>
  div {
    color: red;
  }
  </style>
  \`

  export default {
    template
  }
  `,
    'foo.ts'
  )
  expect(result).toMatchSnapshot()
})
