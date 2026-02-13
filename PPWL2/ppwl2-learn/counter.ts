if (!(globalThis as any).counter) {
  (globalThis as any).counter = 0;
}

export function increment() {
  (globalThis as any).counter += 1;
}

export function getCounter() {
  return (globalThis as any).counter;
}
