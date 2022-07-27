import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import Viz from './components/Viz';
import Home from './components/Home'
import About from './components/About'
import Links from './components/Links'
import Sort from './components/Sort'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap'
import './css/styles.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <div className="App">
    <Navbar style={{background:"#e7f1ff"}} expand="lg">
      <Container fluid>
      <Navbar.Brand>JC</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <Nav.Link href="/home/">Home</Nav.Link>
          <Nav.Link href="/home/visualizer">Pathfinding</Nav.Link>
          <Nav.Link href="/home/sort">Sorting</Nav.Link>
          <Nav.Link href="/home/about">About Me</Nav.Link>
        </Nav>     
      </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <BrowserRouter basename="/home">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/visualizer" element={<Viz/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sort" element={<Sort/>} />
      </Routes>
    </BrowserRouter>
    <Container>
      <hr/>
      <Links/>
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
