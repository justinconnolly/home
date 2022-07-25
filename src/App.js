
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container} from 'react-bootstrap'
import Grid from './components/Grid'
import './css/styles.css'

function App() {
  return (
    <div className="App">
    <Navbar style={{background:"#e7f1ff"}} expand="lg">
    {/* <Navbar bg="light" expand="lg"> */}
      <Container fluid>
      <Navbar.Brand>Algorithm visualizations</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
      <Navbar.Collapse id="navbarScroll">
      {/* <Nav
      className="me-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    ></Nav> */}
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <Grid />
    </div>
  );
}

export default App;
