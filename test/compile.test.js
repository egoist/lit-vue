const compile = require('../lib/compile')

test('simple', async () => {
  const result = await compile(
    `
  import { html } from 'lit-vue'

  const template: string = html\`
  <div></div>
  <style scoped>
  div {
    color: red;
  }
  </style>

  <custom-block name="i18n">
  hello
  </custom-block>
  \`

  export default {
    template
  }
  `,
    'foo.ts'
  )

  expect(result).toMatchSnapshot()
})
