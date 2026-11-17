# Anthormiga

Colonia de hormigas **Pheidole** (city builder + roguelike light).

Inspirado en el prototipo de *Ant Architect*, pero basado en la biología real de **Pheidole** (big-headed ants) en lugar de Atta (leafcutters).

## Diferencias clave vs Leafcutters (Atta)

| Aspecto              | Atta (original)              | Pheidole (este juego)                  |
|----------------------|------------------------------|----------------------------------------|
| Comida principal     | Hojas → Fungus               | Semillas + Proteína (insectos)         |
| Castas               | Varias (minims, media, majors) | **Dimorfismo completo**: Minors + Majors |
| Rol de Majors        | Defensa + hojas grandes      | Defensa + **moler semillas**           |
| Ratio castas         | Más fluido                   | Decisión estratégica (ideal ~10-20%)  |
| Tamaño de colonia    | Muy grande                   | Más pequeña y manejable                |

## Controles (prototipo actual)

- `ESPACIO` → Pasar al día siguiente (forrajeo + molienda + desarrollo de cría + consumo)
- `E` → La reina pone un huevo (cuesta 1 proteína)
- `M` → Forzar molienda de semillas crudas (requiere majors)

## Stack

- **Phaser 3** + **Vite** + **TypeScript**
- Pixel art friendly
- Listo para deploy en Netlify / GitHub Pages

## Cómo correr

```bash
npm install
npm run dev
```

## Roadmap inicial

- [x] Estructura base Phaser + Vite
- [x] Sistema de colonia con minors / majors
- [x] Recursos: semillas, semillas crudas, proteína
- [x] Desarrollo de cría y ratio de castas
- [ ] Vista de nido más detallada + hormigas animadas
- [ ] Construcción de habitaciones / túneles
- [ ] Seeds / drafts roguelike
- [ ] Combate básico (amenazas externas)
- [ ] Mejor UI y feedback visual

---

Hecho para Maxi · 2026
