import { isExecuting } from './init.js'
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

/**
 *
 * @param {*} elements
 * @param {*} target
 * @param {*} anchor
 * @param {*} parent
 * @returns
 */
export async function insertBefore(elements, target, anchor, parent) {
  elements = Array.from(elements)
  const targetIndex = elements.indexOf(target)
  const animationLength = 1500
  let columnWidth = elements[0].clientWidth + 20
  let anchorIndex = elements.indexOf(anchor)
  // avoid target was cleared when reset

  //
  if (targetIndex === -1) {
    // add the new node to the real DOMS
    if (isExecuting) {
      if (anchor) {
        debugger
        for (let i = anchorIndex; i < elements.length; i++) {
          elements[i].setAttribute(
            'style',
            `transform: translate(${columnWidth}px, 0px);
                         background-color: palegoldenrod;
                         transition: background-color ${animationLength}ms, transform ${animationLength}ms`
          )
        }
        await sleep(animationLength)
        for (let i = anchorIndex; i < elements.length; i++) {
          elements[i].removeAttribute('style')
        }
      }

      try {
        parent.insertBefore(target, anchor)
        if (anchor) await sleep(transiLenth)
      } catch (error) {
        console.log('reset')
      }
      return
    } else {
      return
    }
  }

  anchorIndex = anchorIndex === -1 ? elements.length : anchorIndex

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

  await sleep(transiLenth)
}

export async function tagAndRemove(node) {
  node.classList.add('to-be-removed')
  await sleep(transiLenth)
  node.parentNode.removeChild(node)
  node.classList.remove('to-be-removed')
  return
}

export function debounce(fn) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, 100)
  }
}
