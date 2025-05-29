document.addEventListener('DOMContentLoaded', () => {
  initOverlayMenu();       // ハンバーガー + overlay制御
  initScrollAnimations();  // IntersectionObserverによるフェード
  initTooltipMap();        // テーママップ用ツールチップ
});

// ===== オーバーレイナビゲーション制御 =====
function initOverlayMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const overlay = document.getElementById('overlay');

  if (!toggle || !nav || !overlay) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('nav-open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    toggle.classList.remove('active');
    nav.classList.remove('nav-open');
    overlay.classList.remove('active');
  });
}

// ===== フェードイン表示制御 =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fade-target').forEach(el => {
    observer.observe(el);
  });
}

// ===== テーママップのホバー =====
function initTooltipMap() {
  const map = document.getElementById('themesMap');
  const tooltip = document.getElementById('mapTooltip');

  if (!map || !tooltip) return;

  const hotspots = [
    { x: 30, y: 40, label: "AIと倫理" },
    { x: 120, y: 70, label: "制度設計" },
    { x: 220, y: 90, label: "教育への応用" },
    { x: 330, y: 60, label: "デジタル民主主義" },
    { x: 430, y: 100, label: "共創インターフェース" }
  ];

  map.addEventListener("mousemove", (e) => {
    const rect = map.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    tooltip.style.display = "none";

    for (const spot of hotspots) {
      const dx = offsetX - spot.x;
      const dy = offsetY - spot.y;
      if (Math.sqrt(dx * dx + dy * dy) < 20) {
        tooltip.style.left = `${spot.x + rect.left}px`;
        tooltip.style.top = `${spot.y + rect.top - 40}px`;
        tooltip.textContent = spot.label;
        tooltip.style.display = "block";
        break;
      }
    }
  });

  map.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
}
