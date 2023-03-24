export let transiLenth = 1000

export function setTransiLenth(val) {
  transiLenth = val
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export async function insertBefore(elements, target, anchor, parent) {
  await sleep(500)
  elements = Array.from(elements)
  const targetIndex = elements.indexOf(target)
  // avoid target was cleared when reset
  if (targetIndex === -1) return

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
  try {
    parent.insertBefore(target, anchor)
  } catch (error) {
    // the el already was removed from parent
    console.log('already was removed from parent')
  }
  // remove the animation
  elements[targetIndex].removeAttribute('style')
  await sleep(500)
}

export async function tagAndRemove(node) {
  node.classList.add('to-be-removed')
  await sleep(transiLenth)
  node.parentNode.removeChild(node)
  node.classList.remove('to-be-removed')
  await sleep(transiLenth)
  return
}
