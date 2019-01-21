export function extractId(url) {
  let array = url.split("/")
  return array.pop()
}
