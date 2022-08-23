
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container} from 'react-bootstrap'

function Home() {
  return (
    <div className="App">
      <Container>
        Hi, I'm Justin. I'm a fourth year student in the Bachelor of Computer Science Honours program at Carleton University in Ottawa, Ontario. I'm also in the Accelerated MCS prepatory program, allowing me to take graduate courses this upcoming year.<br/>
        I like algorithm design, graphs, combinatorics, and pretty much anything that can be a puzzle.
        In my spare time I've been working on a graph module in python to learn associated algorithms and related data structures, check it out <a href="https://github.com/justinconnolly/graph-algorithms">here</a>.
      </Container>
    </div>
  );
}

export default Home;
