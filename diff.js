const numberOfElements = 20
let numbers = []
let container1
let container2
let delayContainer
function init() {
  container1 = document.getElementById('numbers-old')
  container2 = document.getElementById('numbers-new')
  for (let i = 1; i <= numberOfElements; i++) {
    numbers.push(i)
  }
}

function renderNumbers(container, numbers) {
  for (const number of numbers) {
    let numberRepresentationContainer = document.createElement('div')
    numberRepresentationContainer.classList.add('number')
    numberRepresentationContainer.appendChild(document.createTextNode(number))
    container.appendChild(numberRepresentationContainer)
  }
}

async function insertBefore(elements, target, anchor, parent) {
  target.classList.add('inspected-number')
  await sleep(500)
  elements = Array.from(elements)
  const targetIndex = elements.indexOf(target)

  const animationLength = 100
  let anchorIndex = elements.indexOf(anchor)
  anchorIndex = anchorIndex === -1 ? elements.length : anchorIndex
  let columnWidth = elements[0].clientWidth + 20
  //   两种情况,target在前,或者在后
  let condition = targetIndex < anchorIndex ? -1 : 1
  let length = condition === -1 ? anchorIndex : targetIndex
  for (let i = condition === -1 ? targetIndex + 1 : anchorIndex; i < length; i++) {
    debugger
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
  elements[targetIndex].removeAttribute('style')
  await sleep(500)
  elements[targetIndex].classList.remove('inspected-number')
  elements[anchorIndex] && elements[anchorIndex].classList.remove('anchor-number')
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
