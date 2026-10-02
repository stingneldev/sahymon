# build/ — QR Code 3D do pagamento

O site não tem etapa de build: tudo roda direto no navegador. A única exceção é a
animação 3D que forma o QR Code na janela de pagamento, que usa o Three.js e o
adaptador de Three.js do Anime.js. Esses pacotes são módulos que dependem um do
outro, então são juntados num arquivo só, `assets/vendor/qr3d.js`, que o
`bolao.js` carrega quando a janela de pagamento abre.

- Código da animação: `qr3d.src.js`
- Versões usadas: `package.json` (three 0.186.1, animejs 4.5.0, esbuild 0.28.2)

Para gerar o arquivo de novo depois de mudar `qr3d.src.js`:

```bash
cd build
npm install
npm run build
```

A pasta `build/node_modules/` não vai para o repositório (ver `.gitignore`).
