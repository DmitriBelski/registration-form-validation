export const classnames = (classObj: Record<string, boolean>) =>
  Object.entries(classObj)
    .filter(([key, value]) => Boolean(value))
    .map(([key, value]) => key)
    .join(' ')
