import { setTransiLenth, transiLenth, debounce } from './utils.js'
import { container1, container2, init, isRest, isExecuting, setIsExecuting, setIsRest, patchKeyedChildren, type } from './init.js'
import { patchKeyedChildren1, patchKeyedChildren2, patchKeyedChildren3, patchKeyedChildren4 } from './diff.js'
import { Router } from './router.js'
import './styles/style.css'

const router = new Router([
  { path: '/case1', diff: patchKeyedChildren1, type: 0 },
  { path: '/case2', diff: patchKeyedChildren2, type: 0 },
  { path: '/case3', diff: patchKeyedChildren3, type: 1 },
  { path: '/case4', diff: patchKeyedChildren4, type: 2 },
  { path: '/case5', diff: patchKeyedChildren4, type: 3 }
])
let swapBtn = document.getElementById('swap')
let resetBtn = document.getElementById('reset')
let delayContainer = document.getElementById('delay')

// param c1          old children
// param c2          new children
// param container   parent Node

const swapCb = debounce(() => {
  if (!isExecuting) {
    debugger
    setIsExecuting(true)
    setTransiLenth(delayContainer.selectedOptions[0].value)

    patchKeyedChildren(container1.children, container2.children, container1)
  }
})
const resetCb = debounce(() => {
  // in case restBtn was clicked before swap
  // the isExecuting is a semaphore,just like the  Bounded-buffer problem
  setIsRest(isExecuting ? true : false)
  init(type)
})

swapBtn.addEventListener('click', swapCb)

resetBtn.addEventListener('click', resetCb)
// initiate  DOMs
init(type)
