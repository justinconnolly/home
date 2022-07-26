
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Navbar, Container} from 'react-bootstrap'
import Grid from './Grid'
import '../css/styles.css'
import Links from './Links'

function makeList() {
  return {
    // <ul>
    //   <li> list item
    //   <li> list item 2
    // </ul>
  }
}

function About() {
  return (
    <div className="App">
      <Container>
        These are some interesting things about me.
      </Container>
    </div>
  );
}

export default About;