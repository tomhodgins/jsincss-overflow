function overflow(selector, options, stylesheet) {

  const features = {
    top: tag => tag.scrollTop > 0,
    right: tag => tag.scrollLeft + tag.offsetWidth < tag.scrollWidth,
    bottom: tag => tag.scrollTop + tag.offsetHeight < tag.scrollHeight,
    left: tag => tag.scrollLeft > 0
  }

  options = Array.isArray(options) ? options : [options]

  return Array.from(document.querySelectorAll(selector))

    .reduce((styles, tag, count) => {

      const attr = (selector + options.join('')).replace(/\W/g, '')

      if (options.every(test => features[test](tag))) {

        tag.setAttribute(`data-overflow-${attr}`, count)
        styles += stylesheet.replace(
          /:self|\$this/g,
          `[data-overflow-${attr}="${count}"]`
        )
        count++

      } else {

        tag.setAttribute(`data-overflow-${attr}`, '')

      }

      return styles

    }, '')

}
