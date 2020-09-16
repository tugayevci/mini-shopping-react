//Bu fonksiyon API'ye istek atıldığında oluşan gecikmeyi simule eder.
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
