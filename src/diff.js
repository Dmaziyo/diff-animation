import { isRest, setIsExecuting, setIsRest } from './init.js'
import { sleep, insertBefore, tagAndRemove, transiLenth } from './utils.js'
//    the sort method version-1 Bubble Sort
export async function patchKeyedChildren1(c1, c2, container) {
  for (let i = 0; i < c2.length; i++) {
    const next = c2[i]

    if (isRest) {
      setIsExecuting(false)
      setIsRest(false)
      return
    }
    next.classList.add('cur-number')
    await sleep(transiLenth)
    for (let j = 0; j < c1.length; j++) {
      const old = c1[j]
      if (next.innerText === old.innerText) {
        old.classList.add('inspected-number')

        // if resetBtn was clicked ,break the for loop
        if (isRest) {
          setIsExecuting(false)
          setIsRest(false)
          old.classList.remove('inspected-number')
          return
        }

        const curAnchor =
          i === 0
            ? c1[0]
            : // 遇到的问题: 因为每次移动后都会变更数组位置,需要存储动态位置
              Array.prototype.find.call(c1, (el, idx, array) => {
                if (el.innerText === array[i - 1].nextSibling.innerText) {
                  return true
                }
              })
        await insertBefore(c1, old, curAnchor, container)

        break
      }
    }
    next.classList.remove('cur-number')
  }
  setIsExecuting(false)
}

//     the sort method version-2
export async function patchKeyedChildren2(c1, c2, container) {
  let maxNewIndexSoFar = 0
  for (let i = 0; i < c2.length; i++) {
    // if resetBtn was clicked ,break the for loop
    if (isRest) {
      setIsExecuting(false)
      setIsRest(false)
      return
    }

    const next = c2[i]
    //   tag the current number
    next.classList.add('cur-number')

    debugger
    await sleep(transiLenth)
    for (let j = 0; j < c1.length; j++) {
      const old = c1[j]
      if (next.innerText === old.innerText) {
        // tag the inspected number
        old.classList.add('inspected-number')

        // in case the event enter here after reset
        if (isRest) {
          setIsExecuting(false)
          setIsRest(false)
          old.classList.remove('inspected-number')
          next.classList.remove('cur-number')
          return
        }

        if (j < maxNewIndexSoFar) {
          const prevInOld = Array.prototype.find.call(c1, el => {
            if (el.innerText === c2[i - 1].innerText) {
              return true
            }
          })

          await insertBefore(c1, old, prevInOld.nextSibling, container)
        } else {
          maxNewIndexSoFar = j
        }
        break
      }
    }
    next.classList.remove('cur-number')
  }
  setIsExecuting(false)
}

//     new children are less than old children:type=1
export async function patchKeyedChildren3(c1, c2, container) {
  let maxNewIndexSoFar = 0
  let map = new Map()
  //  record the element of c1
  for (let i = 0; i < c1.length; i++) {
    map.set(c1[i].innerText, c1[i])
  }
  for (let i = 0; i < c2.length; i++) {
    // if resetBtn was clicked ,break the for loop
    if (isRest) {
      setIsExecuting(false)
      setIsRest(false)
      return
    }

    const next = c2[i]

    //   tag the current number
    next.classList.add('cur-number')
    await sleep(transiLenth)

    for (let j = 0; j < c1.length; j++) {
      const old = c1[j]
      if (next.innerText === old.innerText) {
        // remove the node found from the map
        map.delete(next.innerText)

        old.classList.add('inspected-number')

        // in case the code enter here after reset
        if (isRest) {
          setIsExecuting(false)
          setIsRest(false)
          old.classList.remove('inspected-number')
          next.classList.remove('cur-number')
          return
        }

        if (j < maxNewIndexSoFar) {
          //find the previous el in the c2 (new list)
          const prevInOld = Array.prototype.find.call(c1, el => {
            if (el.innerText === c2[i - 1].innerText) {
              return true
            }
          })

          await insertBefore(c1, old, prevInOld.nextSibling, container)
        } else {
          maxNewIndexSoFar = j
        }
        //   old.classList.remove('inspected-number')
        break
      }
    }
    //  delete tag
    next.classList.remove('cur-number')
  }
  // convert the map to array,cause the forEach of map has a bug on it
  let redundantNodes = Array.from(map, ([, val]) => val)
  for (let node of redundantNodes) {
    // if resetBtn was clicked ,break the for loop

    try {
      await tagAndRemove(node)
    } catch (error) {
      console.log('reset')
      setIsExecuting(false)

      return
    }
  }
  setIsExecuting(false)
}

//     new children are either less than old children or more than the new children
//     react diff type=2 or 3
export async function patchKeyedChildren4(c1, c2, container) {
  let maxNewIndexSoFar = 0
  let map = new Map()
  //  record the element of c1
  for (let i = 0; i < c1.length; i++) {
    map.set(c1[i].innerText, c1[i])
  }
  for (let i = 0; i < c2.length; i++) {
    let find = false
    // if resetBtn was clicked ,break the for loop
    if (isRest) {
      setIsExecuting(false)
      setIsRest(false)
      return
    }
    let prevOfc2InOld = null

    const next = c2[i]

    //   tag the current number
    next.classList.add('cur-number')
    await sleep(transiLenth)

    for (let j = 0; j < c1.length; j++) {
      const old = c1[j]
      if (next.innerText === old.innerText) {
        // remove the node found from the map
        map.delete(next.innerText)
        find = true
        old.classList.add('inspected-number')

        // in case the code enter here after reset
        if (isRest) {
          setIsExecuting(false)
          setIsRest(false)
          old.classList.remove('inspected-number')
          next.classList.remove('cur-number')
          return
        }

        if (j < maxNewIndexSoFar) {
          //find the previous el in the c2 (new list)
          let prevOfc2InOld = Array.prototype.find.call(c1, el => {
            if (el.innerText === c2[i - 1].innerText) {
              return true
            }
          })
          await insertBefore(c1, old, prevOfc2InOld.nextSibling, container)
        } else {
          maxNewIndexSoFar = j
        }
        break
      }
    }

    if (!find) {
      debugger
      const clone = next.cloneNode(next)
      clone.classList.add('inspected-number')
      clone.classList.remove('cur-number')
      try {
        let anchor =
          i === 0
            ? c1[0]
            : Array.prototype.find.call(c1, el => {
                if (el.innerText === c2[i - 1].innerText) {
                  return true
                }
              }).nextSibling
        await insertBefore(c1, clone, anchor, container)
      } catch (error) {
        console.log('reset')
      }
    }
    //  delete tag
    next.classList.remove('cur-number')
  }
  // convert the map to array,cause the forEach of map has a bug on it
  let redundantNodes = Array.from(map, ([, val]) => val)
  for (let node of redundantNodes) {
    // if resetBtn was clicked ,break the for loop

    try {
      await tagAndRemove(node)
    } catch (error) {
      console.log('reset')
      setIsExecuting(false)

      return
    }
  }
  setIsExecuting(false)
}
