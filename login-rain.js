/* =========================================================
   Esquilook — chuva de emojis da tela de login
   - Emojis caem em cascata, em rajadas intermitentes (atrás do cartão).
   - A cada 6 s cai uma interrogação com uma imagem surpresa da pasta
     "imagens sortidas". Ao clicar, a imagem abre com efeito especial;
     depois é só fechar para continuar o login.
   ========================================================= */

(() => {
  const auth = document.getElementById("auth");
  const back = document.getElementById("rainBack");
  const front = document.getElementById("rainFront");
  const modal = document.getElementById("surprise");
  if (!auth || !back || !front || !modal) return;

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
  const MAX_DROPS = 45;       // limite de emojis na tela ao mesmo tempo
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

  // Cada gota se remove sozinha quando termina de cair
  function fall(el, layer, { x, size, dur, sway, spin }) {
    el.style.setProperty("--x", x + "%");
    el.style.setProperty("--size", size + "px");
    el.style.setProperty("--dur", dur + "s");
    el.style.setProperty("--sway", sway + "px");
    el.style.setProperty("--spin", spin + "deg");
    el.addEventListener("animationend", (e) => {
      if (e.target === el && e.animationName.startsWith("rain-fall")) el.remove();
    });
    layer.append(el);
  }

  function dropEmoji(x) {
    if (back.childElementCount >= MAX_DROPS) return;
    const el = document.createElement("span");
    el.className = "rain-drop";
    el.textContent = pick(EMOJIS);
    fall(el, back, { x, size: rand(22, 42), dur: rand(4.5, 8), sway: rand(-60, 60), spin: rand(-360, 360) });
  }

  // Rajada em cascata: emojis em sequência varrendo a tela para um lado, depois uma pausa
  let burstTimer = 0;
  function cascade() {
    const count = reduceMotion.matches ? 3 : Math.round(rand(5, 10));
    const dir = Math.random() < 0.5 ? 1 : -1;
    let x = rand(0, 95);
    let delay = 0;
    for (let i = 0; i < count; i++) {
      const at = x;
      setTimeout(() => { if (running) dropEmoji(at); }, delay);
      x = (x + dir * rand(6, 12) + 100) % 96;
      delay += rand(90, 200);
    }
    burstTimer = setTimeout(cascade, delay + rand(500, 1500) * (reduceMotion.matches ? 2 : 1));
  }

  function dropMystery() {
    if (isOpen || front.childElementCount >= 3) return;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "rain-drop rain-mystery";
    el.setAttribute("aria-label", "Abrir imagem surpresa");
    el.innerHTML = "<span>?</span>";
    el.dataset.img = nextImage();
    new Image().src = el.dataset.img; // pré-carrega para abrir na hora
    el.addEventListener("click", () => openSurprise(el));
    fall(el, front, { x: rand(6, 84), size: 32, dur: rand(8, 10), sway: rand(-40, 40), spin: 0 });
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
    if (running) return;
    running = true;
    cascade();
    mysteryTimer = setInterval(dropMystery, MYSTERY_EVERY);
  }

  function stop() {
    running = false;
    clearTimeout(burstTimer);
    clearInterval(mysteryTimer);
  }

  // Roda só com a tela de login visível e a aba em primeiro plano
  const sync = () => {
    const visible = !auth.classList.contains("hidden");
    if (visible && !document.hidden) start();
    else stop();
    if (!visible) {
      back.replaceChildren();
      front.replaceChildren();
      closeSurprise();
    }
  };

  new MutationObserver(sync).observe(auth, { attributes: true, attributeFilter: ["class"] });
  document.addEventListener("visibilitychange", sync);
  sync();
})();
