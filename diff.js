let numbers = []
let numbers2 = []
let container1
let container2
let delayContainer
let swapBtn = document.getElementById('swap')
let resetBtn = document.getElementById('reset')

swapBtn.addEventListener('click', () => {
  patchKeyedChildren(container1.children, container2.children, container1)
})
resetBtn.addEventListener('click', () => {
  init(type)
})
document.addEventListener('DOMContentLoaded', () => {
  init(type)
  // renderNumbers(container1, numbers)
  // numbers.sort((a, b) => (Math.random() > 0.5 ? 1 : -1))
  // renderNumbers(container2, numbers)
  // patchKeyedChildren(container1.children, container2.children, container1)
})

/**
    type:0 default   //生成相同但顺序不同的  
    type:1           //c2元素比c1少  
    type:2           //c2元素比c1多  
 */
function init(type = 0) {
  let numberOfElements = 20

  numbers.length = 0
  numbers2.length = 0
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
      debugger

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

async function insertBefore(elements, target, anchor, parent) {
  await sleep(500)
  elements = Array.from(elements)
  const targetIndex = elements.indexOf(target)

  const animationLength = 2000
  let anchorIndex = elements.indexOf(anchor)
  anchorIndex = anchorIndex === -1 ? elements.length : anchorIndex
  let columnWidth = elements[0].clientWidth + 20
  //   两种情况,target在前,或者在后
  let condition = targetIndex < anchorIndex ? -1 : 1
  let length = condition === -1 ? anchorIndex : targetIndex
  for (let i = condition === -1 ? targetIndex + 1 : anchorIndex; i < length; i++) {
    elements[i].setAttribute(
      'style',
      `transform: translate(${columnWidth * condition}px, 0px);
                   background-color: palegoldenrod;
                   transition: background-color ${animationLength}ms, transform ${animationLength}ms`
    )
  }
  elements[targetIndex].setAttribute(
    'style',
    `transform: translate(${columnWidth * (condition === -1 ? anchorIndex - targetIndex - 1 : anchorIndex - targetIndex)}px, 0px);
                   transition: background-color ${animationLength}ms, transform ${animationLength}ms`
  )
  await sleep(animationLength)
  length = condition === -1 ? anchorIndex : targetIndex
  for (let i = condition === -1 ? targetIndex + 1 : anchorIndex; i < length; i++) {
    elements[i].removeAttribute('style')
  }

  parent.insertBefore(target, anchor)
  // remove the animation
  elements[targetIndex].removeAttribute('style')
  await sleep(500)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

async function tagAndRemove(node) {
  node.classList.add('to-be-removed')
  debugger
  console.log(node)
  await sleep(transiLenth)
  node.parentNode.removeChild(node)
  node.classList.remove('to-be-removed')
  await sleep(transiLenth)
  return
}
