const IPHONE6_CONFIG = {
  R: 6,
  C: 4,
  iconW: 120,
  paddingW: 54,
  iconH: 120,
  paddingH: 56,
  extraBottom: 222 // app bar,
}

const CONFIGS = [IPHONE6_CONFIG]
const DEFAULT_CONFIG = IPHONE6_CONFIG

export const getOffset = (iconIndex, config = DEFAULT_CONFIG) => {
  const {
    R,
    C,
    iconW,
    paddingW,
    iconH,
    paddingH,
  } = config

  const r = Math.floor(iconIndex / C)
  const c = iconIndex - r * C
  const left = c * iconW + (c + 1) * paddingW
  const top = r * iconH + (r + 1) * paddingH
  return {
    left,
    top,
    width: iconW,
    height: iconH,
  }
}

export const detectConfig = (width, height) => {
  // TODO make this work
  for (let config of CONFIGS) {
    const {
      R,
      C,
      iconW,
      paddingW,
      iconH,
      paddingH,
      extraBottom,
    } = config

    const w = iconW + paddingW,
      targetWidth = paddingW + w * C,
      targetHeight = paddingH + h * R + extraBottom,
      aspectRatio = targetHeight / targetWidth,
      h = iconH + paddingH
  }
}
