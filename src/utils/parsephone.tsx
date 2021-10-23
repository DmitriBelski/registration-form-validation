export const parsePhone = (phone: string): number => {
  return Number(Array
    .from(phone)
    .filter(symbol => !Number.isNaN(Number(symbol)))
    .join('')
  )
}
