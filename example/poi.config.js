const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  chainWebpack(config) {
    const SFC_EXT = /\.vue\.[jt]s$/

    config.module.rule('js').exclude.add(SFC_EXT)

    config.module
      .rule('lit-vue')
      .test(SFC_EXT)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('lit-vue')
      .loader(require.resolve('../loader'))
  }
}
