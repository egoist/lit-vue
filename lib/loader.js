module.exports = async function(content) {
  this.cacheable()
  const done = this.async()
  try {
    const result = await require('./compile')(content, this.resourcePath)
    done(null, result)
  } catch (error) {
    done(error)
  }
}
