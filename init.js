import { getRandom } from './utils.js'

export let isRest = false
export let isExecuting = false

export let container1 = null
export let container2 = null

/**
    type:0 default   //生成相同但顺序不同的  
    type:1           //c2元素比c1少  
    type:2           //c2元素比c1多  
 */

export function setIsExecuting(val) {
  isExecuting = val
}

export function setIsRest(val) {
  isRest = val
}

export function init(type = 0) {
  let numberOfElements = 20

  let numbers = []
  let numbers2 = []
  container1 = document.getElementById('numbers-old')
  container2 = document.getElementById('numbers-new')

  switch (type) {
    case 0:
      for (let i = 1; i <= numberOfElements; i++) {
        numbers.push(i)
      }
      renderNumbers(container1, numbers)
      numbers.sort(() => (Math.random() > 0.5 ? 1 : -1))
      renderNumbers(container2, numbers)
      break

    case 1:
      for (let i = 1; i <= numberOfElements; i++) {
        numbers.push(i)
      }
      numberOfElements = getRandom(1, getRandom(2, 19))
      let set = new Set()

      while (!(set.size === numberOfElements)) {
        set.add(getRandom(1, 19))
      }

      numbers2 = Array.from(set)
      renderNumbers(container1, numbers)
      numbers2.sort((a, b) => (Math.random() > 0.5 ? 1 : -1))
      renderNumbers(container2, numbers2)
      break
    case 2:
      //  todo c2.length longer than c1.length
      break
  }
}

function renderNumbers(container, numbers) {
  container.innerHTML = ''
  for (const number of numbers) {
    let numberRepresentationContainer = document.createElement('div')
    numberRepresentationContainer.classList.add('number')
    numberRepresentationContainer.appendChild(document.createTextNode(number))
    container.appendChild(numberRepresentationContainer)
  }
}
