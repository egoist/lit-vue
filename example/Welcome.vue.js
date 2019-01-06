import Vue from 'vue'
import Component from 'vue-class-component'
import { html } from 'lit-vue'

html`
  <template>
    <h1>{{ message }}</h1>
  </template>
`

@Component({
  props: {
    name: String
  }
})
export default class Welcome extends Vue {
  // computed
  get message () {
    return 'hello ' + this.name
  }
}
