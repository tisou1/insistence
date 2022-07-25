async function getName() {
  let name = await 'name'
  return name
}

console.log(getName())
getName().then(res => console.log(res))