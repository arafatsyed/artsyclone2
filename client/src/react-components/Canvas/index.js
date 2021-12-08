import React, { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import "./styleCanvas.css"
import DrawArea from '../DrawArea';

import paintBrush from './static/paintBrush.png'
import eraser from './static/eraser.png'
import trash from './static/trash.png'
import undo from './static/undo.png'
import redo from './static/redo.png'
import upload from './static/upload.png'
import download from './static/download.png'
import submit from './static/submit.png'
import {getExplorePageElems } from '../../action/user';
import ENV from './../../config.js'
const API_HOST = ENV.api_host;

class Canvas extends React.Component {
    constructor(props) {
        super(props);
    
        this.canvasRef = React.createRef();
    }

    state = {
        eraser: false,
        colour: "black",
        path: null
    }

    swapToEraser = () => {
        this.setState({
            eraser: true
        })
    }

    swapToBrush = () => {
        this.setState({
            eraser: false
        })
    }

    changeColour = (e) => {
        const target = e.target
        const value = target.value
        this.setState({
            eraser: false,
            colour: value
        })
    }

    clearHandler = () => {
        this.canvasRef.current.resetCanvas();
    };

    uploadHandler = () => {
        this.canvasRef.current.exportPaths()
            .then(param => {
                this.setState({
                    path: param
                })
            })
        console.log(this.state.path)
    }

    downloadHandler = () => {
        this.canvasRef.current.resetCanvas();
        if(this.state.path !== null){
            this.canvasRef.current.loadPaths(this.state.path);
        }
        
    }

    undoHandler = () => {
        this.canvasRef.current.undo();
    }

    redoHandler = () => {
        this.canvasRef.current.redo();
    }

    submitHandler = () => {
        this.canvasRef.current.exportImage('jpeg')
            .then(param => {
                const fileObject = {img: param}
          
                const request = new Request(`${API_HOST}/images`,{
                    method: "post",
                    body: JSON.stringify(fileObject),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json"
                    }
                })
                
                fetch(request)
                    .then(()=>{
                        getExplorePageElems(this.props.app)
                        window.confirm(`Successfully Submitted to the Challenge: ${this.props.currChallenge}`)
                    })
                //console.log(param)
            })
            this.canvasRef.current.resetCanvas();
    }


    render() {
        return (
            <div> 
                <div id="wholeCanvas">
                    <div id="challenge" className="body">
                        <span className="body">This Week's Challenge:</span> {this.props.currChallenge}
                    </div>
                    <div className="flexBox">
                        <div className = "workingCanvas">
                            <ReactSketchCanvas
                                id = "actualCanvas"
                                ref={this.canvasRef}
                                strokeWidth={5}
                                strokeColor={this.state.eraser ? "white" : this.state.colour}
                            />
                        </div>
                        <div className="toolBar">
                            <div className="tool" onClick = {this.swapToBrush}>
                                <img src = {paintBrush} className="icon"/>
                                <span class = "tooltipText">Paint Brush</span>
                            </div>
                            <div className="tool" onClick = {this.swapToEraser}>
                                <img src = {eraser} className="icon"/>
                                <span class = "tooltipText">Eraser</span>
                            </div>

                            <div className="tool">
                                <input type="color" className="colourInput" onChange={this.changeColour}/>
                            </div>
                            <div className="tool" onClick = {this.clearHandler}>
                                <img src = {trash} className="icon"/>
                                <span class = "tooltipText">Clear Canvas</span>
                            </div> 

                            <div className="tool" onClick = {this.undoHandler}>
                                <img src = {undo} className="icon"/>
                                <span class = "tooltipText">Undo</span>
                            </div>
                            <div className="tool" onClick = {this.redoHandler}>
                                <img src = {redo} className="icon"/>
                                <span class = "tooltipText">Redo</span>
                            </div> 
							
                            <div className="tool" onClick = {this.uploadHandler}>
                                <img src = {upload} className="icon"/>
								<span class = "tooltipText">Upload</span>
                            </div>
                            <div className="tool" onClick = {this.downloadHandler}>
                                <img src = {download} className="icon"/>
								<span class = "tooltipText">Download</span>
                            </div>
                            <div className="tool" onClick = {this.submitHandler}>
                                <img src = {submit} className="icon"/>
								<span class = "tooltipText">Submit</span>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}

export default Canvas
