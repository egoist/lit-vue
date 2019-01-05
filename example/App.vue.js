// eslint-disable-next-line import/no-unresolved
import { html } from 'lit-vue'
import Welcome from './Welcome.vue'

const template = html`
  <div>
    <Welcome name="Guest" />
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
  },
  components: {
    Welcome
  }
}
