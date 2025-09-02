import React, { useContext, useEffect, useRef, useState } from "react";
import type { WSClient } from "../../../services/wsClient";
import { UserContext } from "../../../context";

interface Food {
  x: number;
  y: number;
  size: number;
  color: string;
}

interface IGameCanvas {
  wsc: WSClient;
}

const MAP_SIZE = 4000; // размер карты (квадрат 4000x4000)

const GameCanvas: React.FC<IGameCanvas> = ({ wsc }) => {
  const { userData, gameData, setGameData } = useContext(UserContext)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  let gameIsInit = false;

  // Состояние игрока
  const [player, setPlayer] = useState({
    x: MAP_SIZE / 2, // стартуем в центре карты
    y: MAP_SIZE / 2,
    radius: 20,
    color: "blue",
  });

  // Мышь
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Еда
  const foodsRef = useRef<Food[]>([]);

  const handleMouseMove = (e: MouseEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    wsc.onGameState((data) => {
      if (!gameIsInit) {
        console.log(data)
      }
      gameIsInit = true
    })

    // Сгенерим еду по всей карте
    // const foods: Food[] = Array.from({ length: 500 }).map(() => ({
    //   x: Math.random() * MAP_SIZE,
    //   y: Math.random() * MAP_SIZE,
    //   size: 5,
    //   color: `hsl(${Math.random() * 360}, 80%, 50%)`,
    // }));
    // foodsRef.current = foods;

    // Обновление мыши
    window.addEventListener("mousemove", handleMouseMove);
  }

  const render = (): number | undefined => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    // ===== Логика камеры =====
    const cameraX = player.x - width / 2;
    const cameraY = player.y - height / 2;

    // ===== Фон =====
    ctx.fillStyle = "#0a3d0a";
    ctx.fillRect(0, 0, width, height);

    // ===== Двигаем игрока к мышке =====
    const dx = mouse.current.x - width / 2; // смещение мышки относительно центра
    const dy = mouse.current.y - height / 2;
    const dist = Math.hypot(dx, dy);
    const speed = 3;
    if (dist > 1) {
      player.x += (dx / dist) * speed;
      player.y += (dy / dist) * speed;
    }

    // ===== Ограничение по карте =====
    player.x = Math.max(player.radius, Math.min(MAP_SIZE - player.radius, player.x));
    player.y = Math.max(player.radius, Math.min(MAP_SIZE - player.radius, player.y));

    // ===== Еда =====
    foodsRef.current = foodsRef.current.filter((food) => {
      const d = Math.hypot(player.x - food.x, player.y - food.y);
      if (d < player.radius + food.size) {
        player.radius += 0.3; // растём
        return false;
      }
      return true;
    });

    foodsRef.current.forEach((food) => {
      ctx.beginPath();
      ctx.arc(food.x - cameraX, food.y - cameraY, food.size, 0, Math.PI * 2);
      ctx.fillStyle = food.color;
      ctx.fill();
    });

    // ===== Игрок (всегда в центре экрана) =====
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("YOU", width / 2, height / 2 - player.radius - 5);

    return requestAnimationFrame(render);
  }

  useEffect(() => {
    initGame()
    const frameId = render();

    return () => {
      if (frameId) { cancelAnimationFrame(frameId); }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [player]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ display: "block", background: "#111" }}
    />
  );
};

export default GameCanvas;




