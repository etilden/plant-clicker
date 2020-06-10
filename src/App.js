import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      stems:0,
      leaves: 0,
      roots: 0,
      sunlight: 10,
      soil: 10,
      water: 10,
      error: false
    }
    this.clickIncrementer = this.clickIncrementer.bind(this); 
    this.timedIncrementer = this.timedIncrementer.bind(this); 
    this.timer = this.timer.bind(this); 
    this.setCanvas = this.setCanvas.bind(this); 
    this.grow = this.grow.bind(this);
    
  }

  componentDidMount() {
    setInterval(() => {this.timer()}, 2000);
    this.setCanvas(); 
  }

  timer() {
    if (this.state.leaves) {
      this.setState({ sunlight: this.state.sunlight + 1 })
    }
    if (this.state.roots) {
      this.setState({ water: this.state.water + 1 })
    } 
  }

  clickIncrementer = (event) => {
    if (event.target.value === "sunlight" || event.target.value === "soil" || event.target.value ==="water") {
      this.setState({...this.state, [event.target.value]: this.state[event.target.value] + 1}); 
    } else if ((event.target.value === "stems" ||  event.target.value === "roots") && this.state.sunlight >= 10 && this.state.soil >= 5 && this.state.water >= 5) {
      if (event.target.value === "stems") {
        this.grow(event.target.value, this.state[event.target.value] + 1); 
      }
      this.setState({...this.state, [event.target.value]: this.state[event.target.value] + 1, soil: this.state.soil - 5, water: this.state.water - 5, sunlight: this.state.sunlight - 10}); 
    } else if (event.target.value === "leaves" && this.state.sunlight >= 10 && this.state.soil >= 5 && this.state.water >= 5 && this.state.stems >= 2*this.state.leaves + 1) {
      this.grow(event.target.value); 
      this.setState({...this.state, [event.target.value]: this.state[event.target.value] + 1, sunlight: this.state.sunlight - 10, soil: this.state.soil - 5, water: this.state.water - 5, });
    } else {
      this.setState({...this.state, error: !this.state.error})
      setTimeout(() => {
        this.setState({...this.state, error: !this.state.error})
      }, 2000);
    }
  }

  timedIncrementer = () => {
    if (this.state.leaves) {
      this.setState({...this.state, sunlight: this.state.sunlight + 1})
    }
    if (this.state.roots) {
      this.setState({...this.state, soil: this.state.soil + 1})
    }
  }

  setCanvas() {
    const context = this.refs.canvas.getContext('2d');
    context.moveTo(115,120);
    context.lineTo(200,120);
    context.lineTo(190,150);
    context.lineTo(125,150);
    context.closePath(); 
    context.lineWidth = 2;
    context.fillStyle="brown";
    context.fill();
    context.stroke();
  }

  grow(type, num) {
    const context = this.refs.canvas.getContext('2d');
    if (type === 'stems') {
      if (num%2) {
        // context.moveTo(160,120);
        // context.lineTo(120,100);
        context.moveTo(120,100);
        context.lineTo(170,120);
        // context.strokestyle = '#00FF00'; //this will set color at some point
        context.stroke(); 
      } else {
        console.log('he')
      }
    } else {
      console.log('we\'ll get there')
    }
  }

  render() {
    return (
      <div className="App">
          <div className="header">
            <p className="headerContentLeft">Plant Resources</p>
            <p className="headerContentRight">Your Plant</p>
          </div>
        <div className="content" >
          <div className="resources">
            <table>
              <tbody>
                <div className="theBasics">
                <div>
                    <tr>
                      <td className="right">Soil: {this.state.soil}</td>
                      <td className="left"><button value="soil" onClick={(event) => this.clickIncrementer(event)}>Add Soil</button></td>
                    </tr>
                </div>
                <div>
                    <tr>
                      <td className="right">Water: {this.state.water}</td>
                      <td className="left"><button value="water" onClick={(event) => this.clickIncrementer(event)}>Add Water</button></td>
                    </tr>
                </div>
                <div>
                    <tr>
                      <td className="right">Sunlight: {this.state.sunlight}</td>
                      <td className="left"><button value="sunlight" onClick={(event) => this.clickIncrementer(event)}>Add Sunlight</button></td>
                    </tr>
                </div>
                </div>  
                <div className="growth">
                  <div>
                      <tr>
                        <td className="right">Roots: {this.state.roots}</td>
                        <td className="left"><button value="roots" onClick={(event) => this.clickIncrementer(event)}>Grow Roots</button></td>
                      </tr>
                  </div>
                  <div>
                      <tr>
                        <td className="right">Stems: {this.state.stems}</td>
                        <td className="left"><button value="stems" onClick={(event) => this.clickIncrementer(event)}>Grow Stems</button></td>
                      </tr>
                  </div>
                  <div>
                      <tr>
                        <td className="right">Leaves: {this.state.leaves}</td>
                        <td className="left"><button value="leaves" onClick={(event) => this.clickIncrementer(event)}>Grow Leaves</button></td>
                      </tr>
                  </div>
                </div>
              </tbody>
            </table>
            {this.state.error ? <p>You need more supplies in order to complete this action! </p> : null }
          </div>
          <div className="plant">
            <canvas ref="canvas" ></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
