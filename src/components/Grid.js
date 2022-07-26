import { Container, Dropdown, Button, Modal, Navbar, Row, Col, NavDropdown, Nav } from 'react-bootstrap'
import {useEffect, useState} from 'react'

function Grid() {
    const size = 40;
    let algorithms = [{name: 'Breadth-First Search', algo: BFS}, {name: 'Depth-First Search', algo: DFS}];
    const [activeAlgorithm, setActiveAlgorithm] = useState({name: 'Breadth-First Search', algo: BFS})
    // let reset = false;
    let neighbours = [[0, -1], [0, 1], [1, 0], [-1, 0]]
    const [searchActive, setSearchActive] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        resetBoard()
    }, [])

    function resetBoard() {
        // reset = true;
        if (!searchActive) {
            let grid = document.getElementById("grid");
            let startCoords;
            let endCoords;
            clearGrid();
            for (let i = Math.floor(size/3); i < 2 * Math.floor(size/3); i++) {
                grid.rows[i].cells[Math.floor(size/2)].classList.add('wall')
            }
            startCoords = [Math.floor(size/2),Math.floor(size/3)]
            grid.rows[startCoords[0]].cells[[startCoords[1]]].classList.add('start')
            endCoords = [Math.floor(size/2),2 * Math.floor(size/3)]
            grid.rows[endCoords[0]].cells[endCoords[1]].classList.add('end')
        }
        // reset = false;
    }

    function clearSearch() {
        let grid = document.getElementById("grid");
        let toggles = ['queued', 'seen', 'path']
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                for (let t of toggles) {
                    if (grid.rows[i].cells[j].classList.contains(t)) {
                        grid.rows[i].cells[j].classList.toggle(t)
                    }
                }
            }
        }
    }

    function clearGrid() {
        let grid = document.getElementById("grid")
        for (let i = 0; i < grid.rows.length; i++) {
            for (let j = 0; j < grid.rows[0].cells.length; j++) {
                grid.rows[i].cells[j].classList = '';
            }
        }
    }


    function onMU(event) {
        setMouseDown(false)
    }

    function onMD(event) {
        event.stopPropagation();
        setMouseDown(true)
        if (!event.target.classList.contains('end')) {
            event.target.classList.toggle('wall')
        }
    }

  function doWallCount(grid) {
        let walls = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid.rows[i].cells[j].classList.contains('wall')) {
                    walls += 1
                }
            }
        }
    return walls;
  }

    function onMO(event) {
        event.stopPropagation();
        if (mouseDown && !event.target.classList.contains('end')) {
            event.target.classList.toggle('wall')
        }
    }

    function begin(event, algo) {
        event.stopPropagation();
        if (!searchActive){
            let grid = document.getElementById("grid")
            let [start, end] = getStartEndPoints(grid)
            setSearchActive(true);
            clearSearch();
            let wallCount = doWallCount(grid)
            algo(event, start, end, wallCount);
        }
    }

    function getStartEndPoints(grid) {
        let start, end;
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - 1; j++) {
                if (grid.rows[i].cells[j].classList.contains('start')) {
                    start = [i,j]
                }
                if (grid.rows[i].cells[j].classList.contains('end')) {
                    end = [i,j]
                }
            }
        }
        return [start, end]
    }

    function checkNeighbour(grid, neighbour) {
        let checks = ['queued', 'wall', 'start']
        if (neighbour[0] >= 0 && neighbour[0] < size && neighbour[1] >= 0 && neighbour[1] < size) {
            for (let check of checks) {
                if (grid.rows[neighbour[0]].cells[neighbour[1]].classList.contains(check)) {
                    return false
                }
            }
            return true
        }
        return false
    }
    function BFS(e, start, end, walls) {
        let grid = document.getElementById("grid");
        let bfsQueue = [];
        let path = {};
        let currNode;
        bfsQueue.push(start);
        let n;

        var myInterval = setInterval((() => {
            currNode = bfsQueue.shift();
            if (currNode[0] === end[0] && currNode[1] === end[1]) {
                let endID = grid.rows[end[0]].cells[end[1]].id
                colourPath(grid, endID, path)
                clearInterval(myInterval);
                return
            }
            grid.rows[currNode[0]].cells[currNode[1]].classList.add('seen')
            for (let neighbour of neighbours) {
                n = [currNode[0] + neighbour[0], currNode[1] + neighbour[1]]
                if (currNode[0] >= 0 && currNode[0] < size && currNode[1] >= 0 && currNode[1] < size && checkNeighbour(grid, n)) {
                    bfsQueue.push(n)
                    grid.rows[n[0]].cells[n[1]].classList.add('queued')
                    path[`${n[0]}-${n[1]}`] = `${currNode[0]}-${currNode[1]}`
                }
            }
            if (bfsQueue.length < 1) {
                setSearchActive(false)
                clearInterval(myInterval)
                setNotFound(true)
            }
        }), 5)
    }

    function DFS(e, start, end, walls) {
        let grid = document.getElementById("grid");
        let dfsQueue = [];
        let path = {};
        let currNode;
        let visited = 0;
        dfsQueue.push(start);
        let n;

        dfsQueue.push(start)
        var myInterval = setInterval((() => {
            currNode = dfsQueue.pop();
            if (currNode[0] === end[0] && currNode[1] === end[1]) {
                let endID = grid.rows[end[0]].cells[end[1]].id
                colourPath(grid, endID, path)
                clearInterval(myInterval);
                return
            }
            grid.rows[currNode[0]].cells[currNode[1]].classList.add('seen')
            visited += 1
            if (visited >= size * size - walls - 1) {
                colourPath(grid, '', path)
                clearInterval(myInterval)
                setNotFound(true)
            }
            for (let neighbour of neighbours) {
                n = [currNode[0] + neighbour[0], currNode[1] + neighbour[1]]
                if (currNode[0] >= 0 && currNode[0] < size && currNode[1] >= 0 && currNode[1] < size && checkNeighbour(grid, n)) {
                    dfsQueue.push(n)
                    grid.rows[n[0]].cells[n[1]].classList.add('queued')
                    path[`${n[0]}-${n[1]}`] = `${currNode[0]}-${currNode[1]}`
                }
            }
            if (dfsQueue.length < 1) {
                setSearchActive(false)
                clearInterval(myInterval)
                setNotFound(true)
            }
        }), 5)
    }

    function colourPath(grid, endPoint, path) {
        var pathInterval;
        let shortestPath = path[endPoint]
        pathInterval = setInterval(() => {
            let coords;
            if (shortestPath !== undefined) {
                coords  = shortestPath.split('-')
                coords[0] = parseInt(coords[0])
                coords[1] = parseInt(coords[1])
                shortestPath = path[shortestPath]
                grid.rows[coords[0]].cells[coords[1]].classList.add('path')
    
            } else {
                setSearchActive(false);
                // searchActive = false;
                clearInterval(pathInterval)
            }
        }, 15)
    }
  return (
    <>
         <Navbar id="grid-navbar" className="grid-navbar"> {/*variant="dark" bg="dark" > */}
            <Container>
            <Navbar.Brand href="#">Algorithm Visualizations</Navbar.Brand>
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

                    ))}
                    </NavDropdown>
            <Nav.Link onClick={(e) => {begin(e, activeAlgorithm.algo)}} className="nav-item" id="begin-search">Begin!</Nav.Link>
            <Nav.Link onClick={(e) => {resetBoard()}} className="nav-item">Reset Board</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        <Container className="disable-text-selection test">
           
            <Row>
                <Col>
                <table id="grid">
                    <Modal id="modal-popup" show={notFound} onHide={() => setNotFound(false)}>
                        <Modal.Header closeButton>No possible path! Remove some walls or reset the board.</Modal.Header>
                    </Modal>
                    <tbody>
                        {Array.from({length: size}, (v, i) => (`${i}`)).map(row => (
                            <tr className="my-row" key={row}>
                                {Array.from({length: size}, (w, j) => (`${j}`)).map(col => (
                                    // what a travesty
                                    // <td key={`${row}${col}`} id={`${row}-${col}`} onClick={(e) => {squareClick(e)}} className={row == Math.floor(size/2) ? col == Math.floor(size / 3) ? 'start'  : col == 2* Math.floor(size / 3) ? 'end' : '' : ''}></td>
                                    <td key={`${row}${col}`} id={`${row}-${col}`} onMouseOver={(e) => onMO(e)} onMouseDown={(e => {onMD(e)})} onMouseUp={(e) => {onMU(e)}}></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Col>
            </Row>
        </Container>
 
    </>
  );
}

export default Grid;
