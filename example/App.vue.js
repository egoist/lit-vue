// eslint-disable-next-line import/no-unresolved
import { html } from 'lit-vue'

const template = html`
  <div>
    <h1>hello</h1>
    <hr />
    <button @click="inc">{{ count }}</button>
  </div>

  <style scoped>
    h1 {
      color: red;
    }
  </style>
`

export default {
  template,
  data() {
    return {
      count: 0
    }
  },
  methods: {
    inc() {
      this.count++
    }
  }
}
