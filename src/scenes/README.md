# Scenes Structure

Este projeto foi refatorado para usar uma estrutura de cenas organizadas e reutilizáveis.

## 📁 Estrutura de Pastas

```
src/
  scenes/
    types.ts              # Definições de tipos TypeScript
    beach.scene.ts        # Configuração da cena da praia
    building.scene.ts     # Configuração da cena do prédio
    index.ts              # Exports centralizados
```

## 🎬 O que é uma Scene?

Uma Scene é um objeto que encapsula todos os elementos de um panorama:

```typescript
interface Scene {
  id: string; // Identificador único da cena
  name: string; // Nome descritivo
  panorama: string; // Caminho para a imagem panorâmica
  markers: Marker[]; // Markers interativos (botões, ícones)
  callouts: Callout[]; // Callouts informativos
  lensflares: Lensflare[]; // Efeitos de lensflare
}
```

## ✨ Como Criar uma Nova Scene

1. **Crie um arquivo na pasta `scenes/`**:

   ```typescript
   // src/scenes/myScene.scene.ts
   import { createCallout } from "../components/callouts";
   import { createAnimatedCircleMarker } from "../components/markers";
   import type { Scene } from "./types";

   export const myScene: Scene = {
     id: "my-scene",
     name: "Minha Cena Personalizada",
     panorama: "minha-imagem.jpg",
     markers: [
       createAnimatedCircleMarker({
         id: "marker-1",
         position: { yaw: "0deg", pitch: "0deg" },
         tooltip: "Clique aqui!",
       }),
     ],
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

2. **Exporte a scene no `index.ts`**:

   ```typescript
   export { myScene } from "./myScene.scene";
   ```

3. **Use a scene no App.tsx**:

   ```typescript
   import { myScene } from "./scenes";

   // Para definir como cena inicial
   const [currentScene, setCurrentScene] = useState(myScene);

   // Para trocar de cena
   viewerRef.current?.setScene(myScene, {
     speed: 2000,
     rotation: true,
     effect: "fade",
   });
   ```

## 🔄 Mudança de Cenas

O método `setScene` do PhotoSphereViewer faz:

1. ✅ Limpa todos os markers/callouts da cena anterior
2. ✅ Atualiza os estados internos com a nova cena
3. ✅ Muda o panorama com transição
4. ✅ Adiciona os novos markers/callouts

Isso **resolve o problema** de callouts duplicados que ocorria antes!

## 🎨 Opções de Transição

```typescript
interface TransitionOptions {
  speed?: number | string; // Duração em ms ou "2rpm"
  rotation?: boolean; // Rotacionar câmera durante transição
  effect?: "fade" | "black" | "white"; // Efeito visual
}
```

## 📝 Exemplo Completo

```typescript
function App() {
  const viewerRef = useRef<PhotoSphereViewerRef>(null);
  const [currentScene, setCurrentScene] = useState(beachScene);

  const handleMarkerClick = (markerId: string) => {
    if (markerId === "house") {
      viewerRef.current?.setScene(buildingScene, {
        speed: 2000,
        rotation: true,
        effect: "fade",
      });
      setCurrentScene(buildingScene);
    }
  };

  return (
    <PhotoSphereViewer
      ref={viewerRef}
      src={currentScene.panorama}
      markers={currentScene.markers}
      callouts={currentScene.callouts}
      lensflares={currentScene.lensflares}
      onMarkerClick={handleMarkerClick}
      height="100vh"
      width="100%"
    />
  );
}
```

## 🚀 Benefícios desta Estrutura

- ✅ **Organização**: Cada cena em seu próprio arquivo
- ✅ **Reutilização**: Scenes podem ser facilmente compartilhadas
- ✅ **Manutenção**: Fácil adicionar/remover/editar cenas
- ✅ **Type Safety**: TypeScript garante a estrutura correta
- ✅ **Sem Duplicação**: O método `setScene` limpa markers anteriores
- ✅ **Modular**: Adicione quantas cenas quiser sem poluir o App.tsx
