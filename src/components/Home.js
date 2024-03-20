
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container} from 'react-bootstrap'

function Home() {
  return (
    <div className="App">
      <Container>
        Hi, I'm Justin. I'm a computer scientist from Ottawa, Ontario. I 
        I like algorithm design, graphs, combinatorics, and pretty much anything that can be a puzzle.
        In my spare time I've been working on a graph module in python to learn associated algorithms and related data structures, check it out <a href="https://github.com/justinconnolly/graph-algorithms">here</a>.
        Check out my python library for the Garmin LiDAR Lite v3 <a href="https://github.com/justinconnolly/Lidar-Lite-V3/">here</a>.
      </Container>
    </div>
  );
}

export default Home;
