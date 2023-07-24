import React, { useRef, useEffect, useState } from 'react';

interface ImageMaskProps {
  imageUrl: string;
  maskColor: string;
}

const ImageMask: React.FC<ImageMaskProps> = ({ imageUrl, maskColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }, [imageUrl]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setIsDrawing(true);
    draw(event.nativeEvent);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isDrawing) {
      draw(event.nativeEvent);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const draw = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = maskColor;
    ctx.fill();
    ctx.closePath();
  };

  const generateImageMask = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Loop through the pixel data and create the mask
    for (let i = 0; i < data.length; i += 4) {
      // Check if the pixel is outside the drawn area (transparent) and set it to 0 (fully transparent)
      if (data[i + 3] === 0) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #000' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button onClick={generateImageMask}>Generate Mask</button>
    </div>
  );
};

export default ImageMask;