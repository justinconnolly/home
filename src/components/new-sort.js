import '../App.css';
import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap'
// import '../css/styles.css'
import {useEffect} from 'react'
import { useState } from 'react';

function Sort() {
    const [activeAlgorithm, setActiveAlgorithm] = useState({name: 'Insertion Sort', algo:insertionSort})
    let algorithms = [{name: 'Insertion Sort', algo:insertionSort},
                    {name: 'Quick Sort', algo:quick_sort}]
    let arr;
    let qs_pairs = []// qs_steps;
    let is_pairs = []
    // let is_pairs, is_steps;
    let pairs;
    let sorted = false;
    let step = 0;
    let searchActive = false;
    let stopSort = false
    let numBars = 50;
    useEffect(() => {
        placeSquares()
    }, [])

    useEffect(() => {
        placeSquares()
    }, [activeAlgorithm])

 
    // maybe just call sort algorithms here and doSort() can literally just... do sort. Also fewer global arrays
    function placeSquares() {
        arr = [];
        pairs = [];
        qs_pairs = []
        is_pairs = []
        step = 0;
        sorted = false;
        // stopSort = true
        searchActive = false
        document.getElementById("sortContainer").innerHTML = '';
        let container = document.getElementById("sortContainer")
        let sorts = ["qs", "is"]
        for (let i = 0; i < numBars; i++) {
            arr.push(i);
        }
        shuffle(arr);
        for (let j = 0; j < sorts.length; j++) {
            let table = document.createElement("table");
            table.style.height = '250px'
            table.style.width = '50%'
            // table.height = `500px`
            let row = document.createElement("tr");
            row.id = `sort-row-${sorts[j]}`;
            for (let i = 0; i < numBars; i++) {
                let col = document.createElement("td");
                col.classList.add("sort-col");

                let div = document.createElement("div")
                div.classList.add("bar")
                // div.style.background = 'blue'
                div.style.height = `${((arr[i]+ 1) / numBars) * 100}%`
                div.id = `${sorts[j]}-bar-${i}`
                // col.appendChild(top)
                col.appendChild(div)
                row.appendChild(col)
            }
            table.appendChild(row)
            container.appendChild(table)
        }
    }
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
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
   
    function insertionSort(A)  {  
        let i, j, temp;
        step = 0
        i = 1
        while (i < A.length) {
            j = i
            while (j > 0 && A[j - 1] > A[j]) {
                is_pairs.push([j,j-1])
                temp = A[j]
                A[j] = A[j - 1]
                A[j - 1] = temp
                j--
            }
            i++
        }
    }


    // first if isn't going off for some reason, but the interval is stopping
    function doSort() {
        let is_arr = [...arr]
        let qs_arr = [...arr]
        insertionSort(is_arr)
        quick_sort(qs_arr)
        let step = 0
        let max_length = Math.max(is_pairs.length, qs_pairs.length)
        searchActive = true;
        let sortInterval = setInterval(() => {
            if (step === is_pairs.length) {
                for (let i = 0; i < is_arr.length; i++) {
                    let bar = document.getElementById(`is-bar-${i}`)
                    bar.classList.toggle("bar")
                    bar.classList.add("complete")
                }
            }
            if (step === qs_pairs.length) {
                for (let i = 0; i < qs_arr.length; i++) {
                    let bar = document.getElementById(`qs-bar-${i}`)
                    bar.classList.toggle("bar")
                    bar.classList.add("complete")
                }
            }
            if (step == max_length) {
                sorted = true;
                searchActive = false;
                clearInterval(sortInterval)
            }
            if (step < is_pairs.length) {
                swapHeights(is_pairs[step][0], is_pairs[step][1], 'is')
            } 
            if (step < qs_pairs.length) {
                swapHeights(qs_pairs[step][0], qs_pairs[step][1], 'qs')
            }
            step++;
        }, 50)
    }

    // function qsSort() {
    //     let qs_step = 0
    //     let sortInterval = setInterval(() => {
    //         if (qs_step == qs_pairs.length - 1) {
    //             sorted = true;
    //             searchActive = false;
    //             clearInterval(sortInterval)
    //         }
    //         swapHeights(qs_pairs[qs_step][0], qs_pairs[qs_step][1], 'qs')
    //         qs_step++;
    //     }, 50)
    // }

    // function isSort() {
    //     let is_step = 0
    //     let sortInterval = setInterval(() => {
    //         if (is_step == is_pairs.length - 1) {
    //             sorted = true;
    //             searchActive = false;
    //             clearInterval(sortInterval)
    //         }
    //         swapHeights(is_pairs[is_step][0], qs_pairs[is_step][1], 'is')
    //         step++;
    //     }, 50)
    // }

    function checkIfSorted() {
        let row = document.getElementById("sort-row")
        let numCols = row.childElementCount
        for (let i = 1; i < numCols; i++) {
            let curr = document.getElementById(`bar-${i}`)
            let prev = document.getElementById(`bar-${i - 1}`)

            if (curr.style.height < prev.style.height)  {
                console.log("NOT sorted")
                return false
            }
        }
        return true
    }

    function quick_sort(qs_arr) {
        step = 0
        pairs = []
        quickSort(qs_arr, 0, qs_arr.length - 1)
    }
    function quickSort (A, left, right) {
        if (left >= right || right < 0) {
            return;
        }
          const position = partition(A, left, right)
          if (left < position - 1) quickSort(A, left, position - 1)
          if (position < right) quickSort(A, position, right)
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
            qs_pairs.push([left, right])
            left++
            right--

          }
        }
        return left
      }

  return (
    <>
        <Navbar id="grid-navbar" className="grid-navbar"> {/*variant="dark" bg="dark" > */}
            <Container>
            <Navbar.Brand href="#">Sorting</Navbar.Brand>
            <Nav className="me-auto">
            {/* <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={activeAlgorithm.name}
                    // menuVariant="dark"
                    // bg="dark"
                    onToggle={()=> {
                        document.getElementById("nav-dropdown-dark-example").classList.toggle("selected")
                    }}
                    >
                    {algorithms.map(a => (
                        <Dropdown.Item key={a.name} onClick={() => {setActiveAlgorithm(a)
                        console.log(activeAlgorithm)}}>{a.name}</Dropdown.Item>
                        // <Dropdown.Item key={a.name} onClick={() => {placeSquares()}}>{a.name}</Dropdown.Item>

                    ))}
                    </NavDropdown> */}
             {/* <Nav.Link onClick={(e) => {begin(e, activeAlgorithm.algo)}} className="nav-item" id="begin-search">Begin!</Nav.Link> */}
             {/* <Nav.Link onClick={(e) => {runSort()}} className="nav-item" id="begin-search">Begin!</Nav.Link>
             <Nav.Link onClick={(e) => {stepSort()}} className="nav-item">Step</Nav.Link> */}
             {/* <Nav.Link onClick={(e) => {placeSquares()}} className="nav-item">Stop</Nav.Link> */}
             <Nav.Link onClick={(e) => {
                if (!searchActive) {
                    placeSquares()
                }

                }} className="nav-item">Reset</Nav.Link>
             {/* <Nav.Link onClick={(e) => {swapHeights()}} className="nav-item">SWAP</Nav.Link> */}
             <Nav.Link onClick={(e) => {
                                // if (!searchActive) {
                                    // insertionSort()
                                    // quick_sort()
                                    doSort()
                                // }
                                }} className="nav-item">Sort</Nav.Link>
            {/* <Nav.Link onClick={(e) => {
                                if (!searchActive) {
                                    // quick_sort()
                                    // doSort()
                                }}} className="nav-item">Quick Sort</Nav.Link> */}
            </Nav>
            </Container>
        </Navbar>
        <Container>
        <div id ="sortContainer">
        {/* <div id ="myAnimation"></div> */}
        </div>
        </Container>
    </>
  );
}

export default Sort;