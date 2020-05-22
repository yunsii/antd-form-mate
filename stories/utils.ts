export function delay(ms: number) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, ms);
  });
}
