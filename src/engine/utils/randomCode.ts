export function randomCode(): string {
  // return crypto.randomUUID().split('-')[4]
  return (Math.random()).toString(16)
}