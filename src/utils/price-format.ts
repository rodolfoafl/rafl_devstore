export function formatPrice(
  price: number,
  options: Intl.NumberFormatOptions | undefined,
) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    ...options,
  })
}
