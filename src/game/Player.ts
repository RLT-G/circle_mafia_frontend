import Phaser from "phaser";
import { WSClient } from "../services/wsClient";
import { rgbToHex } from "./Scripts";

export class Player extends Phaser.GameObjects.Arc {
  private wsc: WSClient;
  private playerId: string;
  private mass: number;
  private color: [number, number, number]

  constructor(
    scene: Phaser.Scene,
    wsc: WSClient,
    id: string,
    x: number,
    y: number,
    mass: number,
    color: [number, number, number]
  ) {
    super(scene, x, y, mass, 0, 360, false, rgbToHex(color));
    this.wsc = wsc;
    this.playerId = id;
    this.mass = mass;
    this.color = color;

    scene.add.existing(this);

    // Камера сразу целится на игрока
    scene.cameras.main.startFollow(this, true, 0.1, 0.1);
  }

  update() {
    const pointer = this.scene.input.activePointer;

    // Переводим координаты курсора в мировые
    const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);

    const dx = worldPoint.x - this.x;
    const dy = worldPoint.y - this.y;

    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const ndx = dx / length;
    const ndy = dy / length;

    // Пинаем сервер
    this.wsc.move(ndx, ndy)
    this.updatePosition(this.x + ndx, this.y + ndy, this.mass, this.color)
  }

  public updatePosition(
    x: number,
    y: number,
    mass: number,
    color: [number, number, number]
  ) {
    // this.x = x;
    // this.y = y;
    // this.setRadius(mass);
    this.x = Phaser.Math.Linear(this.x, x, 0.1);
    this.y = Phaser.Math.Linear(this.y, y, 0.1);
    this.setRadius(Phaser.Math.Linear(this.radius, mass, 0.1));

    this.mass = mass;
    this.color = color;

    this.setFillStyle(rgbToHex(color));
  }
}


// import Phaser from 'phaser';
// 
// export default class Player extends Phaser.GameObjects.Container {
//   body: Phaser.Physics.Arcade.Body;
//   avatar: Phaser.GameObjects.Image;
//   private maskImage: Phaser.GameObjects.Image;
//   private text: Phaser.GameObjects.Text;
//   private borderColor: number;
//   radius: number;
// 
//   constructor(
//     scene: Phaser.Scene,
//     x: number,
//     y: number,
//     radius: number = 40,
//     textureKey: string = 'avatar',
//     text: string = '',
//     borderColor: number = 0xff0000
//   ) {
//     super(scene, x, y);
//     this.borderColor = borderColor;
//     this.radius = radius;
// 
//     // Аватар
//     this.avatar = scene.make.image({
//       key: textureKey,
//       add: false
//     });
//     this.avatar.setDisplaySize(radius * 2, radius * 2);
//     this.avatar.setOrigin(0.5, 0.5);
// 
//     // Маска (Пена)
//     const circleShape = scene.make.graphics({ x: 0, y: 0 });
//     circleShape.fillStyle(0xffffff);
//     circleShape.fillCircle(radius, radius, radius);
//     const maskTextureKey = `circle-mask-${Math.random()}`;
//     circleShape.generateTexture(maskTextureKey, radius * 2, radius * 2);
//     circleShape.destroy();
// 
//     this.maskImage = scene.add.image(x, y, maskTextureKey);
//     this.maskImage.setVisible(false);
//     this.add(this.maskImage);
// 
//     const mask = new Phaser.Display.Masks.BitmapMask(scene, this.maskImage);
//     this.avatar.setMask(mask);
// 
//     this.add(this.avatar);
// 
//     // Обводка
//     const border = scene.make.graphics();
//     border.lineStyle(1, borderColor);
//     border.strokeCircle(0, 0, radius);
//     this.add(border);
// 
//     // Текст в центре с адаптивным размером
//     // this.text = this.createAdaptiveText(scene, text, borderColor, radius);
//     // this.add(this.text);
// 
//     // Физика
//     scene.add.existing(this);
//     scene.physics.add.existing(this);
// 
//     this.body.setCircle(radius);
//     this.body.setCollideWorldBounds(true);
//     this.body.setDrag(500, 500);
//     this.setSize(radius * 2, radius * 2);
// 
//     scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.updateMask, this);
//   }
// 
//   private createAdaptiveText(
//     scene: Phaser.Scene,
//     text: string,
//     color: number,
//     radius: number
//   ): Phaser.GameObjects.Text {
//     // Рассчитываем максимально возможный размер шрифта
//     const maxFontSize = radius * 1.5; // Максимальный размер (можно регулировать)
//     const minFontSize = 1; // Минимальный размер шрифта
// 
//     // Создаем временный текст для измерения
//     const tempText = scene.add.text(0, 0, text, {
//       fontFamily: 'Arial',
//       fontSize: `${maxFontSize}px`,
//       color: `#${color.toString(16).padStart(6, '0')}`
//     });
// 
//     // Получаем размеры текста
//     const textWidth = tempText.width;
//     const textHeight = tempText.height;
//     tempText.destroy();
// 
//     // Рассчитываем оптимальный размер шрифта
//     const availableSpace = radius * 1.8; // Оставляем отступ от краев
//     const widthRatio = availableSpace / textWidth;
//     const heightRatio = availableSpace / textHeight;
//     const ratio = Math.min(widthRatio, heightRatio);
// 
//     let fontSize = Math.floor(maxFontSize * ratio);
//     fontSize = Math.max(fontSize, minFontSize); // Не меньше минимального
// 
//     // Создаем окончательный текст
//     return scene.make.text({
//       x: 0,
//       y: 0,
//       text: text,
//       style: {
//         fontFamily: 'Arial',
//         fontSize: `${fontSize}px`,
//         color: `#${color.toString(16).padStart(6, '0')}`,
//         align: 'center',
//         wordWrap: { width: radius * 1.8, useAdvancedWrap: true },
//         stroke: '#000000',
//         strokeThickness: Math.max(1, fontSize / 10)
//       }
//     }).setOrigin(0.5);
//   }
// 
//   private updateMask() {
//     if (this.maskImage) {
//       this.maskImage.setPosition(this.x, this.y);
//     }
//   }
// 
//   setText(newText: string): void {
//     this.text.setText(newText);
//     // Пересоздаем текст с новым размером
//     const oldText = this.text;
//     this.text = this.createAdaptiveText(this.scene, newText, this.borderColor, this.radius);
//     this.add(this.text);
//     oldText.destroy();
//   }
// 
//   setBorderColor(color: number): void {
//     this.borderColor = color;
//     const border = this.list.find(obj => obj instanceof Phaser.GameObjects.Graphics) as Phaser.GameObjects.Graphics;
//     if (border) {
//       border.clear();
//       border.lineStyle(4, color);
//       border.strokeCircle(0, 0, this.radius);
//     }
//     this.text.setStyle({
//       color: `#${color.toString(16).padStart(6, '0')}`
//     });
//   }
// 
//   grow(amount: number = 5): void {
//     this.radius += amount;
// 
//     // Увеличиваем аватар
//     this.avatar.setDisplaySize(this.radius * 2, this.radius * 2);
// 
//     // Перегенерируем маску
//     const circleShape = this.scene.make.graphics({ x: 0, y: 0 });
//     circleShape.fillStyle(0xffffff);
//     circleShape.fillCircle(this.radius, this.radius, this.radius);
//     const maskTextureKey = `circle-mask-${Math.random()}`;
//     circleShape.generateTexture(maskTextureKey, this.radius * 2, this.radius * 2);
//     circleShape.destroy();
// 
//     this.maskImage.setTexture(maskTextureKey);
//     this.maskImage.setDisplaySize(this.radius * 2, this.radius * 2);
// 
//     // Обновим маску
//     const mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.maskImage);
//     this.avatar.setMask(mask);
// 
//     // Обновляем обводку
//     const border = this.list.find(obj => obj instanceof Phaser.GameObjects.Graphics) as Phaser.GameObjects.Graphics;
//     if (border) {
//       border.clear();
//       border.lineStyle(1, this.borderColor);
//       border.strokeCircle(0, 0, this.radius);
//     }
// 
//     // Обновляем текст
//     // this.setText(this.text.text);
// 
//     // Обновляем физику
//     this.body.setCircle(this.radius);
//     this.setSize(this.radius * 2, this.radius * 2);
//   }
// 
//   destroy(fromScene?: boolean) {
//     this.scene.events.off(Phaser.Scenes.Events.POST_UPDATE, this.updateMask, this);
//     super.destroy(fromScene);
//   }
// }
// 
