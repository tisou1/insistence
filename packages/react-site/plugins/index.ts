


export default function myPlugin() {
  return {
    name: 'transform-file',
    transform(src, id) {
      console.log(id)
    }
  }
}