import Phaser from 'phaser';

const FOOD_COLORS = [
  'FF4CFF',
  '02BCC1',
  'DC0000',
  'BBBDBC',
  'FC5654',
  '08FB41',
  'FFFF42'
];

const FOOD_SVGS = [
  'food1',
  'food2',
  'food3',
  'food4',
]

function getRandomColor(): number {
  const hex = Phaser.Utils.Array.GetRandom(FOOD_COLORS);
  return parseInt(hex, 16);
}

function getRandomSVG(): string {
  const svg = Phaser.Utils.Array.GetRandom(FOOD_SVGS);
  return svg
}

export default class Food extends Phaser.GameObjects.Container {
  body: Phaser.Physics.Arcade.Body;
  private circle: Phaser.GameObjects.Graphics;
  private icon: Phaser.GameObjects.Image;
  private radius: number;
  private color: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    radius: number = 10,
  ) {
    let color = getRandomColor()
    super(scene, x, y);
    this.radius = radius;
    this.color = color;

    // Круглая "еда"
    this.circle = scene.add.graphics();
    this.circle.fillStyle(color, 1);
    this.circle.fillCircle(0, 0, radius);
    this.add(this.circle);

    //SVG иконка по центру
    this.icon = scene.add.image(0, 0, getRandomSVG());
    this.icon.setDisplaySize(radius * 1.2, radius * 1.2); // чуть меньше круга
    this.icon.setOrigin(0.5);
    this.add(this.icon);

    // Добавляем на сцену и физику
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCircle(radius);
    this.body.setImmovable(true);
    this.setSize(radius * 2, radius * 2);
  }

  // Если вдруг захочешь менять цвет
  setColor(color: number): void {
    this.color = color;
    this.circle.clear();
    this.circle.fillStyle(color, 1);
    this.circle.fillCircle(0, 0, this.radius);
  }

  setRadius(radius: number): void {
    this.radius = radius;
    this.setSize(radius * 2, radius * 2);
    this.circle.clear();
    this.circle.fillStyle(this.color, 1);
    this.circle.fillCircle(0, 0, radius);
    // this.icon.setDisplaySize(radius * 1.2, radius * 1.2);
    this.body.setCircle(radius);
  }

  destroy(fromScene?: boolean): void {
    this.circle.destroy();
    this.icon.destroy();
    super.destroy(fromScene);
  }
}

