
import Phaser from "phaser";
import { WSClient, type IGameState } from "../services/wsClient";
import { formatTime, rgbToHex } from "./Scripts";
import { Player } from "./Player";

export class MainScene extends Phaser.Scene {
  private wsc: WSClient;
  private fieldWidth: number;
  private fieldHeight: number;
  private gridSize = 50;
  private initialized = false;
  private user_id: string;
  private baseZoom = 8;
  private baseRadius = 10; // например, начальный радиус игрока

  private players: Record<string, Phaser.GameObjects.Arc> = {};
  private foods: Phaser.GameObjects.Arc[] = [];
  private currentPlayer?: Player;

  private setGameData: any;

  // private graphics?: Phaser.GameObjects.Graphics;
  // private safeZoneGraphics?: Phaser.GameObjects.Graphics;
  private safeZoneGraphics?: Phaser.GameObjects.Graphics;
  private gridGraphics?: Phaser.GameObjects.Graphics;
  private bonusZoneGraphics?: Phaser.GameObjects.Graphics;

  constructor(wsc: WSClient, user_id: string, width: number, height: number, setGameData: any) {
    super("MainScene");
    this.wsc = wsc;
    this.user_id = user_id;
    this.fieldWidth = width;
    this.fieldHeight = height;
    this.setGameData = setGameData;
  }

  create() {
    // Подписка на данные от сервера
    this.wsc.onGameState((state: IGameState) => {
      if (!this.initialized) {
        this.initGame(state);
        this.initialized = true;
      }
      this.updateGame(state);

      // if (state.bonus_zones)
    });
  }

  private initGame(state: IGameState) {
    this.fieldWidth = state.map_info.width;
    this.fieldHeight = state.map_info.height;

    this.drawGrid();

    // Камера с запасом
    this.cameras.main.setBounds(
      -this.fieldWidth,
      -this.fieldHeight,
      this.fieldWidth * 3,
      this.fieldHeight * 3
    );

    this.cameras.main.centerOn(0, 0);
    this.cameras.main.setZoom(this.baseZoom);

    console.log(state)
  }

  private updateGame(state: IGameState) {
    this.updatePlayers(state.players);
    this.updateFoods(state.foods);
    this.drawBonusZone(state.bonus_zones)
    this.drawSafeZone(state.safe_zone.bounds);

    if (this.currentPlayer) {
      this.currentPlayer.update()
    }

    if (this.currentPlayer) {
      const currentRadius = this.currentPlayer.radius;
      let newZoom = this.baseZoom * (this.baseRadius / currentRadius);
      newZoom = Phaser.Math.Clamp(newZoom, 1.0, 8);
      this.cameras.main.setZoom(newZoom);
    }

    this.setGameData(oldData => ({
      ...oldData,
      time_to_next_shrink: formatTime(state.safe_zone.time_to_next_shrink)
    }))
  }

  private updatePlayers(playersData: IGameState["players"]) {
    for (const id in playersData) {
      const p = playersData[id];

      if (id === this.user_id) {
        if (!this.currentPlayer) {
          this.currentPlayer = new Player(this, this.wsc, id, p.x, p.y, p.mass, p.color);
        } else {
          this.currentPlayer.updatePosition(p.x, p.y, p.mass, p.color);
          this.setGameData(oldData => ({
            ...oldData,
            mass: p.mass
          }))
        }
      } else {
        if (!this.players[id]) {
          this.players[id] = this.add.circle(
            p.x,
            p.y,
            p.mass,
            rgbToHex(p.color)
          );
        } else {
          const playerObj = this.players[id];
          // playerObj.x = p.x;
          // playerObj.y = p.y;
          // playerObj.setRadius(p.mass);
          playerObj.x = Phaser.Math.Linear(playerObj.x, p.x, 0.1);
          playerObj.y = Phaser.Math.Linear(playerObj.y, p.y, 0.1);
          playerObj.setRadius(Phaser.Math.Linear(playerObj.radius, p.mass, 0.1));

          playerObj.setFillStyle(rgbToHex(p.color));
        }
      }
    }
  }

  private updateFoods(foodsData: IGameState["foods"]) {
    // Удаляем старые и рисуем заново (можно оптимизировать)
    this.foods.forEach(f => f.destroy());
    this.foods = [];

    for (const food of foodsData) {
      const f = this.add.circle(
        food.x,
        food.y,
        food.mass,
        rgbToHex(food.color)
      );

      this.foods.push(f);
    }
  }

  private drawSafeZone(bounds: {
    left: number;
    top: number;
    width: number;
    height: number;
  }) {
    if (!this.safeZoneGraphics) {
      this.safeZoneGraphics = this.add.graphics();
    }
    this.safeZoneGraphics.clear();

    this.safeZoneGraphics.lineStyle(2, 0xE91616, 1);
    this.safeZoneGraphics.strokeRect(bounds.left, bounds.top, bounds.width, bounds.height);
  }

  private drawGrid() {
    if (!this.gridGraphics) {
      this.gridGraphics = this.add.graphics();
    }
    this.gridGraphics.clear();

    this.gridGraphics.lineStyle(1, 0x333333, 1);

    for (let x = 0; x <= this.fieldWidth; x += this.gridSize) {
      this.gridGraphics.moveTo(x, 0);
      this.gridGraphics.lineTo(x, this.fieldHeight);
    }

    for (let y = 0; y <= this.fieldHeight; y += this.gridSize) {
      this.gridGraphics.moveTo(0, y);
      this.gridGraphics.lineTo(this.fieldWidth, y);
    }

    this.gridGraphics.strokePath();
  }

  private drawBonusZone(zones: { x: number; y: number; radius: number }[]) {
    if (!this.bonusZoneGraphics) {
      this.bonusZoneGraphics = this.add.graphics();
    }

    this.bonusZoneGraphics.clear();

    zones.forEach(zone => {
      // Заливка — зелёный с 40% прозрачности
      this.bonusZoneGraphics.fillStyle(0x00ff00, 0.4);
      this.bonusZoneGraphics.beginPath();
      this.bonusZoneGraphics.arc(zone.x, zone.y, zone.radius, 0, Phaser.Math.PI2, false);
      this.bonusZoneGraphics.fillPath();

      // Обводка — тёмно-зелёный
      this.bonusZoneGraphics.lineStyle(2, 0x008000, 1);
      this.bonusZoneGraphics.strokePath();
    });
  }
}
