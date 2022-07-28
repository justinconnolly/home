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

 

    function placeSquares() {
        arr = [];
        pairs = [];
        step = 0;
        sorted = false;;
        document.getElementById("sortContainer").innerHTML = '';
        // let pos_x = 50
        // let pos_y = 0
        let container = document.getElementById("sortContainer")
        for (let i = 0; i < numBars; i++) {
            arr.push(i);
        }
        shuffle(arr);
        let table = document.createElement("table");
        // table.height = `500px`
        let row = document.createElement("tr");
        row.id = "sort-row";
        for (let i = 0; i < numBars; i++) {
            let col = document.createElement("td");
            col.style.height = '500px';
            col.classList.add("sort-col");

            let div = document.createElement("div")
            div.classList.add("bar")
            // div.style.background = 'blue'
            div.style.height = `${((arr[i]+ 1) / numBars) * 100}%`
            div.id = `bar-${i}`
            // col.appendChild(top)
            col.appendChild(div)
            row.appendChild(col)
        }
        table.appendChild(row)
        container.appendChild(table)
        // insertionSort()
        // sortAlgorithm()
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

    function swapHeights(index1, index2) {
        let bar1 = document.getElementById(`bar-${index1}`)
        let bar2 = document.getElementById(`bar-${index2}`)
        let bar1Height = bar1.style.height
        bar1.style.height = bar2.style.height
        bar2.style.height = bar1Height
    }
   
    function insertionSort()  {  
        let i, j, temp;
        pairs = []
        step = 0
        i = 1
        while (i < arr.length) {
            j = i
            while (j > 0 && arr[j - 1] > arr[j]) {
                pairs.push([j,j-1])
                temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
                j--
            }
            i++
        }
    }

    function doSort() {
        if (sorted || searchActive) {
            return
        }
        let step = 0
        searchActive = true;
        let sortInterval = setInterval(() => {
            if (step == pairs.length - 1) {
                sorted = true;
                searchActive = false;
                clearInterval(sortInterval)
            }
            swapHeights(pairs[step][0], pairs[step][1])
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
                console.log("NOT sorted")
                return false
            }
        }
        return true
    }

    function quick_sort() {
        step = 0
        pairs = []
        quickSort(arr)
    }
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
        while (left <= right) {
          while (arr[left] < pivot) {
            left++

          }
          while (arr[right] > pivot) {
            right--

          }
          if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
            pairs.push([left, right])
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
             <Nav.Link onClick={(e) => {placeSquares()}} className="nav-item">Reset</Nav.Link>
             {/* <Nav.Link onClick={(e) => {swapHeights()}} className="nav-item">SWAP</Nav.Link> */}
             <Nav.Link onClick={(e) => {
                                insertionSort()
                                doSort()}} className="nav-item">Insertion Sort</Nav.Link>
                                             <Nav.Link onClick={(e) => {
                                quick_sort()
                                doSort()}} className="nav-item">Quick Sort</Nav.Link>
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