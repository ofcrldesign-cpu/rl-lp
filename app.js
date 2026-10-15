document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     SELETORES
  ============================================================ */
  const header     = document.querySelector(".header-wrapper");
  const toggle     = document.querySelector(".menu-toggle");
  const sideTrigger= document.querySelector("#mobile-side-trigger");
  const closeBtn   = document.querySelector("#sidebar-close-btn");
  const nav        = document.querySelector("#nav-links");
  const overlay    = document.querySelector("#sidebar-overlay");

  if (!nav) return; // Segurança caso o elemento não exista

  /* ============================================================
     ESTADO DO MENU
  ============================================================ */
  let menuOpen = false;

  /* ============================================================
     FUNÇÕES CORE: ABRIR / FECHAR MENU
  ============================================================ */
  const openMenu = () => {
    if (menuOpen) return; // Evita dupla chamada
    menuOpen = true;

    nav.classList.add("open");
    if (overlay) overlay.classList.add("active");

    // Atualiza atributos de acessibilidade do botão do header
    if (toggle) {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu lateral");
      toggle.textContent = "✕";
    }

    // Atualiza atributos do botão flutuante lateral
    if (sideTrigger) {
      sideTrigger.setAttribute("aria-expanded", "true");
      sideTrigger.setAttribute("aria-label", "Fechar menu lateral");
    }

    // Bloqueia o scroll do body enquanto o menu está aberto
    document.body.style.overflow = "hidden";

    // Move o foco para o botão de fechar dentro do drawer (acessibilidade)
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  };

  const closeMenu = () => {
    if (!menuOpen) return; // Evita dupla chamada
    menuOpen = false;

    nav.classList.remove("open");
    if (overlay) overlay.classList.remove("active");

    // Restaura o botão hambúrguer do header
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      toggle.textContent = "☰";
      // Devolve foco ao botão que abriu o menu (acessibilidade)
      toggle.focus();
    }

    // Restaura o botão flutuante lateral
    if (sideTrigger) {
      sideTrigger.setAttribute("aria-expanded", "false");
      sideTrigger.setAttribute("aria-label", "Abrir menu lateral");
    }

    // Libera o scroll do body
    document.body.style.overflow = "";
  };

  /* ============================================================
     TOGGLE GENÉRICO (usado por ambos os botões)
  ============================================================ */
  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  /* ============================================================
     EVENTOS DOS BOTÕES
  ============================================================ */

  // Botão hambúrguer no cabeçalho
  if (toggle) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Botão flutuante lateral (surge quando o header desaparece ao rolar)
  if (sideTrigger) {
    sideTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Botão de fechar dentro do próprio drawer
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  // Clique no overlay escuro fora do drawer
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Fechar ao clicar em qualquer link de navegação do drawer
  nav.querySelectorAll("a.nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (menuOpen) closeMenu();
    });
  });

  // Fechar com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) {
      closeMenu();
    }
  });

  /* ============================================================
     SWIPE PARA FECHAR (arrastar o drawer para a direita fecha)
  ============================================================ */
  let touchStartX = 0;
  let touchStartY = 0;

  nav.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  nav.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY);
    // Se o swipe for mais horizontal que vertical e para a direita (> 60px)
    if (deltaX > 60 && deltaY < 80 && menuOpen) {
      closeMenu();
    }
  }, { passive: true });

  /* ============================================================
     FECHA O MENU SE A JANELA FOR REDIMENSIONADA PARA DESKTOP
  ============================================================ */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 993 && menuOpen) {
      closeMenu();
    }
  });

  /* ============================================================
     ROLAGEM: ESCONDE CABEÇALHO AO ROLAR PARA BAIXO
     E EXIBE O BOTÃO FLUTUANTE LATERAL
  ============================================================ */
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Se o menu lateral estiver aberto, não altera o estado do cabeçalho
        if (menuOpen) {
          lastScrollY = currentScrollY;
          ticking = false;
          return;
        }

        // Rolou mais de 80px para baixo → esconde header e exibe trigger lateral
        if (currentScrollY > 80 && currentScrollY > lastScrollY) {
          if (header) header.classList.add("header-hidden");
          if (sideTrigger) sideTrigger.classList.add("visible");
        } else {
          // Rolou para cima ou está no topo → reexibe header e oculta trigger lateral
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
