import React, { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef} from 'react-sketch-canvas';

const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    width:800,
    height:800
  };


  
const DrawArea = class extends React.Component {
    
    constructor(props) {
      super(props);
  
      this.canvas = React.createRef();
    }

    state = {

    }
  
    render() {
        return (
            <div>
            <ReactSketchCanvas
                id = "actualCanvas"
                ref={this.canvas}
                style={styles}
                strokeWidth={5}
                strokeColor={this.props.eraser ? "white" : this.props.colour}
            />
            </div>
      );
    }
  };

export default DrawArea