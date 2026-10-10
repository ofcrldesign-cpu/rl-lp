document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-wrapper");
  const toggle = document.querySelector(".menu-toggle");
  const sideTrigger = document.querySelector("#mobile-side-trigger");
  const closeBtn = document.querySelector("#sidebar-close-btn");
  const nav = document.querySelector("#nav-links");
  const overlay = document.querySelector("#sidebar-overlay");

  if (!nav) return;

  // Função para abrir o Menu Lateral Mobile
  const openMenu = () => {
    nav.classList.add("open");
    if (overlay) overlay.classList.add("active");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu lateral");
      toggle.textContent = "✕";
    }
    if (sideTrigger) {
      sideTrigger.setAttribute("aria-expanded", "true");
      sideTrigger.setAttribute("aria-label", "Fechar menu lateral");
    }
    document.body.style.overflow = "hidden"; // previne scroll da página de fundo
  };

  // Função para fechar o Menu Lateral Mobile
  const closeMenu = () => {
    nav.classList.remove("open");
    if (overlay) overlay.classList.remove("active");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      toggle.textContent = "☰";
    }
    if (sideTrigger) {
      sideTrigger.setAttribute("aria-expanded", "false");
      sideTrigger.setAttribute("aria-label", "Abrir menu lateral");
    }
    document.body.style.overflow = "";
  };

  // Clique no botão do cabeçalho
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("open");
      if (isOpen) closeMenu();
      else openMenu();
    });
  }

  // Clique no botão flutuante lateral (quando o cabeçalho desaparece)
  if (sideTrigger) {
    sideTrigger.addEventListener("click", () => {
      const isOpen = nav.classList.contains("open");
      if (isOpen) closeMenu();
      else openMenu();
    });
  }

  // Clique no botão de fechar da própria sidebar
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Clique no overlay escuro de fundo
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Fechar ao clicar em qualquer link da navegação
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Fechar com a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
    }
  });

  // Rolagem: esconde cabeçalho ao rolar para baixo e cria/exibe menu lateral flutuante
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Se o menu lateral estiver aberto, não altera o cabeçalho
        if (nav.classList.contains("open")) {
          lastScrollY = currentScrollY;
          ticking = false;
          return;
        }

        // Rola para baixo após passar 80px: o cabeçalho desaparece e o trigger lateral surge
        if (currentScrollY > 80 && currentScrollY > lastScrollY) {
          if (header) header.classList.add("header-hidden");
          if (sideTrigger) sideTrigger.classList.add("visible");
        } else {
          // Rola para cima ou está no topo: o cabeçalho reaparece
          if (header) header.classList.remove("header-hidden");
          if (sideTrigger) sideTrigger.classList.remove("visible");
        }

        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
});
