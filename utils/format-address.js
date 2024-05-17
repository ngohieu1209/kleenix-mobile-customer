export function fAddress(address) {
  const { street, ward, district, province } = address
  return `${street}, ${ward}, ${district}, ${province}`
}