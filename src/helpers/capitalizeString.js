function capitalizeSingleWord(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

export function capitalizeString(str, everyWord = false) {
  if (!str) return;

  if (everyWord) {
    const words = str.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = capitalizeSingleWord(words[i]);
    }
    return words.join(' ');
  }
  return capitalizeSingleWord(str);
}