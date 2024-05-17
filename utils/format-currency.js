export function fCurrency(value) {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
}