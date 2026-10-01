/* =========================================================
   Esquilook — animação dos textos da tela de login
   Anime.js v4 (assets/vendor), efeito "splitText por chars":
   cada letra fica numa janela recortada (wrap: "clip") e sobe para o lugar.
   - Título: entra, fica um tempo e sai por cima, em loop.
   - Demais textos: só a entrada, uma vez (não somem enquanto alguém digita).
   ========================================================= */

(() => {
  const lib = window.anime;
  const auth = document.getElementById("auth");
  if (!lib?.splitText || !lib?.animate || !auth) return; // sem a biblioteca: textos ficam parados

  const { animate, splitText, stagger } = lib;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  // Elementos animados, na ordem em que aparecem
  const ITEMS = [
    { sel: ".auth-brand span", loop: true },
    { sel: ".auth-sub", start: 350, step: 12 },
    { sel: "#authForm .field:nth-of-type(1) > span", start: 700 },
    { sel: 'label[for="authPass"]', start: 800 },
    { sel: "#authSubmit", start: 950 },
  ];

  let splits = [];

  function stop() {
    splits.forEach((s) => s.revert()); // desfaz a divisão e encerra as animações (addEffect)
    splits = [];
  }

  function play() {
    stop();
    if (reduceMotion.matches) return;

    for (const item of ITEMS) {
      const el = auth.querySelector(item.sel);
      if (!el || !el.textContent.trim()) continue;
      const split = splitText(el, { chars: { wrap: "clip" } });

      split.addEffect(({ chars }) => item.loop
        // Igual ao exemplo da documentação, com mais tempo parado para dar para ler
        ? animate(chars, {
            y: [
              { to: ["100%", "0%"] },
              { to: "-100%", delay: 2500, ease: "in(3)" },
            ],
            duration: 750,
            ease: "out(3)",
            delay: stagger(50),
            loop: true,
            loopDelay: 300,
          })
        // Só a entrada, uma vez
        : animate(chars, {
            y: ["100%", "0%"],
            duration: 750,
            ease: "out(3)",
            delay: stagger(item.step ?? 35, { start: item.start ?? 0 }),
          }));

      splits.push(split);
    }
  }

  // Toca quando a tela de login aparece; para quando ela some (login feito)
  let visible = false;
  const sync = () => {
    const now = !auth.classList.contains("hidden");
    if (now === visible) return;
    visible = now;
    if (now) play();
    else stop();
  };

  new MutationObserver(sync).observe(auth, { attributes: true, attributeFilter: ["class"] });
  reduceMotion.addEventListener?.("change", () => { if (visible) play(); });
  sync();
})();
