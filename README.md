# Photo Sphere Viewer Test

Projeto de teste para o Photo Sphere Viewer com suporte a cenas organizadas, callouts animados, markers e transições suaves.

## 🎬 Estrutura de Cenas

Este projeto utiliza uma arquitetura modular baseada em **Scenes**. Cada cena encapsula:

- 🖼️ Imagem panorâmica 360°
- 📍 Markers interativos
- 💬 Callouts informativos com animações
- ✨ Efeitos de lensflare

### Como funciona

As cenas estão organizadas em `src/scenes/`:

- `beach.scene.ts` - Cena da praia (Key Biscayne)
- `building.scene.ts` - Cena do edifício (Top Building)
- `types.ts` - Definições de tipos TypeScript
- `index.ts` - Exports centralizados

### Adicionar nova cena

```typescript
// src/scenes/myScene.scene.ts
import { createCallout } from "../components/callouts";
import type { Scene } from "./types";

export const myScene: Scene = {
  id: "my-scene",
  name: "Minha Cena",
  panorama: "minha-imagem.jpg",
  markers: [],
  callouts: [
    createCallout({
      id: "callout-1",
      position: { yaw: "45deg", pitch: "10deg" },
      text: "Informação importante",
      direction: "left",
      size: 4,
    }),
  ],
  lensflares: [],
};
```

### Trocar de cena

```typescript
viewerRef.current?.setScene(buildingScene, {
  speed: 2000,
  rotation: true,
  effect: "fade",
});
```

📚 Veja mais detalhes em [src/scenes/README.md](src/scenes/README.md)

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
