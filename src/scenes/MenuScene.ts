import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    const { width, height } = this.cameras.main;

    // Background
    this.add.rectangle(0, 0, width, height, 0x1a1612).setOrigin(0);

    // Title
    this.add
      .text(width / 2, height * 0.28, 'ANTHORMIGA', {
        fontFamily: 'monospace',
        fontSize: '64px',
        color: '#e8d5a3',
        stroke: '#3d2b1f',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.38, 'Colonia Pheidole', {
        fontFamily: 'monospace',
        fontSize: '22px',
        color: '#a89070',
      })
      .setOrigin(0.5);

    // Description
    this.add
      .text(
        width / 2,
        height * 0.52,
        'Minors forrajean y mantienen el nido.\nMajors defienden y muelen semillas.\nControlá el ratio de castas.',
        {
          fontFamily: 'monospace',
          fontSize: '16px',
          color: '#8a7a60',
          align: 'center',
          lineSpacing: 8,
        }
      )
      .setOrigin(0.5);

    // Play button
    const playBtn = this.add
      .text(width / 2, height * 0.72, '[  EMPEZAR COLONIA  ]', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#1a1612',
        backgroundColor: '#e08a45',
        padding: { x: 24, y: 12 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    playBtn.on('pointerover', () => playBtn.setStyle({ backgroundColor: '#f0a05a' }));
    playBtn.on('pointerout', () => playBtn.setStyle({ backgroundColor: '#e08a45' }));
    playBtn.on('pointerdown', () => {
      this.scene.start('Game');
      this.scene.launch('UI');
    });

    // Version
    this.add
      .text(width - 16, height - 16, 'v0.1.0 — prototype', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#5a4a3a',
      })
      .setOrigin(1, 1);
  }
}
