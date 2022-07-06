export function calculatePage(limitNumber, currentOffset) {
  if (!currentOffset) return null;
  
  const regex = /(=\d+&)/g;
  const found = currentOffset?.match(regex)[0]?.replace(/=|&/g, '');

  return found / limitNumber;
}