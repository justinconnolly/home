import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Viz from './components/Viz';
import Home from './components/Home'
import About from './components/About'
import Links from './components/Links'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <div className="App">
    <Navbar style={{background:"#e7f1ff"}} expand="lg">
    {/* <Navbar bg="light" expand="lg"> */}
      <Container fluid>
      <Navbar.Brand>JC</Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/visualizer">Visualizer</Nav.Link>
          <Nav.Link href="/about">About Me</Nav.Link>
        </Nav>
      {/* <Nav
      className="me-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    ></Nav> */}
            
      </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    {/* <Container> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="visualizer" element={<Viz/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </BrowserRouter>
    <Container>
          <hr/>
          <Links/>
        </Container>
    {/* </Container> */}

    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
