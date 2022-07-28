let pairs = []
let quick_sort_steps = []

// {left: int, right: int, pivot: int, switch: bool}

function quickSort (arr, left = 0, right = arr.length - 1) {
    if (left >= right || right < 0) {
        return;
    }
      const position = partition(arr, left, right)
      if (left < position - 1) quickSort(arr, left, position - 1)
      if (position < right) quickSort(arr, position, right)
  }
  
  function partition (arr, left, right) {
    const pivot = arr[Math.floor(Math.random() * (right - left - 1) + left)]
    quick_sort_steps.push({left: arr[left], right:right[right], pivot: pivot, switch: false})
    while (left <= right) {
      while (arr[left] < pivot) {
        left++
        quick_sort_steps.push({left: arr[left], right:right[right], pivot: pivot, switch: false})
      }
      while (arr[right] > pivot) {
        right--
        quick_sort_steps.push({left: arr[left], right:right[right], pivot: pivot, switch: false})
      }
      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        quick_sort_steps.push({left: arr[left], right:right[right], pivot: pivot, switch: true})
        left++
        right--
        quick_sort_steps.push({left: arr[left], right:right[right], pivot: pivot, switch: false})
      }
    }
    return left
  }
  
  function swap (arr, left, right) {
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
  }


myList = [5,78,2,4,78,3,23,2,34,5,34,3,-1]
console.log(myList)
quickSort(myList, 0, myList.length - 1)
console.log(myList)
console.log(quick_sort_steps)

