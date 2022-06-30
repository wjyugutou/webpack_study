import { sum } from './js/sum.js'

import a from './static/13.png'
import b from './static/preview.jpg'
// import './styles/index.css'
// console.log({ a, b })

// const img = new Image(100, 200)
// img.src = b

const img = document.createElement('img')

console.log(11)
console.log(b)
img.setAttribute('src', b)
img.style.width = '200px'
img.style.height = '200px'
document.body.appendChild(img)

const box = document.querySelector('.box')
box.addEventListener('click', () => {
  import(/* webpackChunkName: 'count' */'./js/count.js').then((res) => {
    console.log(11)
    console.log({ res, a })
  })
  console.log(11)

  sum(1, 2)
})
