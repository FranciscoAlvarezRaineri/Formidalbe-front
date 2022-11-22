export default function getRandomId() {
  const chars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const numberOfChars = chars.length;
  const randomIdLength = 50;
  return Array.from({
    length: randomIdLength,
  })
    .map(() => chars[Math.floor(Math.random() * numberOfChars)])
    .join("");
}
