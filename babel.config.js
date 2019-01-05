module.exports = {
  presets: ['poi/babel'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ]
  ]
}
