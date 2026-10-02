/* =========================================================
   Esquilook — QR Code 3D do pagamento (fonte do assets/vendor/qr3d.js)
   Anime.js + adaptador de Three.js (getInstances, "Instanced Meshes"):
   cada quadradinho escuro do QR Code é uma instância de uma InstancedMesh.
   Os cubos (em tons de grafite) já nascem no lugar de cada módulo e caem
   girando, em onda do centro para as bordas, enquanto o código se endireita
   de uma inclinação 3D. No fim quem mostra o QR é o SVG nítido (bolao.js),
   que é o que o app do banco lê.
   Para gerar o arquivo usado pelo site: ver build/README.md.
   ========================================================= */

import { animate, createTimer, utils } from "animejs";
import { getInstances } from "animejs/adapters/three";
import {
  WebGLRenderer, Scene, OrthographicCamera, AmbientLight, DirectionalLight,
  BoxGeometry, MeshLambertMaterial, InstancedMesh, Color,
} from "three";

// Tons de grafite (sem cores): claro o bastante para o 3D mostrar volume, e escurece até o fim
const INK_START = "#475569";
const INK_END = "#0f172a";

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
  scene.add(new AmbientLight(0xffffff, 1.1));
  const light = new DirectionalLight(0xffffff, 2.4);
  light.position.set(-15, 25, 40);
  scene.add(light);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshLambertMaterial({ color: 0xffffff });
  const mesh = new InstancedMesh(geometry, material, cells.length);
  const tint = new Color(INK_START);
  cells.forEach((_, i) => mesh.setColorAt(i, tint));
  scene.add(mesh);

  // Cada cubo já nasce no lugar do seu módulo, acima do plano, invisível e virado
  const endX = cells.map(([, c]) => c - half + 0.5);
  const endY = cells.map(([r]) => half - r - 0.5);
  // 0 no centro, 1 nos cantos: o QR se constrói em onda, do meio para as bordas
  const reach = cells.map((_, i) => Math.hypot(endX[i], endY[i]) / (half * Math.SQRT2));

  const instances = getInstances(mesh);
  utils.set(instances, { x: (_, i) => endX[i], y: (_, i) => endY[i], z: 14, scale: 0, rotateX: -90 });

  const timer = createTimer({ onUpdate: () => renderer.render(scene, camera) });
  let stopped = false;

  // O código inteiro começa inclinado, mostrando a profundidade, e termina de frente
  const tilt = animate(mesh, {
    rotateX: [50, 0], rotateY: [-24, 0], rotateZ: [-6, 0],
    delay: 150, duration: 2000, ease: "inOut(3)",
  });

  // Os cubos caem no lugar girando e encaixam com um leve "pulo"
  const build = animate(instances, {
    z: { to: 0, ease: "out(3)" },
    rotateX: { to: 0, ease: "out(3)" },
    scale: { to: 1, ease: "outBack(1.6)" },
    color: INK_END,
    delay: (_, i) => reach[i] * 1100 + Math.random() * 90,
    duration: 650,
  });

  // Só termina quando os cubos pousaram e o código ficou de frente
  Promise.all([tilt, build]).then(() => {
    if (stopped) return;
    renderer.render(scene, camera);
    timer.pause();
    onDone?.();
  });

  return {
    stop() {
      if (stopped) return;
      stopped = true;
      build.pause();
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
