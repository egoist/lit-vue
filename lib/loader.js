module.exports = async function(content) {
  this.cacheable()
  const done = this.async()
  try {
    const result = await require('./compile')(content, this.resourcePath)
    console.log(this.resourcePath, result)
    done(null, result)
  } catch (error) {
    done(error)
  }
}
