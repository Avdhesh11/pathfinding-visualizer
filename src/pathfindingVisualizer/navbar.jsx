import React, { Component } from "react";
import "./navbar.css";

const brand = window.innerWidth > 600 ? "Pathfinding Visualizer" : "Pathfinder";

class NavBar extends Component {
  state = {
    algorithm: "Visualize Algorithm",
    maze: "Generate Maze",
    pathState: false, //whether there is path on grid
    mazeState: false, //whether there is maze on grid
    speedState: "Slow",
  };

  selectAlgorithm(selection) {
    //if one algorithm is running we cannot select and run another algorithm
    if (this.props.visualizingAlgorithm) {
      return;
    }
    if (
      selection === this.state.algorithm ||
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: selection });
    }
    //if new algo is selected the clear the prvious grid if it is traversed
    else if (this.state.pathState) {
      this.clearPath();
      this.setState({ algorithm: selection });
    }
    //select algo
    else {
      this.setState({ algorithm: selection });
    }
  }

  selectMaze(selection) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (
      selection === this.state.maze ||
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: selection });
    } else if (!this.state.mazeState) {
      this.setState({ maze: selection });
    } else {
      this.clearGrid();
      this.setState({ maze: selection });
    }
  }
  
  visualizeAlgorithm() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    //clear the already present path
    if (this.state.pathState) {
      this.clearTemp();
      return;
    }
    if (
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: "Select an Algorithm!" });
    } else {
      this.setState({ pathState: true });
      if (this.state.algorithm === "Visualize Dijkstra")
        this.props.visualizeDijkstra();
      // else if (this.state.algorithm === "Visualize A*")
      //   this.props.visualizeAStar();
      // else if (this.state.algorithm === "Visualize Greedy BFS")
      //   this.props.visualizeGreedyBFS();
      // else if (this.state.algorithm === "Visualize Bidirectional Greedy")
      //   this.props.visualizeBidirectionalGreedySearch();
      else if (this.state.algorithm === "Visualize Breadth First Search")
        this.props.visualizeBFS();
      else if (this.state.algorithm === "Visualize Depth First Search")
        this.props.visualizeDFS();
      // else if (this.state.algorithm === "Visualize Random Walk")
      //   this.props.visualizeRandomWalk();
    }
  }

  generateMaze() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    // if somw path or walls already present the clear them first
    if (this.state.mazeState || this.state.pathState) {
      this.clearTemp();
    }
    if (
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: "Select a Maze!" });
    } else {
      this.setState({ mazeState: true });
      if (this.state.maze === "Generate Random Maze")
        this.props.generateRandomMaze();
      else if (this.state.maze === "Generate Recursive Maze")
        this.props.generateRecursiveDivisionMaze();
      else if (this.state.maze === "Generate Vertical Maze")
        this.props.generateVerticalMaze();
      else if (this.state.maze === "Generate Horizontal Maze")
        this.props.generateHorizontalMaze();
    }
  }

  clearGrid() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      algorithm: "Visualize Algorithm",
      maze: "Generate Maze",
      pathState: false,
      mazeState: false,
    });
  }

  //just clear the traversed path not walls
  clearPath() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearPath();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  //clear the complete grid
  clearTemp() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  changeSpeed(speed) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    let value = [10, 10];
    if (speed === "Slow") value = [50, 30];
    else if (speed === "Medium") value = [25, 20];
    else if (speed === "Fast") value = [10, 10];
    this.setState({ speedState: speed });
    this.props.updateSpeed(value[0], value[1]);
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand h1 mb-0" href="/">
          {brand}
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <div className="dropdown">
                <a
                  href="/#"
                  className="nav-link dropdown-toggle"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Algorithms
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize Dijkstra")}
                  >
                    Dijkstra's Algorithm
                  </button>
                  {/* <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize A*")}
                  >
                    A* Algorithm
                  </button> */}
                  {/* <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize Greedy BFS")}
                  >
                    Greedy Best First Search
                  </button> */}
                  {/* <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Bidirectional Greedy")
                    }
                  >
                    Bidirectional Greedy Search
                  </button> */}
                  {/* <div className="dropdown-divider"></div> */}
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Breadth First Search")
                    }
                  >
                    Breadth First Search
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Depth First Search")
                    }
                  >
                    Depth First Search
                  </button>
                  {/* <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() =>
                      this.selectAlgorithm("Visualize Random Walk")
                    }
                  >
                    Random Walk
                  </button> */}
                </div>
              </div>{" "}
            </li>

            <li className="nav-item dropdown">
              <div className="dropdown">
                <a
                  href="/#"
                  className="nav-link dropdown-toggle"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mazes
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Random Maze")}
                  >
                    Random Maze
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Recursive Maze")}
                  >
                    Recursive Division Maze
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Vertical Maze")}
                  >
                    Vertical Division Maze
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Horizontal Maze")}
                  >
                    Horizontal Division Maze
                  </button>
                </div>
              </div>{" "}
            </li>

            <li className="nav-item dropdown">
              <div className="dropdown">
                <a
                  href="/#"
                  className="nav-link dropdown-toggle"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Speed: {this.state.speedState}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Slow")}
                  >
                     Slow
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Medium")}
                  >
                    Medium
                  </button>
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.changeSpeed("Fast")}
                  >
                    Fast
                  </button>
                </div>
              </div>{" "}
            </li>
          </ul>
            <button
              type="button"
              className="btn btn-outline-success mr-2"
              onClick={() => this.visualizeAlgorithm()}
            >
              {this.state.algorithm}
            </button>
            <button
              type="button"
              className="btn btn-outline-success mr-2"
              onClick={() => this.generateMaze()}
            >
              {this.state.maze}
            </button>
            <button
              type="button"
              className="btn btn-outline-warning mr-2"
              onClick={() => this.clearGrid()}
            >
              Clear Gird
            </button>
          {/* </ul> */}
        </div>
      </nav>
    );
  }
}
export default NavBar;
