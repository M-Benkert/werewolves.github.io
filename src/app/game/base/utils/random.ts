export function getRandomValue() {
  return self.crypto.getRandomValues(new Uint16Array(1))[0].toString().padStart(5, '0');
}
