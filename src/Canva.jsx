import React, { useRef, useEffect, useState } from "react"
import axios from "axios"


function Canvas() {
  const canvasRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // set the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 10;
  }, []);

  const handleMouseDown = (event) => {
    setMouseCoordinates(event);
    setIsDrawing(true);

    // Start Drawing
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(mouseX, mouseY);
  };

  const handleMouseMove = (event) => {
    setMouseCoordinates(event);

    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  };

  const handleMouseUp = (event) => {
    setMouseCoordinates(event);
    setIsDrawing(false);
  };

  const setMouseCoordinates = (event) => {
    const canvas = canvasRef.current;
    const boundings = canvas.getBoundingClientRect();
    setMouseX(event.clientX - boundings.left);
    setMouseY(event.clientY - boundings.top);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // set the background color to white
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = async() => {
    const canvas = canvasRef.current;
    const canvasDataURL = canvas.toDataURL("image/png", 1.0); // set the MIME type to PNG
    try {
      const response = await axios.post("http://localhost:5000/writing/verify/hiragana", {
        dataURL: canvasDataURL,
        answer: "し"
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="left-block">
        <div className="buttons">
          <button id="clear" type="button" onClick={handleClear}>
            Clear
          </button>
          <button id="save" type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <div className="right-block">
        <canvas
          id="paint-canvas"
          width="640"
          height="400"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    </main>
  );
}

export default Canvas;

