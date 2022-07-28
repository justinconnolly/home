import '../App.css';
import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap'
// import '../css/styles.css'
import {useEffect} from 'react'
import { useState } from 'react';

function Sort() {
    const [activeAlgorithm, setActiveAlgorithm] = useState({name: 'Insertion Sort', algo:insertionSort, step:insertion_step})
    let algorithms = [{name: 'Insertion Sort', algo:insertionSort, step:insertion_step},
                    {name: 'Quick Sort', algo:quick_sort, step:quick_step}]
    let moveActive = false;
    let firstNode;
    let arr = [];
    let pairs = [];
    let quick_sort_steps = []
    let step = 0;
    let stopSort = false;
    let sortDone = false
    useEffect(() => {
        placeSquares()
    }, [])

    useEffect(() => {
        placeSquares()
    }, [activeAlgorithm])

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

    function getOffset(node) {
        var bodyRect = document.body.getBoundingClientRect()
        var nodeRect = node.getBoundingClientRect()
        return {top: nodeRect.top - bodyRect.top,
                left: nodeRect.left - bodyRect.left}
    }
    function moveFifty(e) {
        if (!firstNode) {
            firstNode = e.target
        } else {
            switchNodes(firstNode, e.target)
            firstNode = undefined
        }
    }

    function getNodeOffsets() {
        let node1 = document.getElementById('node-1')
        let node2 = document.getElementById('node-2')
        switchNodes(node1, node2)
    }

    function switchNodes(node1, node2) {
        if (!moveActive) {
            moveNode(node2, node1.style.left.slice(0, -2) - node2.style.left.slice(0, -2), 50)
            moveNode(node1, node2.style.left.slice(0, -2) - node1.style.left.slice(0, -2), 50)
        }
    }
    function moveNode(node, x, y) {
        // let offset = getOffset(node)
        let str_y = node.style.top
        let str_x = node.style.left
        let initial_x = parseInt(str_x.slice(0,-2))
        let initial_y = parseInt(str_y.slice(0,-2))

        let move_x = 0
        let move_y = 0
        let negative_x = false
        if (x < 0) {
            negative_x = true
        }
        let vertical = false
        let horizontal = false
        moveActive = true
        // node.classList.toggle('switch')
        let moveNode = setInterval(() => {
            if (!vertical) {
                move_y++
                node.style.top = initial_y + move_y + 'px';
                if (move_y == y) {
                    vertical = true
                }
            } else if (!horizontal) {
                if (!negative_x) {
                    move_x++
                } else {
                    move_x--
                }
                node.style.left = initial_x + move_x + 'px';
                if (move_x === x) {
                    horizontal = true
                }
            } else {
                move_y--
                node.style.top = initial_y + move_y + 'px'
                if (move_y === 0) {
                    clearInterval(moveNode)
                    setTimeout(() => {
                        moveActive = false
                        // node.classList.toggle('switch')
                    }, 100)
                }
            }

        }, 5)
    }

    function placeSquares() {
        arr = []
        pairs = []
        step = 0
        stopSort = true
        document.getElementById("myContainer").innerHTML = '' 
        let pos_x = 50
        let pos_y = 0
        let box = document.getElementById("myContainer")
        for (let i = 0; i < 10; i++) {
            arr.push(i)
        }
        shuffle(arr)
        for (let i = 0; i < 10; i++) {
            let node = document.createElement("div");
            node.classList.add("sort_element")
            node.id = `node-${arr[i]}`
            node.style.left = pos_x + 'px'
            node.style.top = pos_y + 'px'
            pos_x = pos_x + 100
            node.innerHTML = `${arr[i]}`
            box.appendChild(node)
        }
        pairs = activeAlgorithm.algo(arr)
        console.log(arr)
    }
    function insertionSort()  {  
        let i, j, temp;
        pairs = []
        step = 0
        i = 1
        while (i < arr.length) {
            j = i
            while (j > 0 && arr[j - 1] > arr[j]) {
                pairs.push([arr[j],arr[j-1]])
                temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
                j--
            }
            i++
        }
        return pairs
    }
    function insertion_step() {
        if (pairs.length < 1 || step == pairs.length) {
            sortDone = true;
            return
        }
        let node1 = document.getElementById(`node-${pairs[step][0]}`)
        let node2 = document.getElementById(`node-${pairs[step][1]}`)
        switchNodes(node1, node2)
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
        pairs.push({left: arr[left], right:arr[right], pivot: pivot, switch: false})
        while (left <= right) {
          while (arr[left] < pivot) {
            left++
            pairs.push({left: arr[left], right:arr[right], pivot: pivot, switch: false})
          }
          while (arr[right] > pivot) {
            right--
            pairs.push({left: arr[left], right:arr[right], pivot: pivot, switch: false})
          }
          if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
            pairs.push({left: arr[left], right:arr[right], pivot: pivot, switch: true})
            left++
            right--
            pairs.push({left: arr[left], right:arr[right], pivot: pivot, switch: false})
          }
        }
        return left
      }

    function quick_step() {
        if (!pairs || step == pairs.length) {
            sortDone = true;
            return
        }
        console.log(pairs)
        let left = document.getElementById(`node-${pairs[step].left}`)
        let right = document.getElementById(`node-${pairs[step].right}`)
        let pivot = document.getElementById(`node-${pairs[step].pivot}`)
        left.classList.toggle("selected")
        right.classList.toggle("selected")
        pivot.classList.toggle("pivot")
        // console.log(left, right, pivot)
        if (quick_sort_steps[step].switch === true) {
            switchNodes(left, right)
        }
        left.classList.toggle("selected")
        right.classList.toggle("selected")
        pivot.classList.toggle("pivot")
    }


    function stepSort() {
        if (!moveActive && !sortDone) {
            activeAlgorithm.step()
            step++;
        }
    }

    function runSort() {
        stopSort = false
        let sortInterval = setInterval(() => {
            if (sortDone || stopSort) {
                stopSort = false;
                sortDone = false;
                clearInterval(sortInterval);
            } else if (!moveActive & !sortDone) {
                activeAlgorithm.step()
                step++;
                // stepSort()
                // activeAlgorithm.step()
            }
        }, 100)
    }
    function resetSort() {
        stopSort = true
        pairs = []
        step = 0
        setTimeout(placeSquares(), 500)
    }


  return (
    <>
        <Navbar id="grid-navbar" className="grid-navbar"> {/*variant="dark" bg="dark" > */}
            <Container>
            <Navbar.Brand href="#">Sorting</Navbar.Brand>
            <Nav className="me-auto">
            <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={activeAlgorithm.name}
                    // menuVariant="dark"
                    // bg="dark"
                    onToggle={()=> {
                        document.getElementById("nav-dropdown-dark-example").classList.toggle("selected")
                    }}
                    >
                    {algorithms.map(a => (
                        <Dropdown.Item key={a.name} onClick={() => {setActiveAlgorithm(a)}}>{a.name}</Dropdown.Item>
                        // <Dropdown.Item key={a.name} onClick={() => {placeSquares()}}>{a.name}</Dropdown.Item>

                    ))}
                    </NavDropdown>
             {/* <Nav.Link onClick={(e) => {begin(e, activeAlgorithm.algo)}} className="nav-item" id="begin-search">Begin!</Nav.Link> */}
             <Nav.Link onClick={(e) => {runSort()}} className="nav-item" id="begin-search">Begin!</Nav.Link>
             <Nav.Link onClick={(e) => {stepSort()}} className="nav-item">Step</Nav.Link>
             <Nav.Link onClick={(e) => {stopSort = true}} className="nav-item">Stop</Nav.Link>
             <Nav.Link onClick={(e) => {placeSquares()}} className="nav-item">Reset</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Container>
        <div id ="myContainer">
        <div id ="myAnimation"></div>
        </div>
        </Container>
    </>
  );
}

export default Sort;