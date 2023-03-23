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

  const animationLength = 1000
  let anchorIndex = elements.indexOf(anchor)
  anchorIndex = anchorIndex === -1 ? elements.length : anchorIndex
  let columnWidth = elements[0].clientWidth + 20
  //   两种情况,target在前,或者在后
  if (targetIndex < anchorIndex) {
    for (let i = targetIndex + 1; i < anchorIndex; i++) {
      elements[i].setAttribute(
        'style',
        `transform: translate(-${columnWidth}px, 0px);
                   background-color: palegoldenrod;
                   transition: background-color ${animationLength}ms, transform ${animationLength}ms`
      )
    }
    elements[targetIndex].setAttribute(
      'style',
      `transform: translate(${columnWidth * (anchorIndex - targetIndex - 1)}px, 0px);
                   transition: background-color ${animationLength}ms, transform ${animationLength}ms`
    )
    await sleep(animationLength)
    for (let i = targetIndex + 1; i < anchorIndex; i++) {
      elements[i].removeAttribute('style')
    }
  } else {
    for (let i = anchorIndex; i < targetIndex; i++) {
      elements[i].setAttribute(
        'style',
        `transform: translate(${columnWidth}px, 0px);
                     background-color: palegoldenrod;
                     transition: background-color ${animationLength}ms, transform ${animationLength}ms`
      )
    }
    debugger
    elements[targetIndex].setAttribute(
      'style',
      `transform: translate(-${columnWidth * (targetIndex - anchorIndex)}px, 0px);
                     transition: background-color ${animationLength}ms, transform ${animationLength}ms`
    )
    await sleep(animationLength)
    for (let i = anchorIndex; i < targetIndex; i++) {
      elements[i].removeAttribute('style')
    }
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

async function patchKeyedChildren(c1, c2, container) {
  for (let i = 0; i < c2.length; i++) {
    const next = c2[i]
    next.classList.add('cur-number')
    for (let j = 0; j < c1.length; j++) {
      const prev = c1[j]
      if (next.innerText === prev.innerText) {
        debugger
        const curAnchor =
          i === 0
            ? c1[0]
            : // 因为每次移动后都会变更数组位置
              Array.from(c1).find(el => {
                if (el.innerText === c1[i - 1].nextSibling.innerText) {
                  return true
                }
              })
        await insertBefore(c1, prev, curAnchor, container)
        break
      }
    }
    next.classList.remove('cur-number')
  }
}

// execution
document.addEventListener('DOMContentLoaded', () => {
  init()
  renderNumbers(container1, numbers)
  numbers.sort((a, b) => (Math.random() > 0.5 ? 1 : -1))
  renderNumbers(container2, numbers)
  patchKeyedChildren(container1.children, container2.children, container1)
})
