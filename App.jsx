import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './componets/Header';

const CELL_SIZE = 20;
const WIDTH = 400;
const HEIGHT = 400;

const getRandomFoodPosition = () => ({
  x: Math.floor((Math.random() * WIDTH) / CELL_SIZE) * CELL_SIZE,
  y: Math.floor((Math.random() * HEIGHT) / CELL_SIZE) * CELL_SIZE,
});

const App = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState({ x: CELL_SIZE, y: 0 });
  const [food, setFood] = useState(getRandomFoodPosition());
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -CELL_SIZE });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: CELL_SIZE });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -CELL_SIZE, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: CELL_SIZE, y: 0 });
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (newDirection) => {
    switch (newDirection) {
      case 'UP':
        if (direction.y === 0) setDirection({ x: 0, y: -CELL_SIZE });
        break;
      case 'DOWN':
        if (direction.y === 0) setDirection({ x: 0, y: CELL_SIZE });
        break;
      case 'LEFT':
        if (direction.x === 0) setDirection({ x: -CELL_SIZE, y: 0 });
        break;
      case 'RIGHT':
        if (direction.x === 0) setDirection({ x: CELL_SIZE, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const update = setInterval(() => {
      setSnake((prev) => {
        const newSnake = [...prev];
        const newHead = {
          x: newSnake[0].x + direction.x,
          y: newSnake[0].y + direction.y,
        };

        // Проверка на столкновение с границами
        if (
          newHead.x < 0 ||
          newHead.x >= WIDTH ||
          newHead.y < 0 ||
          newHead.y >= HEIGHT ||
          newSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          return prev;
        }

        // Проверка на поедание еды
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomFoodPosition());
          return [newHead, ...prev]; // Увеличиваем змейку
        }

        newSnake.pop(); // Удаляем последний сегмент
        newSnake.unshift(newHead); // Добавляем новый сегмент
        return newSnake;
      });
    }, 100);

    return () => clearInterval(update);
  }, [direction, food, gameOver]);

  const handleRestart = () => {
    setSnake([{ x: 0, y: 0 }]);
    setDirection({ x: CELL_SIZE, y: 0 });
    setFood(getRandomFoodPosition());
    setGameOver(false);
  };

  return (
    
    <div className='divret'>
         <Header/>
      <h1 className='LOgos'>Game🐍</h1>
      <div className='divmar'
        style={{
          position: 'relative',
          width: WIDTH,
          height: HEIGHT,
          border: '1px solid black',
          overflow: 'hidden',
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: 'purple',
              borderRadius:'4px 4px',
              border:'1px solid white',
              left: segment.x,
              top: segment.y,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: 'rgb(244, 128, 20)',
            borderRadius:'8px 3px 6px 9px',
            left: food.x,
            top: food.y,
          }}
        />
        {gameOver && (
          <div className="game-over" onClick={handleRestart}>
            Game Over! <br />
            Click to restart
          </div>
        )}
      </div>

      {/* Кнопки управления снаружи игрового поля */}
      <div className="controls">
        <button onClick={() => handleButtonClick('UP')}>↑</button>
        <div>
          <button onClick={() => handleButtonClick('LEFT')}>←</button>
          <button onClick={() => handleButtonClick('RIGHT')}>→</button>
        </div>
        <button onClick={() => handleButtonClick('DOWN')}>↓</button>
      </div>
    </div>
  );
};

export default App;
