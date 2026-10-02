/* =========================================================
   Esquilook — emojis da tela de login
   - Os emojis saem de trás do cartão e seguem até as bordas da tela, em
     direções, tamanhos e atrasos sorteados, sem parar (Anime.js: partículas
     com utils.random em loop + engine.speed para uma velocidade média).
   - A cada 6 s sai uma interrogação com uma imagem surpresa da pasta
     "imagens sortidas". Ao clicar, a imagem abre com efeito especial;
     depois é só fechar para continuar o login.
   ========================================================= */

(() => {
  const auth = document.getElementById("auth");
  const back = document.getElementById("rainBack");
  const modal = document.getElementById("surprise");
  const lib = window.anime;
  if (!auth || !back || !modal) return;

  const img = document.getElementById("surpriseImg");
  const burst = document.getElementById("surpriseBurst");
  const closeBtn = document.getElementById("surpriseClose");

  const EMOJIS = ["🌰", "🥜", "😈", "🔥", "🐿️", "🔵", "🎰", "🎲"];
  const CONFETTI = [...EMOJIS, "✨", "🎉", "⭐"];

  // Imagens surpresa. Para adicionar outra: coloque o arquivo na pasta e inclua o nome
  // aqui, exatamente como está no arquivo (o servidor diferencia maiúsculas de minúsculas).
  const IMAGES = [
    "sortida_1.jpeg", "sortida_2.jpg", "sortida_3.PNG", "sortida_4.jpg",
    "sortida_5.PNG", "sortida_6.jpg", "sortida_7.jpeg",
  ].map((name) => "imagens%20sortidas/" + encodeURIComponent(name));

  const MYSTERY_EVERY = 6000; // ms entre uma interrogação e outra
  const SPEED = 0.7;          // engine.speed na tela de login: velocidade média (1 = normal)
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  // Sorteio sem repetição: só repete uma imagem depois que todas já saíram
  let bag = [];
  function nextImage() {
    if (!bag.length) {
      bag = [...IMAGES];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    return bag.pop();
  }

  // Rota sorteada: nasce num ponto atrás do cartão e vai até passar da borda da tela,
  // numa direção qualquer. É recalculada a cada volta, então nenhuma volta repete a outra.
  function route() {
    const card = auth.querySelector(".auth-card").getBoundingClientRect();
    const sx = card.left + card.width / 2 + rand(-0.3, 0.3) * card.width;
    const sy = card.top + card.height / 2 + rand(-0.3, 0.3) * card.height;
    const angle = rand(0, Math.PI * 2);
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const toX = dx > 0 ? (innerWidth - sx) / dx : dx < 0 ? -sx / dx : Infinity;
    const toY = dy > 0 ? (innerHeight - sy) / dy : dy < 0 ? -sy / dy : Infinity;
    const dist = Math.min(toX, toY) + 80; // passa um pouco da borda antes de sumir
    return { sx, sy, ex: sx + dx * dist, ey: sy + dy * dist, spin: rand(-220, 220) };
  }

  // Emojis em loop, como as partículas da documentação do Anime.js
  let anims = [];

  function launchEmoji() {
    const { animate, utils } = lib;
    const el = document.createElement("span");
    el.className = "rain-drop";
    el.setAttribute("aria-hidden", "true");
    el.textContent = pick(EMOJIS);
    el.style.setProperty("--size", rand(22, 40) + "px");
    el._r = route();
    back.append(el);
    const anim = animate(el, {
      x: { from: () => el._r.sx, to: () => el._r.ex },
      y: { from: () => el._r.sy, to: () => el._r.ey },
      rotate: { from: 0, to: () => (reduceMotion.matches ? 0 : el._r.spin) },
      scale: [{ from: 0.2, to: 1 }, { to: 0.85 }],
      opacity: [{ from: 0, to: 1, duration: 600 }, { to: 1 }],
      duration: () => utils.random(4200, 6400),
      delay: utils.random(0, 5000),
      loopDelay: utils.random(0, 900),
      ease: "out(1.4)",
      loop: true,
      // A cada volta: emoji, rota e tempo novos
      onLoop: (self) => {
        el._r = route();
        el.textContent = pick(EMOJIS);
        self.refresh();
      },
    });
    anims.push(anim);
  }

  // Interrogação: também sai de trás do cartão, mas devagar, para dar tempo de clicar
  function launchMystery() {
    if (isOpen || back.querySelectorAll(".rain-mystery").length >= 2) return;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "rain-drop rain-mystery";
    el.setAttribute("aria-label", "Abrir imagem surpresa");
    el.innerHTML = "<span>?</span>";
    el.dataset.img = nextImage();
    new Image().src = el.dataset.img; // pré-carrega para abrir na hora
    const r = route();
    back.append(el);
    const anim = lib.animate(el, {
      x: [r.sx, r.ex],
      y: [r.sy, r.ey],
      scale: [{ from: 0, to: 1 }, { to: 1 }],
      duration: lib.utils.random(9000, 11000),
      ease: "out(1.2)",
      onComplete: () => el.remove(),
    });
    // Para no lugar com o mouse em cima (ou com foco), para dar tempo de clicar
    el.addEventListener("mouseenter", () => anim.pause());
    el.addEventListener("mouseleave", () => anim.play());
    el.addEventListener("focus", () => anim.pause());
    el.addEventListener("blur", () => anim.play());
    el.addEventListener("click", () => { anim.pause(); openSurprise(el); });
    anims.push(anim);
  }

  /* ---------- Revelação ---------- */
  let isOpen = false;
  let closeTimer = 0;

  function confetti() {
    burst.replaceChildren();
    const n = reduceMotion.matches ? 0 : 28;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      const angle = (i / n) * Math.PI * 2 + rand(-0.2, 0.2);
      const dist = rand(140, Math.max(innerWidth, innerHeight) * 0.55);
      s.textContent = pick(CONFETTI);
      s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      s.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      s.style.setProperty("--r", rand(-540, 540) + "deg");
      s.style.setProperty("--s", rand(20, 40) + "px");
      s.style.setProperty("--d", rand(0.15, 0.4) + "s");
      burst.append(s);
    }
  }

  function openSurprise(btn) {
    // A imagem "voa" a partir de onde a interrogação estava
    const r = btn.getBoundingClientRect();
    modal.style.setProperty("--from-x", r.left + r.width / 2 - innerWidth / 2 + "px");
    modal.style.setProperty("--from-y", r.top + r.height / 2 - innerHeight / 2 + "px");
    img.src = btn.dataset.img;
    btn.remove();

    clearTimeout(closeTimer);
    modal.classList.remove("closing");
    confetti();
    modal.classList.remove("hidden"); // sair do display:none reinicia as animações do CSS
    document.body.classList.add("modal-open");
    isOpen = true;
    closeBtn.focus({ preventScroll: true });
  }

  function closeSurprise() {
    if (!isOpen) return;
    isOpen = false;
    document.body.classList.remove("modal-open");
    modal.classList.add("closing");
    closeTimer = setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("closing");
      burst.replaceChildren();
      img.removeAttribute("src");
    }, 250);
  }

  closeBtn.addEventListener("click", closeSurprise);
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".surprise-card, .surprise-close")) closeSurprise();
  });
  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") closeSurprise();
    else if (e.key === "Tab") { e.preventDefault(); closeBtn.focus(); } // o foco não sai da surpresa
  });

  /* ---------- Liga/desliga ---------- */
  let running = false;
  let mysteryTimer = 0;

  function start() {
    if (running || !lib?.animate || !lib?.utils?.random) return;
    running = true;
    // Velocidade média para todas as animações enquanto o login está na tela
    if (lib.engine) lib.engine.speed = SPEED;
    const count = reduceMotion.matches ? 8 : innerWidth < 560 ? 18 : 28;
    for (let i = 0; i < count; i++) launchEmoji();
    mysteryTimer = setInterval(launchMystery, MYSTERY_EVERY);
  }

  function stop() {
    if (!running) return;
    running = false;
    clearInterval(mysteryTimer);
    anims.forEach((a) => a.pause());
    anims = [];
    back.replaceChildren();
    if (lib?.engine) lib.engine.speed = 1; // o resto do site volta à velocidade normal
  }

  // Roda só com a tela de login visível e a aba em primeiro plano
  const sync = () => {
    const visible = !auth.classList.contains("hidden");
    if (visible && !document.hidden) start();
    else stop();
    if (!visible) closeSurprise();
  };

  new MutationObserver(sync).observe(auth, { attributes: true, attributeFilter: ["class"] });
  document.addEventListener("visibilitychange", sync);
  sync();
})();
