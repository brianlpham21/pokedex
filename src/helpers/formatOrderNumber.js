export function formatOrderNumber(number) {
  if (!number) return;

  const length = number.toString().length;
  const leadingZeros = 3 - parseInt(length);
  let leadingZerosString = '';

  for (var x = 0; x < leadingZeros; x++) {
    leadingZerosString += '0';
  }

  return `#${leadingZerosString}${number}`;
}