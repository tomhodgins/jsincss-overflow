export default (selector, options, stylesheet) => {
  const attr = (selector + options).replace(/\W/g, '')
  const features = {
    top: tag => tag.scrollTop > 0,
    right: tag => tag.scrollLeft + tag.offsetWidth < tag.scrollWidth,
    bottom: tag => tag.scrollTop + tag.offsetHeight < tag.scrollHeight,
    left: tag => tag.scrollLeft > 0
  }
  const result = Array.from(document.querySelectorAll(selector))
    .reduce((output, tag, count) => {
      options = Array.isArray(options) ? options : [options]
      if (options.every(test => features[test](tag))) {
        output.add.push({tag: tag, count: count})
        output.styles.push(
          stylesheet.replace(
            /:self|\$this|\[--self\]/g,
            `[data-overflow-${attr}="${count}"]`
          )
        )
      } else {
        output.remove.push(tag)
      }
      return output
    }, {add: [], remove: [], styles: []})
  result.add.forEach(tag => tag.tag.setAttribute(`data-overflow-${attr}`, tag.count))
  result.remove.forEach(tag => tag.setAttribute(`data-overflow-${attr}`, ''))
  return result.styles.join('\n')  
}
