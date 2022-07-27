import '../App.css';
import { Container } from 'react-bootstrap'
// import '../css/styles.css'
import useEffect from 'react'
import { useState } from 'react';

function Sort() {
    // const [moveActive, setMoveActive] = useState(false)
    // const [firstNode, setFirstNode] = useState()
    let moveActive = false;
    let firstNode;
    let arr = [];
    let pairs;
    let step = 0;
    let stopSort = false;
    // useEffect(() => {console.log("loaded")},[]
    // )

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
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
            // setFirstNode(e.target)
            firstNode = e.target
        } else {
            switchNodes(firstNode, e.target)
            firstNode = undefined
        }
        // let node = document.getElementById(e.target.id)
        // let node2 = document.getElementById(node2_id)
        // switchNodes(node, node2)
        // getNodeOffsets()
        // moveNode(node, -100, 50)
    }

    function getNodeOffsets() {
        let node1 = document.getElementById('node-1')

        let node2 = document.getElementById('node-2')
        switchNodes(node1, node2)


    }

    function switchNodes(node1, node2) {
        moveNode(node2, node1.style.left.slice(0, -2) - node2.style.left.slice(0, -2), 50)
        moveNode(node1, node2.style.left.slice(0, -2) - node1.style.left.slice(0, -2), 50)
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
        if (x < 0) {negative_x = true}
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
                    // moveActive = false

                    clearInterval(moveNode)
                    setTimeout(() => {
                        moveActive = false
                        // node.classList.toggle('switch')
                    }, 100)
                }
            }

        }, 5)

    }

    
    function myMove(e, final_x, final_y) {
        placeSquares()
    
    }
    function placeSquares() {
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
            // node.addEventListener("click",(e => {moveFifty(e)}))
            node.innerHTML = `${arr[i]}`
            box.appendChild(node)
        }
        pairs = insertionSort(arr)
    }
    function insertionSort(arr)  {  
        let i, j, temp;
        let pairs = []
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
    function stepSort(pairs) {
        if (!moveActive) {
            let node1 = document.getElementById(`node-${pairs[step][0]}`)
            let node2 = document.getElementById(`node-${pairs[step][1]}`)
            switchNodes(node1, node2)
            step++;
        }


    }

    function runSort() {
        let sortInterval = setInterval(() => {
            if (step === pairs.length || stopSort) {
                stopSort = false
                clearInterval(sortInterval)
            }
            if (!moveActive) {
                stepSort(pairs)
            }
        }, 100)
    }

  return (
    <>
        <p>

        </p>
        <Container>
        <button onClick={(e) => runSort()}>Sort!</button>
        <button onClick={(e) => {stopSort = true}}>Stop</button> 
        <button onClick={(e) => stepSort(pairs)}>Step</button>
        <button onClick={(e) => placeSquares()}>Reset</button> 
        <div id ="myContainer">
        <div id ="myAnimation"></div>
        </div>
        </Container>
    </>
  );
}

export default Sort;