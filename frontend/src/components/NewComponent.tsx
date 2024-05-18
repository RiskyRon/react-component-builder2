import React, { useState, useEffect, useRef } from 'react';

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const canvasWidth = 400;
  const canvasHeight = 400;
  const snakeColor = '#00FF00';
  const foodColor = '#FF0000';
  const backgroundColor = '#333';
  const snakeSize = 20;

  const initialSnake = [{ x: 200, y: 200 }];
  const initialFood = { x: 100, y: 100 };
  const initialDirection = { x: 0, y: -snakeSize };

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState(initialDirection);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
      context.fillStyle = snakeColor;
      snake.forEach(segment => context.fillRect(segment.x, segment.y, snakeSize, snakeSize));
      context.fillStyle = foodColor;
      context.fillRect(food.x, food.y, snakeSize, snakeSize);
    }
  }, [snake, food]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -snakeSize });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: snakeSize });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -snakeSize, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: snakeSize, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      if (head.x >= canvasWidth || head.x < 0 || head.y >= canvasHeight || head.y < 0 || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(score + 1);
        setFood({
          x: Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize,
          y: Math.floor(Math.random() * (canvasHeight / snakeSize)) * snakeSize,
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  const resetGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection(initialDirection);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#222', color: '#FFF', height: '100vh', justifyContent: 'center' }}>
      <h1>Snake Game</h1>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ border: '2px solid #FFF', borderRadius: '10px' }} />
      <div style={{ marginTop: '20px' }}>
        <span>Score: {score}</span>
        {gameOver && <button onClick={resetGame} style={{ marginLeft: '20px', padding: '10px', borderRadius: '5px', backgroundColor: '#555', color: '#FFF', border: 'none' }}>Restart</button>}
      </div>
    </div>
  );
};

export default SnakeGame;
