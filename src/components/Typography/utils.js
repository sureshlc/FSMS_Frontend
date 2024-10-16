const weightMapping = {
  regular: 400,
  medium: 500,
  bold: 700
}

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subtitle: 'h6',
  'button-text': 'span',
  'body-text': 'p',
  'body-text-small': 'p'
}

const styleMapping = {
  h1: {
    fontSize: '2.5rem',
    lineHeight: 'auto'
  },
  h2: {
    fontSize: '2rem',
    lineHeight: '2.375rem'
  },
  h3: {
    fontSize: '1.625rem',
    lineHeight: '2.125rem'
  },
  h4: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem'
  },
  subtitle: {
    fontSize: '1rem',
    lineHeight: '1.75rem'
  },
  'button-text': {
    fontSize: '0.812rem',
    lineHeight: '1.25rem'
  },
  'body-text': {
    fontSize: '0.813rem',
    lineHeight: '1.25rem'
  },
  'body-text-small': {
    fontSize: '0.5rem',
    lineHeight: '0.75rem'
  }
}

export const getStyles = (variant, weight, style, color) => {
  const Element = variantMapping[variant] || 'p'
  const fontWeight = weightMapping[weight] || weightMapping['regular']
  const defaultStyle = styleMapping[variant] || styleMapping['p']
  const styles = {
    ...defaultStyle,
    color,
    fontWeight,
    letterSpacing: 0,
    ...style
  }
  if (weight === 'bold' || (variant === 'body-text' && weight === 'medium')) {
    let lineHeight = parseFloat(styles.lineHeight)
    if (!isNaN(lineHeight)) {
      lineHeight *= 16
      lineHeight += 2
      styles.lineHeight = `${lineHeight / 16}rem`
    }
  }

  return {
    Element,
    styles
  }
}
