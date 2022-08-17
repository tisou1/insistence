

const images = ['pic1', 'pic2', 'pic3', 'pic4', 'pic5']
const thumbBar = document.querySelector('.thumb-bar')
const displayImg = document.querySelector('.displayed-img')
const darkBtn = document.querySelector('.full-img button')
const overlay = document.querySelector('.overlay')




for(let i in images) {
  const image = images[i]
  const img = document.createElement('img')
  img.src = `../assets/${image}.jpg`
  img.alt = image
  thumbBar.appendChild(img)

  img.addEventListener('click', () => {
    const imgSrc = img.src
    displayImg.setAttribute('src', imgSrc)
  })
}

darkBtn.addEventListener('click', () => {
  //检查类名
  const className = darkBtn.getAttribute('class')
  if(className === 'dark') {
    darkBtn.setAttribute('class', 'light')
    darkBtn.textContent = 'Lighten'
    overlay.style.backgroundColor = `rgba(0,0,0,.5)`
  } else if(className === 'light') {
    darkBtn.setAttribute('class', 'dark')
    darkBtn.textContent = 'dark'
    overlay.style.backgroundColor = `rgba(0,0,0,0)`
  }
})