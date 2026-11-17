import Phaser from 'phaser';
import { ColonySystem } from '../systems/ColonySystem';

/**
 * Escena principal del nido (vista de corte).
 * Por ahora es un prototipo visual + lógica de colonia.
 */
export class GameScene extends Phaser.Scene {
  colony!: ColonySystem;
  private dayText!: Phaser.GameObjects.Text;
  private infoText!: Phaser.GameObjects.Text;
  private nestGraphics!: Phaser.GameObjects.Graphics;

  constructor() {
    super('Game');
  }

  create() {
    this.colony = new ColonySystem();

    const { width, height } = this.cameras.main;

    // Cielo / superficie
    this.add.rectangle(0, 0, width, height * 0.28, 0x2a3a28).setOrigin(0);
    // Horizonte
    this.add.rectangle(0, height * 0.28, width, 4, 0x3d4a32).setOrigin(0);
    // Tierra
    this.add.rectangle(0, height * 0.28 + 4, width, height, 0x3a2a1a).setOrigin(0);

    // Nido (capa más oscura)
    this.nestGraphics = this.add.graphics();
    this.drawNest();

    // Textos de estado
    this.dayText = this.add
      .text(24, 16, '', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#e8d5a3',
      });

    this.infoText = this.add
      .text(24, 48, '', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#c0a878',
        lineSpacing: 6,
      });

    this.updateUI();

    // Controles básicos
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.colony.nextDay();
      this.updateUI();
      this.drawNest();
    });

    this.input.keyboard?.on('keydown-E', () => {
      if (this.colony.layEgg()) {
        this.updateUI();
      }
    });

    this.input.keyboard?.on('keydown-M', () => {
      this.colony.millSeeds(2);
      this.updateUI();
    });

    // Instrucciones
    this.add
      .text(width - 24, height - 80, 'ESPACIO: pasar día\nE: poner huevo\nM: moler semillas', {
        fontFamily: 'monospace',
        fontSize: '13px',
        color: '#7a6a50',
        align: 'right',
      })
      .setOrigin(1, 1);
  }

  private drawNest() {
    this.nestGraphics.clear();
    const { width, height } = this.cameras.main;
    const surfaceY = height * 0.28 + 4;

    // Cámara de la reina (centro)
    const qx = width * 0.5;
    const qy = surfaceY + 180;
    this.nestGraphics.fillStyle(0x2a1f14, 1);
    this.nestGraphics.fillCircle(qx, qy, 48);

    // Túneles simples según progreso
    this.nestGraphics.lineStyle(18, 0x2a1f14, 1);
    this.nestGraphics.beginPath();
    this.nestGraphics.moveTo(qx, surfaceY + 20);
    this.nestGraphics.lineTo(qx, qy - 40);
    this.nestGraphics.strokePath();

    // Rooms extras
    for (let i = 0; i < this.colony.state.nestRooms; i++) {
      const angle = (i / Math.max(1, this.colony.state.nestRooms)) * Math.PI - Math.PI / 2;
      const rx = qx + Math.cos(angle) * (90 + i * 30);
      const ry = qy + Math.sin(angle) * (50 + i * 20);
      this.nestGraphics.fillStyle(0x2a1f14, 1);
      this.nestGraphics.fillCircle(rx, ry, 28);
      this.nestGraphics.lineStyle(12, 0x2a1f14, 1);
      this.nestGraphics.beginPath();
      this.nestGraphics.moveTo(qx, qy);
      this.nestGraphics.lineTo(rx, ry);
      this.nestGraphics.strokePath();
    }

    // Hormigas simples (puntos)
    const drawAnt = (x: number, y: number, isMajor: boolean) => {
      this.nestGraphics.fillStyle(isMajor ? 0xc07040 : 0xa08050, 1);
      this.nestGraphics.fillCircle(x, y, isMajor ? 5 : 3);
    };

    // Algunos minors alrededor
    for (let i = 0; i < Math.min(this.colony.state.minors, 20); i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 30 + Math.random() * 80;
      drawAnt(qx + Math.cos(a) * r, qy + Math.sin(a) * r * 0.6, false);
    }
    // Majors
    for (let i = 0; i < Math.min(this.colony.state.majors, 8); i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 20 + Math.random() * 50;
      drawAnt(qx + Math.cos(a) * r, qy + Math.sin(a) * r * 0.5, true);
    }
  }

  private updateUI() {
    const s = this.colony.state;
    this.dayText.setText(`Día ${s.day}`);

    this.infoText.setText(
      [
        `Minors: ${s.minors}   Majors: ${s.majors}   (${(this.colony.majorRatio * 100).toFixed(0)}%)`,
        `Huevos: ${s.eggs}   Larvas: ${s.larvae}`,
        `Semillas: ${s.seeds}   Crudas: ${s.rawSeeds}   Proteína: ${s.protein}`,
        `Habitaciones: ${s.nestRooms}`,
      ].join('\n')
    );
  }
}
