document.addEventListener('DOMContentLoaded', () => {
  console.log('文档加载完成......')
  console.log('代码执行......')

  //生成 0 ~ 100的随机数
  let randomNumer = Math.floor(Math.random() * 100) + 1 

  const guesses = document.querySelector('.guesses')
  const lastResult = document.querySelector('.lastResult')
  const lowOrHi = document.querySelector('.lowOrHi')
  
  const guessSubmit = document.querySelector('.guessSubmit')
  const guessField = document.querySelector('.guessField')

  const main= document.querySelector('main')

  //猜的次数,超过即结束游戏
  let guessCont = 1
  let resetButton

  //检查猜的数
  function checkGuess() {
    let userGuess = +guessField.value
    if(guessCont === 1) {
      guesses.textContent = '上次猜的数: '
    }
    guesses.textContent += userGuess + ' '

    if(userGuess === randomNumer) {
      lastResult.textContent = '恭喜!猜对了'
      lastResult.style.backgroundColor = 'green'
      lowOrHi.textContent = ''
      setGameOver()
    } else if(guessCont === 10) {
      lastResult.textContent = '!!!GAME OVER'
      setGameOver()
    } else {
      lastResult.textContent = '你猜错了!'
      lastResult.style.backgroundColor = 'red'
      if(userGuess < randomNumer) {
        lowOrHi.textContent = '小了'
      } else if(userGuess > randomNumer) {
        lowOrHi.textContent = '大了'
      }
    }

    //增加次数,清空输入框
    guessCont++
    guessField.value = ''
    guessField.focus()
  }

  function setGameOver() {
    guessField.disabled = true
    guessSubmit.disabled = true
    resetButton = document.createElement('button')
    resetButton.textContent = '开始新游戏'
    main.appendChild(resetButton)
    resetButton.addEventListener('click', resetGame)
  }
  //重置游戏
  function resetGame() {
    guessCont = 1

    const resetParas = document.querySelectorAll('.resultParas p')
    for(let i=0; i<resetParas.length; i++) {
      resetParas[i].textContent = ''
    }

    resetButton.parentNode.removeChild(resetButton)

    guessField.disabled = false
    guessSubmit.disabled = false
    guessField.value = ''
    guessField.focus()

    lastResult.style.backgroundColor = 'white'

    randomNumer = Math.floor(Math.random() * 100) + 1
  }

  //监听点击事件
  guessSubmit.addEventListener('click',checkGuess)


  console.log('代码执行结束......')

})