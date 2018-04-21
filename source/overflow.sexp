mixin('overflow', ['selector', 'options', 'stylesheet'],
  prelude('  const features = {\n\
    top: tag => tag.scrollTop > 0,\n\
    right: tag => tag.scrollLeft + tag.offsetWidth < tag.scrollWidth,\n\
    bottom: tag => tag.scrollTop + tag.offsetHeight < tag.scrollHeight,\n\
    left: tag => tag.scrollLeft > 0\n\
  }\n\
  \n\
  options = Array.isArray(options) ? options : [options]\n\n',
    returnValue('Array.from(document.querySelectorAll(selector))',
      plainReduce(
        createAttribute(['selector', 'options.join(\'\')'],
          ifElseReset('options.every(test => features[test](tag))', 'tag', 'overflow'))))))
