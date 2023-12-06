export function Cart() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch();
    const data = await response.json();
    resolve({ data });
  });
}
