export function simpleHash(string: string): string {
  let index = string.length;
  let hashA = 5381;
  let hashB = 52711;
  let charCode;

  if (!index) return '';

  while (index--) {
    charCode = string.charCodeAt(index);

    hashA = (hashA * 33) ^ charCode;
    hashB = (hashB * 33) ^ charCode;
  }

  const hval = (hashA >>> 0) * 4096 + (hashB >>> 0);
  return (hval >>> 0).toString(16);
}
