export default (selector, options, stylesheet) => {

  let styles = ''
  let count = 0

  const features = {
    top: tag => tag.scrollTop > 0,
    right: tag => tag.scrollLeft + tag.offsetWidth < tag.scrollWidth,
    bottom: tag => tag.scrollTop + tag.offsetHeight < tag.scrollHeight,
    left: tag => tag.scrollLeft > 0
  }

  options = Array.isArray(options) ? options : [options]

  document.querySelectorAll(selector).forEach(tag => {

    const attr = (selector+options.join('')).replace(/\W/g, '')

    if (options.every(test => features[test](tag))) {

      tag.setAttribute(`data-overflow-${attr}`, count)
      styles += stylesheet.replace(/:self|\$this/, `[data-overflow-${attr}="${count}"]`)
      count++

    } else {

      tag.setAttribute(`data-overflow-${attr}`, '')

    }

  })

  return styles

}