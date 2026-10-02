/* =========================================================
   Esquilook — QR Code 3D do pagamento (fonte do assets/vendor/qr3d.js)
   Anime.js + adaptador de Three.js (getInstances, "Instanced Meshes"):
   cada quadradinho escuro do QR Code é uma instância de uma InstancedMesh.
   Os cubos começam espalhados, coloridos e girando, e voam até o lugar,
   formando o QR Code. No fim quem mostra o QR é o SVG nítido (bolao.js),
   que é o que o app do banco lê.
   Para gerar o arquivo usado pelo site: ver build/README.md.
   ========================================================= */

import { animate, createTimer } from "animejs";
import { getInstances } from "animejs/adapters/three";
import {
  WebGLRenderer, Scene, OrthographicCamera, AmbientLight, DirectionalLight,
  BoxGeometry, MeshLambertMaterial, InstancedMesh, Color,
} from "three";

const PALETTE = ["#4f46e5", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9"];

/**
 * Forma o QR Code em 3D dentro de `container`.
 * @param {HTMLElement} container elemento onde o canvas é colocado (ocupa 100% dele)
 * @param {{ cells: number[][], size: number, pixels: number, onDone?: () => void }} options
 *   cells: [linha, coluna] de cada módulo escuro; size: módulos por lado; pixels: largura em px
 * @returns {{ stop: () => void }} para interromper e liberar a placa de vídeo
 */
export function formQr(container, { cells, size, pixels, onDone }) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(pixels, pixels);
  renderer.setClearColor(0xffffff, 0);
  renderer.domElement.className = "pay-qr-3d";
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);

  // Câmera ortográfica: no fim, o QR fica plano e do tamanho exato do SVG
  const half = size / 2;
  const camera = new OrthographicCamera(-half, half, half, -half, 0.1, 200);
  camera.position.set(0, 0, 100);

  const scene = new Scene();
  scene.add(new AmbientLight(0xffffff, 1.4));
  const light = new DirectionalLight(0xffffff, 1.8);
  light.position.set(20, 30, 40);
  scene.add(light);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshLambertMaterial({ color: 0xffffff });
  const mesh = new InstancedMesh(geometry, material, cells.length);
  const tint = new Color();
  cells.forEach((_, i) => mesh.setColorAt(i, tint.set(PALETTE[i % PALETTE.length])));
  scene.add(mesh);

  // Onde cada cubo termina (o lugar do módulo no QR) e de onde ele sai (espalhado)
  const endX = cells.map(([, c]) => c - half + 0.5);
  const endY = cells.map(([r]) => half - r - 0.5);
  const rand = (min, max) => min + Math.random() * (max - min);
  const startX = cells.map(() => rand(-size, size));
  const startY = cells.map(() => rand(-size, size));
  // Atraso pela distância ao centro: o QR se forma do meio para as bordas
  const delay = cells.map((_, i) => Math.hypot(endX[i], endY[i]) / half * 900 + rand(0, 250));

  const instances = getInstances(mesh);
  const timer = createTimer({ onUpdate: () => renderer.render(scene, camera) });
  let stopped = false;

  // O grupo inteiro começa inclinado e termina de frente para a câmera
  const tilt = animate(mesh, { rotateX: [28, 0], rotateY: [-36, 0], duration: 2200, ease: "out(3)" });

  const flight = animate(instances, {
    x: { from: (_, i) => startX[i], to: (_, i) => endX[i] },
    y: { from: (_, i) => startY[i], to: (_, i) => endY[i] },
    z: { from: () => rand(4, 24), to: 0 },
    rotateX: { from: () => rand(-360, 360), to: 0 },
    rotateY: { from: () => rand(-360, 360), to: 0 },
    scale: { from: () => rand(1.6, 2.6), to: 1 }, // chegam grandes e encaixam no tamanho do módulo
    color: "#111111",
    delay: (_, i) => delay[i],
    duration: 1100,
    ease: "out(4)",
    onComplete: () => {
      if (stopped) return;
      renderer.render(scene, camera);
      timer.pause();
      onDone?.();
    },
  });

  return {
    stop() {
      if (stopped) return;
      stopped = true;
      flight.pause();
      tilt.pause();
      timer.pause();
      geometry.dispose();
      material.dispose();
      mesh.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
