# lit-vue

[![NPM version](https://badgen.net/npm/v/lit-vue)](https://npmjs.com/package/lit-vue) [![NPM downloads](https://badgen.net/npm/dm/lit-vue)](https://npmjs.com/package/lit-vue) [![CircleCI](https://badgen.net/circleci/github/egoist/lit-vue/master)](https://circleci.com/gh/egoist/lit-vue/tree/master) [![donate](https://badgen.net/badge/support%20me/donate/ff69b4)](https://patreon.com/egoist) [![chat](https://badgen.net/badge/chat%20on/discord/7289DA)](https://chat.egoist.moe)

**Please consider [donating](https://www.patreon.com/egoist) to this project's author, [EGOIST](#author), to show your ❤️ and support.**

## Introduction

All the features of `.vue` SFC are now available in your `.js` and `.ts` files.

Combine `vue-loader` and `lit-vue/loader` to make the dream come to reality.

## Install

```bash
yarn add lit-vue --dev
```

## Example

Previously you can use `.vue` single-file component like this:

```vue
<template>
  <div>
    <h1>hello</h1>
    <hr />
    <button @click="inc">{{ count }}</button>
  </div>
</template>

<script>
export default {
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
</script>

<style scoped>
h1 {
  color: red;
}
</style>
```

Now with `lit-html` you can use `.js` and `.ts` extensions:

```js
import { html } from 'lit-vue'

html`
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
```

<details><summary>You might need to configure the ESLint rule: no-unused-expressions</summary><br>

ESLint might complain about the the <code>html&#x60;&#x60;</code> expression not being used when you enabled the rule: [no-unused-expressions](http://eslint.cn/docs/rules/no-unused-expressions), there're three ways to solve it:

1. Disable this rule for tagged template expression in your ESLint config

```json
{
  "rules": {
    "no-unused-expressions": ["error", { "allowTaggedTemplates": true }]
  }
}
```

2. Or export it

```js
export const template = html`
  <div>{{ count }}</div>
`
```

You can just assign it to a variable and export it, though the exported variable will never be used. The return value of `html` tag is always undefined.

3. Or use it as component option

```js
const template = html`
  <div>{{ count }}</div>
`

export default {
  template,
  data() {
    return {
      count: 0
    }
  }
}
```

Similar to #2, this may look more natural because `template` is a legit Vue component option.

</details>

## How to use

### Use with webpack

```js
module.exports = {
  module: {
    rules: [
      {
        // Match .js .ts files
        test: [/\.[jt]s$/],
        // Exclude .vue.js .vue.ts files
        // Since we want lit-vue to transform them into Vue SFC instead
        exclude: [/\.vue.[jt]s/]
        loader: 'babel-loader' // Use your desired loader
      },
      // Handle .vue.js .vue.ts with lit-vue/loader and vue-loader
      {
        test: [/\.vue.[jt]s$/],
        use: [
          'vue-loader',
          'lit-vue/loader'
        ]
      },
      // This rule is also necessary even if you don't directly use .vue files
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
```

That's it, [all the goodies](https://vue-loader.vuejs.org/) of `.vue` SFC are available in your `.vue.js` and `.vue.ts` files now!

### Custom blocks

You can also use [custom blocks](https://vue-loader.vuejs.org/guide/custom-blocks.html) in the `html` tag:

```js
html`
  <custom-block name="i18n"> { "en": {} } </custom-block>
`
```

It will be converted to:

```vue
<i18n>
{
  "en": {}
}
</i18n>
```

### Syntax higlighting

To highlight the code inside `html` template tag, you can use following editor plugins:

- VSCode: [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
- Something is missing? Send a PR to add it here!

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**lit-vue** © EGOIST, Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/lit-vue/contributors)).

> [Website](https://egoist.sh) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily)
