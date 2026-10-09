# RL Design | One Page Landing Page (Floating UI System)

Landing page de alta conversão e posicionamento de marca para a **RL Design**, focada em serviços digitais e on-line (Design Gráfico, Social Media, Edição de Vídeo, Gestão de Tráfego e Web Design).

Desenvolvida sob o conceito visual **Floating UI / Card Presentation**, simula um painel flutuante sobre um fundo preto absoluto (`#000000`), com bordas discretas, cantos arredondados e sombras suaves que transmitem profundidade e elegância tecnológica.

Construída em **HTML5 e CSS3 puros em arquivos separados, sem frameworks e sem JavaScript**.

---

## ⚡ Estrutura da Landing Page (Navegação One Page)

A ordem das seções na página e no menu de navegação do cabeçalho flutuante:

1. **Início (`#top` / `#hero`):** Hero carrossel 3D Glass com 3 imagens alternando a cada 5 segundos, headline de alto impacto, métricas e CTAs.
2. **Serviços (`#servicos`):** Apresentação dos 5 serviços digitais com CTAs diretos para o WhatsApp.
3. **Sobre Nós (`#sobre`):** Manifesto de posicionamento, cultura de design e 6 diferenciais estratégicos.
4. **Processos (`#processos`):** Metodologia detalhada em 5 etapas e comparativo visual Antes x Depois.
5. **Depoimentos (`#depoimentos`):** Avaliações de clientes, resultados reais e portfólio filtrável por categorias em CSS.
6. **Diagnóstico (`#diagnostico`):** Quiz interativo de 3 etapas construído 100% em CSS com envio de resultado via WhatsApp.
7. **Fale Conosco (`#contato`):** Formulário de captura de leads e aviso de escassez de vagas.
8. **FAQ (`#faq`):** Central de perguntas frequentes em acordeão nativo HTML5.

---

## 🎨 Identidade Visual & Design System

- **Fundo Global:** `#000000` (Preto Absoluto da logo `.docs/logo.png`).
- **Painéis Flutuantes (`floating-panel` & `floating-card`):** Fundo dark translúcido (`rgba(14, 14, 14, 0.92)`), `backdrop-filter: blur(20px)`, bordas discretas (`rgba(255, 255, 255, 0.08)`), cantos arredondados (`border-radius: 24px`) e sombras profundas (`box-shadow: 0 20px 50px rgba(0,0,0,0.85)`).
- **Sem Verde no Fundo:** Verde neon (`#0DD01F`) restrito a acentos de texto, ícones, bordas neon e botões.
- **Controles Flutuantes:** Botão de WhatsApp no canto inferior direito e botão *Voltar ao Topo* empilhado diretamente acima do WhatsApp.

---

## 🚀 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/ofcrldesign-cpu/rl-lp.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador web.

---

## 📂 Estrutura do Repositório

```text
RL lp/
├── index.html        # Estrutura HTML5 One Page
├── styles.css        # Design System Floating UI e estilos globais
├── .gitignore        # Regras do Git
├── .env.example      # Exemplo de configuração de ambiente
├── README.md         # Documentação técnica do projeto
└── .docs/            # Identidade visual, logo e imagens do carrossel
    ├── cores.png
    ├── logo.png
    ├── tipografia.png
    ├── hero_design_grafico.jpg
    ├── hero_web_design.jpg
    └── hero_social_media.jpg
```

---

## 📝 Licença

© 2026 **RL Design**. Todos os direitos reservados.
