import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



class Tooltip extends React.Component{
  constructor (props){
    super(props),
    this.state = {opacity: false},
    this.toggle = this.toggle.bind(this)
  }
toggle() {
  const tooltipNode = ReactDOM.findDOMNode(this),
  this.state(
    {opacity: !this.state.opacity,
    top: tooltipNode.offsetTop,
    left: Tooltip.offsetLeft, 
     })

}
render(){
  const style = {
    zIndex : (this.stat.opacity) ? 1000: -1000,
    opacity : +this.state.opacity,
    top: (this.state.top || 0) + 20,
    left: (this.state.left || 0) - 30
  }
     return (
      <div style= {{display: 'inline'}}>
     <span style= {{color: 'blue'}}
      onMouseEnter= {this.toggle}
      onMouseLeave= {this.toggle}>
     {this.props.children}
    </span>
     <div className = "tooltip bottom" style= {style} role= "tooltip">
      <div className =  "tooltip-arrow"></div>
       <div className =  "tooltip-inner">
        {this.props.text}
      </div>
     </div>
   </div>
  )
}


ReactDOM.render(<div>
  <Tooltip text = "The book you are reading now">React Quickly </Tooltip> was Published in 2017.its Owsum
  </div>,
document.getElementById('tooltip')
);
