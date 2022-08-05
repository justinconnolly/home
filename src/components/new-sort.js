import '../App.css';
import { Container, Nav, Navbar, Modal } from 'react-bootstrap'
// import '../css/styles.css'
import {useEffect} from 'react'
import { useState } from 'react';
import { MathComponent } from 'mathjax-react';

function Sort() {
    let arr, step;
    let sorted = false;
    let searchActive = false;
    let first = true
    // let stopSort = false
    let numBars = 50;
    const [clickedSort, setClickedSort] = useState('cyclic')
    const [instructions, setInstructions] = useState(false)
    const [welcome, setWelcome] = useState(true)

    useEffect(() => {
            placeSquares()
    })

    let sorts = {
        cyclic: {
            algorithm: cyclicSort,
            pairs: [],
            unsorted: [],
            complete: false,
            name: 'Cyclic Sort',
            stats: {
                average: <MathComponent tex={String.raw`O(n^2)`} />,
                worst: <MathComponent tex={String.raw`O(n^2)`} />,
                description: ['This implementation of cycle sort iterate through the list, if the current item is misplaced then it will be swapped with the item in its proper location. This cycling process will continue until the correct item is in the index of interest, at which point the algorithm will move to the next index.']
            }
        },
        quick: {
            algorithm: quickSort,
            pairs: [],
            unsorted: [],
            complete: false,
            name: 'Quick Sort',
            stats: {
                average: <MathComponent tex={String.raw`O(n \log n)`} />,
                worst: <MathComponent tex={String.raw`O(n^2)`} />,
                description: ['The defacto default sort, quicksort is ubiquitous. A comparison-based sort, quicksort is favoured for its relatively small number of comparisons and minimal memory requirements.']
            }
        },
        heap: {
            algorithm: heapSort,
            pairs: [],
            unsorted: [],
            complete: false,
            name: 'Heap Sort',
            stats: {
                average: <MathComponent tex={String.raw`O(n \log n)`} />,
                worst: <MathComponent tex={String.raw`O(n \log n)`} />,
                description: ['A comparison-based sort, heapsort maintains an unsorted heap region which is merged into the sorted region as the list is heapified.']
            }
        },
        insertion: {
            algorithm: insertionSort,
            pairs: [],
            unsorted: [],
            complete: false,
            name: 'Insertion Sort',
            stats: {
                average: <MathComponent tex={String.raw`O(n^2)`} />,
                worst: <MathComponent tex={String.raw`O(n^2)`} />,
                description: ['A comparison-based sort, insertion sort iterates left to right, with the growing left region being sorted. If the next value is smaller than the largest value in the left region, the new value will be moved one index position down. This process is repeated until the entire list is sorted.']
            }
        }
    };


 
    // maybe just call sort algorithms here and doSort() can literally just... do sort
    function placeSquares() {
        first = false;
        arr = [];
        step = 0;
        sorted = false;
        // stopSort = true
        searchActive = false
        document.getElementById("sortContainer").innerHTML = '';
        let container = document.getElementById("sortContainer")
        for (let i = 0; i < numBars; i++) {
            arr.push(i);
        }
        shuffle(arr);
        for (let sort in sorts) {
            let sort_div = document.createElement("div")
            sort_div.classList.add("sort-div")

            let table = document.createElement("table");
            table.classList.add("sort")

            let row = document.createElement("tr");
            row.id = `sort-row-${sort}`;

            let title = document.createElement("div")
            title.innerText = sorts[sort].name
            title.classList.add("sort-title")

            for (let i = 0; i < numBars; i++) {
                let col = document.createElement("td");
                col.classList.add("sort-col");

                let div = document.createElement("div")
                div.classList.add("incomplete")
                div.classList.add("bar")
                div.style.height = `${((arr[i]+ 1) / numBars) * 100}%`
                div.id = `${sort}-bar-${i}`

                col.appendChild(div)
                row.appendChild(col)
            }
            table.appendChild(row)
            sort_div.appendChild(title)
            sort_div.appendChild(table)
            sort_div.addEventListener('click', (e) => {
                if (!searchActive) {
                    setClickedSort(sort)
                    setInstructions(true)
                }

            })
            container.appendChild(sort_div)
        }
    }
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;    
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }    
        return array;
      }

    function swapHeights(index1, index2, sort_type) {
        let bar1 = document.getElementById(`${sort_type}-bar-${index1}`)
        let bar2 = document.getElementById(`${sort_type}-bar-${index2}`)
        let bar1Height = bar1.style.height
        bar1.style.height = bar2.style.height
        bar2.style.height = bar1Height
    }

    function doSort() {
        if (sorted) {
            return
        }
        let max_length = 0
        for (let sort in sorts) {
            sorts[sort].pairs = []
            sorts[sort].unsorted = [...arr]
            sorts[sort].algorithm(sorts[sort].unsorted)
            max_length = Math.max(sorts[sort].pairs.length, max_length)
        }
        step = 0
        searchActive = true;
        let sortInterval = setInterval(() => {
            for (let sort in sorts) {
                if (step === sorts[sort].pairs.length) {
                    for (let i = 0; i < sorts[sort].unsorted.length; i++) {
                        let bar = document.getElementById(`${sort}-bar-${i}`)
                        bar.classList.toggle("incomplete")
                        bar.classList.add("complete")
                        sorts[sort].complete = true;
                    }
                }
            }
            if (step === max_length) {
                sorted = true;
                searchActive = false;
                clearInterval(sortInterval)
            }
            for (let sort in sorts) {
                if (step < sorts[sort].pairs.length) {
                    swapHeights(sorts[sort].pairs[step][0], sorts[sort].pairs[step][1], sort)
                }
            }
            step++;
        }, 50)
    }

    function checkIfSorted() {
        let row = document.getElementById("sort-row")
        let numCols = row.childElementCount
        for (let i = 1; i < numCols; i++) {
            let curr = document.getElementById(`bar-${i}`)
            let prev = document.getElementById(`bar-${i - 1}`)
            if (curr.style.height < prev.style.height)  {
                return false
            }
        }
        return true
    }
   
    function insertionSort(A)  {  
        let i, j, temp;
        i = 1
        while (i < A.length) {
            j = i
            while (j > 0 && A[j - 1] > A[j]) {
                sorts.insertion.pairs.push([j,j-1])
                temp = A[j]
                A[j] = A[j - 1]
                A[j - 1] = temp
                j--
            }
            i++
        }
    }
    function cyclicSort(A) {
        let i = 0;
        let j;
        while (i < A.length) {
            j = A[i]
            if (A[i] !== A[j]) {
                [A[i], A[j]] = [A[j], A[i]]
                sorts.cyclic.pairs.push([i,j])
            }
            else {
                i++;
            }
        }
    }



    function quickSort(qs_arr) {
        quick_sort(qs_arr, 0, sorts.quick.unsorted.length - 1)
    }
    function quick_sort (A, left, right) {
        if (left >= right || right < 0) {
            return;
        }
        const position = partition(A, left, right)
        if (left < position - 1) {
            quick_sort(A, left, position - 1)
        }
        if (position < right) {
            quick_sort(A, position, right)
        }
      }
      
      function partition (A, left, right) {
        const pivot = A[Math.floor(Math.random() * (right - left - 1) + left)]
        while (left <= right) {
            while (A[left] < pivot) {
                left++
            }
            while (A[right] > pivot) {
                right--
            }
            if (left <= right) {
                [A[left], A[right]] = [A[right], A[left]]
                sorts.quick.pairs.push([left, right])
                left++
                right--
            }
        }
        return left
      }

      function heapify(A, length, i) {
        let largest = i
        const left = i * 2 + 1
        const right = left + 1
      
        if (left < length && A[left] > A[largest]) {
          largest = left
        }
      
        if (right < length && A[right] > A[largest]) {
          largest = right
        }
      
        if (largest !== i) {
          [A[i], A[largest]] = [A[largest], A[i]]
          sorts.heap.pairs.push([largest, i])
          heapify(A, length, largest)
        }
      
        return A
      }
      
      function heapSort(A) {
        const length = A.length
        let i = Math.floor(length / 2 - 1)
        let k = length - 1
      
        while (i >= 0) {
          heapify(A, length, i)
          i--
        }
      
        while (k >= 0) {
          [A[0], A[k]] = [A[k], A[0]]
          sorts.heap.pairs.push([0, k])
          heapify(A, k, 0)
          k--
        }
        // return A
      }

  return (
    <>
        <Navbar id="grid-navbar" className="grid-navbar">
            <Container>
            <Navbar.Brand href="#">Sorting</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link onClick={(e) => {
                if (!searchActive) {
                    doSort()
                }}} className="nav-item" id="begin-search">Begin!</Nav.Link>
            <Nav.Link onClick={(e) => {
                if (!searchActive) {
                    placeSquares()
                }}} className="nav-item">Reset</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Container>
            <Modal id="modal-popup" show={instructions} onHide={() => setInstructions(false)}>
                <Modal.Header closeButton><h3>{sorts[clickedSort].name}</h3></Modal.Header>
                <Modal.Body>Average performance: {sorts[clickedSort].stats.average} <br/>
                            Worst-case performance: {sorts[clickedSort].stats.worst}
                            {sorts[clickedSort].stats.description}</Modal.Body>
            </Modal>
            <Modal id="modal-popup" show={welcome} onHide={() => setWelcome(false)}>
                <Modal.Header closeButton><h3>Sorting</h3></Modal.Header>
                <Modal.Body>Click a graph to learn more about its sorting technique, then click Begin! when you're ready.</Modal.Body>
            </Modal>
            <div id ="sortContainer">
            </div>
        </Container>
    </>
  );
}

export default Sort;