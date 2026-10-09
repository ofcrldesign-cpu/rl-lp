# SPEC.md --- RL Design \| NEON COMMAND

> Especificação funcional, visual e técnica da landing page da RL
> Design.\
> **Objetivo:** orientar implementação, refatoração, validação e
> manutenção sem perder os fluxos de conversão descritos no documento de
> origem.

## 1. Visão geral

A página é uma landing page de conversão para a RL Design, com
posicionamento de design estratégico e serviços digitais. A direção
visual atual é **dark/neon**, com fundo escuro, verde neon, detalhes
geométricos, tipografia tecnológica e animações controladas.

### Objetivos de negócio

-   Comunicar valor e posicionamento, evitando apresentar os serviços
    como peças isoladas.
-   Apresentar serviços de design gráfico/identidade visual, social
    media, edição de vídeo, gestão de tráfego e web design.
-   Demonstrar processo, portfólio, diferenciais e evidências de
    confiança.
-   Qualificar interessados por meio de um diagnóstico interativo.
-   Capturar leads e direcioná-los ao WhatsApp com mensagens
    contextualizadas.
-   Medir interações importantes sem expor dados internos de
    qualificação na interface pública.

### Stack documentada

-   React 18
-   Vite
-   Tailwind CSS
-   shadcn/ui (quando já utilizado no projeto)
-   Framer Motion
-   lucide-react
-   React Router
-   Integração de dados com cliente Base44 (`base44`)

> Antes de adicionar dependências, confirme o `package.json` e a
> implementação existente. Não introduza bibliotecas redundantes para
> resolver algo já coberto pela stack.

### Rota principal

-   `/` --- `LandingPage`, conforme a estrutura descrita no documento de
    origem.

## 2. Princípios de implementação

1.  **Preservar os fluxos existentes:** quiz, formulário, WhatsApp,
    newsletter e eventos analíticos devem continuar funcionando.
2.  **Fonte única de verdade:** centralizar links, número e mensagens do
    WhatsApp em `src/lib/wa.js`; centralizar perguntas, pesos e
    classificação do quiz em `src/lib/quizScoring.js`.
3.  **Responsividade real:** validar telas pequenas, médias e grandes,
    incluindo navegação por toque.
4.  **Acessibilidade:** navegação por teclado, foco visível, rótulos
    acessíveis, contraste adequado e respeito a
    `prefers-reduced-motion`.
5.  **Performance:** evitar animações e efeitos caros desnecessários;
    otimizar imagens, carregamento e renderizações.
6.  **Integridade comercial:** não publicar números, depoimentos,
    resultados, prazos, preços ou escassez como fatos sem validação do
    responsável.
7.  **Privacidade:** coletar somente os dados necessários, informar a
    finalidade e registrar consentimento quando aplicável.
8.  **Sem regressões:** toda alteração em conversão deve ser validada
    manualmente e, quando possível, por testes automatizados.

## 3. Estrutura da página

A composição deve manter a ordem a seguir, salvo decisão explícita de
produto:

1.  `HeroSection` --- apresentação principal, slider e CTA.
2.  `PainSection` --- dores que a oferta resolve.
3.  `SolutionSection` --- serviços oferecidos.
4.  `ProcessSection` --- etapas do processo de trabalho.
5.  `BeforeAfterSection` --- comparação visual antes/depois.
6.  `GaleriaInterativa` --- portfólio com filtros.
7.  `SocialProofSection` --- depoimentos e resultados.
8.  `DifferentialSection` --- manifesto e diferenciais.
9.  `QuizDiagnostico` --- diagnóstico interativo e qualificação.
10. `LeadFunnel` --- formulário de contato.
11. `ScarcitySection` --- capacidade de atendimento, apenas se
    verdadeira e atualizada.
12. `FAQSection` --- dúvidas frequentes.
13. `FooterSection` --- navegação, contatos, redes sociais e newsletter.
14. `FloatingWhatsApp` --- acesso persistente ao WhatsApp.
15. `BackToTop` --- retorno ao início.

### Âncoras esperadas

  ID                 Destino
  ------------------ -------------------------
  `#diagnostico`     Quiz de diagnóstico
  `#transformacao`   Comparação antes/depois
  `#processo`        Etapas de trabalho
  `#funil`           Formulário de contato
  `#faq`             Perguntas frequentes

Todas as âncoras usadas por CTAs devem existir exatamente uma vez. Os
links internos devem navegar dentro da página, sem abrir uma nova aba.

## 4. Organização de arquivos

``` text
src/
├── pages/
│   └── LandingPage.jsx
├── components/
│   └── landing/
│       ├── HeroSection.jsx
│       ├── HeroBackground.jsx
│       ├── HeroSlideContent.jsx
│       ├── heroSlides.jsx
│       ├── SectionHeading.jsx
│       ├── NeonButton.jsx
│       ├── PainSection.jsx
│       ├── SolutionSection.jsx
│       ├── ProcessSection.jsx
│       ├── BeforeAfterSection.jsx
│       ├── GaleriaInterativa.jsx
│       ├── SocialProofSection.jsx
│       ├── DifferentialSection.jsx
│       ├── QuizDiagnostico.jsx
│       ├── LeadFunnel.jsx
│       ├── ScarcitySection.jsx
│       ├── FAQSection.jsx
│       ├── FooterSection.jsx
│       ├── FloatingWhatsApp.jsx
│       └── BackToTop.jsx
└── lib/
    ├── wa.js
    ├── quizScoring.js
    └── whatsapp-messages.js
```

A estrutura acima é a estrutura documentada. Antes de mover ou renomear
arquivos, verificar o repositório real, imports, aliases e configurações
do Vite.

## 5. Design system

### Tokens documentados

  Token                      Valor de referência   Aplicação
  -------------------------- --------------------- ---------------------
  `--background`             `0 0% 6.7%`           Fundo principal
  `--foreground`             `0 0% 76%`            Texto padrão
  `--card`                   `0 0% 9%`             Superfícies/cartões
  `--primary` / `--accent`   `126 89% 43%`         Verde neon
  `--border`                 `0 0% 16%`            Bordas
  `neon`                     `#0DD01F`             Acentos e CTAs
  `void`                     `#111111`             Superfície escura
  `tactical`                 `#C1C1C1`             Texto secundário
  `font-heading`             Orbitron              Títulos
  `font-body`                Inter                 Texto corrido

### Linguagem visual

-   Fundo escuro com contraste legível.
-   Verde neon como acento, não como cor de grandes blocos de texto.
-   Grid discreto, brilhos radiais e bordas sutis.
-   Títulos em caixa alta com espaçamento entre letras.
-   Cartões com estados de hover perceptíveis, sem depender
    exclusivamente do hover para revelar conteúdo.
-   Animações de entrada leves e consistentes.
-   Imagens com tratamento visual coerente e sobreposição suficiente
    para preservar a legibilidade.

### Requisitos de acessibilidade visual

-   Confirmar contraste de texto e controles em fundos escuros.
-   Não usar transparências que tornem textos importantes ilegíveis.
-   Fornecer `:focus-visible` evidente em botões, links, filtros,
    controles do slider e elementos do quiz.
-   Em telas touch, todas as ações devem funcionar sem hover.
-   Quando `prefers-reduced-motion: reduce` estiver ativo, reduzir ou
    remover parallax, autoplay e animações não essenciais.

## 6. Especificação dos componentes

### 6.1 `LandingPage.jsx`

-   Importar e renderizar todas as seções na ordem definida na seção 3.
-   Manter os elementos flutuantes no fim da composição.
-   Evitar lógica de negócio dentro do componente de composição.
-   Garantir que não haja overflow horizontal em resoluções comuns.

### 6.2 `HeroSection`, `HeroBackground`, `HeroSlideContent` e `heroSlides`

-   Hero em largura total, com slides e transição de
    profundidade/parallax.
-   Autoplay documentado: 6 segundos.
-   Controles: anterior, próximo e indicadores de slide; cada controle
    deve ter nome acessível.
-   Pausar autoplay durante interação relevante e quando a página
    estiver em segundo plano; oferecer controle de pausa ou garantir
    comportamento acessível equivalente.
-   O conteúdo principal deve ter um único `h1` para a página. Slides
    não devem gerar múltiplos títulos principais simultâneos no DOM
    acessível.
-   O CTA primário leva a `#diagnostico`; o CTA secundário leva a
    `#transformacao`.
-   Logo deve ter texto alternativo apropriado (`RL Design`) e dimensões
    reservadas para evitar layout shift.
-   Imagens de fundo decorativas devem ter `alt=""` e não competir com o
    conteúdo.
-   Não forçar `target="_blank"` em links internos. Em links externos,
    usar `rel="noopener noreferrer"` quando houver `target="_blank"`.
-   Os dados do slider e estatísticas devem ser mantidos em
    `heroSlides.jsx`.
-   Validar a veracidade das métricas exibidas (`200+ projetos`,
    `98% satisfação`, `3x mais engajamento`) antes de publicá-las.

### 6.3 `SectionHeading.jsx`

-   Props documentadas: `tag`, `title`, `subtitle` e `align`.
-   Deve manter hierarquia semântica correta. A tag de seção é opcional.
-   Não usar animação como única forma de revelar informação.
-   Conferir se a hierarquia `h1` → `h2` → `h3` permanece consistente.

### 6.4 `NeonButton.jsx`

-   Variantes: `primary`, `outline`, `ghost`.
-   Tamanhos: `sm`, `default`, `lg`.
-   Deve renderizar um `<a>` quando houver `href` e um `<button>` para
    ações locais.
-   `href` deve definir o destino de forma explícita: âncora interna,
    rota ou link externo. Não aplicar `target="_blank"` automaticamente
    a todos os links.
-   Botões de envio devem declarar `type="submit"`; ações comuns devem
    declarar `type="button"` quando aplicável.
-   Estados de hover, foco, pressionado, desabilitado e carregamento
    devem ser visualmente claros.

### 6.5 `PainSection`

Apresenta problemas que o público pode reconhecer: - Perfil não comunica
rapidamente a oferta. - Conteúdo sem consistência visual. - Vídeos que
perdem atenção. - Anúncios que direcionam para experiências confusas. -
Conversas focadas em preço antes da percepção de valor.

Os cartões devem ser responsivos, com ícones decorativos ocultos de
tecnologias assistivas quando o texto já comunica o significado.

### 6.6 `SolutionSection`

Serviços documentados: 1. Design e identidade visual. 2. Social media
estratégico. 3. Edição de vídeos. 4. Gestão de tráfego. 5. Web design e
sites.

Cada cartão deve apresentar a necessidade atendida, o que será entregue,
o impacto esperado e um CTA contextual para WhatsApp. Evitar prometer
resultados garantidos.

### 6.7 `ProcessSection`

Etapas documentadas: 1. Diagnóstico. 2. Direção estratégica. 3.
Produção. 4. Publicação ou ativação. 5. Análise e otimização.

No desktop, a composição pode ser horizontal; no mobile, deve virar uma
sequência vertical legível.

### 6.8 `BeforeAfterSection`

-   Apresentar comparações com controle deslizante acessível por mouse,
    toque e teclado.
-   O controle deve ter semântica de slider, `aria-label`, valor atual e
    limites.
-   Imagens devem manter proporções coerentes e ser dimensionadas sem
    distorção.
-   Usar textos alternativos descritivos que identifiquem o contexto do
    antes/depois.
-   Métricas como `+280% percepção de valor`, `+45% taxa de retenção` e
    `+350% engajamento` só devem ser exibidas se houver fonte
    verificável, contexto e autorização. Caso contrário, remover ou
    substituir por descrição qualitativa.
-   Evitar listeners globais de mouse/toque se Pointer Events e limpeza
    de eventos locais resolverem o caso com menos complexidade.

### 6.9 `GaleriaInterativa`

-   Mostrar portfólio com filtros funcionais: todos, design gráfico e
    edição de vídeo.
-   Cada item deve ter título, categoria e texto alternativo apropriado.
-   Se um item parece reproduzir um vídeo, deve realmente
    abrir/reproduzir mídia; caso contrário, não apresentar um botão/play
    que sugira funcionalidade inexistente.
-   Interações de expansão devem funcionar por teclado e toque.
-   Carregar imagens com dimensões definidas; usar lazy loading fora da
    primeira dobra.
-   Confirmar licenças e pertinência das imagens de terceiros.

### 6.10 `SocialProofSection`

-   Estrutura de depoimento: contexto/problema, trabalho realizado,
    resultado e período.
-   Usar depoimentos reais, autorizados e rastreáveis.
-   Não apresentar nomes, profissões, avaliações de cinco estrelas ou
    resultados fictícios como prova social real.
-   Se o conteúdo atual for apenas demonstrativo, sinalizar como
    placeholder durante desenvolvimento e removê-lo antes de publicar.

### 6.11 `DifferentialSection`

Diferenciais documentados: - Foco em conversão. - Visão estratégica. -
Agilidade. - Atendimento direto. - Estética premium. - Resultado
mensurável.

Manter linguagem objetiva, sem alegações absolutas ou garantias de
performance.

### 6.12 `QuizDiagnostico`

-   Fluxo documentado: introdução → 8 perguntas → captura de dados →
    resultado personalizado → próximo passo.
-   Exibir progresso e permitir voltar às perguntas sem perder
    respostas.
-   Validar dados antes de enviar e apresentar mensagens de erro
    acessíveis.
-   Calcular score de 0 a 100 e exibir ao visitante apenas o resultado
    público.
-   A classificação interna `frio`, `morno` ou `quente`, sinais de
    intenção e etapa do funil não devem ser exibidos ao lead.
-   Capturar nome, WhatsApp, Instagram/site opcional, serviço opcional e
    consentimento quando necessário.
-   Respeitar `prefers-reduced-motion`.
-   Garantir que o CTA para WhatsApp seja acionado diretamente pelo
    gesto do usuário, evitando bloqueadores de pop-up.
-   Tratar falhas de persistência sem afirmar que o lead foi salvo
    quando a operação falhar.
-   Versionar o modelo de pontuação por meio de `SCORE_VERSION`.

### 6.13 `LeadFunnel`

-   Campos documentados: nome, WhatsApp, Instagram/site, serviço e
    objetivo.
-   Nome, WhatsApp válido e serviço são obrigatórios conforme a
    validação atual descrita no código.
-   Desabilitar envios duplicados durante o estado de carregamento.
-   Informar sucesso somente após confirmação da operação
    correspondente.
-   Depois da captura, abrir o WhatsApp com mensagem contextual sem
    bloquear a confirmação caso a abertura seja impedida pelo navegador.
-   Associar a origem do lead ao formulário (`source: formulario`).

### 6.14 `ScarcitySection`

-   O texto atual afirma que são aceitos até três novos projetos por
    ciclo.
-   Publicar esse limite somente se refletir a capacidade real e for
    mantido atualizado.
-   Não usar contagem regressiva ou urgência artificial.

### 6.15 `FAQSection`

-   Respostas devem refletir condições comerciais atuais.
-   Prazos, preços iniciais, escopo e região de atendimento devem ser
    confirmados pelo responsável antes de publicação.
-   Componentes expansíveis devem usar semântica acessível,
    `aria-expanded` e associação entre botão e painel.
-   O CTA de contato deve usar link oficial centralizado em `wa.js`.

### 6.16 `FooterSection`

-   Incluir navegação, contatos, redes sociais e newsletter conforme
    implementado.
-   Validar links e dados de contato.
-   A newsletter deve validar e-mail, tratar duplicidade e falhas, e
    informar claramente o que será enviado.
-   Consentimento e política de privacidade devem estar disponíveis
    quando necessários.
-   Não tratar newsletter como lead comercial sem registrar a origem
    correta.

### 6.17 `FloatingWhatsApp` e `BackToTop`

-   Botão flutuante deve ter nome acessível e não cobrir campos,
    controles ou avisos em telas pequenas.
-   Respeitar áreas seguras de dispositivos móveis.
-   `BackToTop` deve ter rótulo acessível e aparecer somente quando
    útil.
-   Verificar `z-index`, foco, navegação por teclado e comportamento com
    zoom.

## 7. Integrações e modelo de dados

### 7.1 WhatsApp --- `src/lib/wa.js`

O documento de origem registra o número `+55 11 92485-2232`
(`5511924852232`). Confirmar se ainda é o número correto antes da
publicação.

Responsabilidades: - Centralizar número de destino e número formatado
para exibição. - Centralizar mensagens por contexto. - Gerar links
`https://wa.me/` com mensagens codificadas por `encodeURIComponent`. -
Fornecer links para hero, serviços, diagnóstico, newsletter e botão
flutuante. - Validar telefone e mensagem antes de montar o link. -
Evitar números e mensagens duplicados em componentes.

### 7.2 Entidade `Lead`

Campos documentados no projeto:

  -------------------------------------------------------------------------
  Campo                     Tipo                    Finalidade
  ------------------------- ----------------------- -----------------------
  `name`                    string                  Nome do contato

  `email`                   string                  E-mail, quando coletado

  `whatsapp`                string                  Contato e deduplicação

  `instagram`               string                  Instagram ou site

  `service`                 enum                    Serviço de interesse

  `objective`               string                  Dor ou objetivo
                                                    declarado

  `source`                  enum                    `formulario`, `quiz` ou
                                                    `newsletter`

  `score`                   number                  Pontuação do quiz
                                                    (0--100)

  `score_version`           number                  Versão da regra de
                                                    pontuação

  `quiz_answers`            string/JSON             Respostas para uso
                                                    interno

  `utm_source`              string                  Origem da campanha

  `utm_medium`              string                  Meio/canal

  `utm_campaign`            string                  Campanha

  `internal_temperature`    enum                    `frio`, `morno`,
                                                    `quente`

  `funnel_stage_internal`   enum                    `topo`, `meio`, `fundo`

  `qualification_reason`    string                  Justificativa interna

  `intent_level`            number                  Indicador interno
                                                    (0--100)

  `status`                  enum                    `novo`, `em_contato`,
                                                    `negociacao`,
                                                    `convertido`, `perdido`

  `whatsapp_clicked`        boolean                 Se houve encaminhamento
                                                    ao WhatsApp

  `whatsapp_clicked_at`     date-time               Data/hora do clique

  `last_contact_at`         date-time               Último contato

  `next_follow_up_at`       date-time               Próximo acompanhamento

  `consent_at`              date-time               Registro de
                                                    consentimento

  `notes`                   string                  Notas internas
  -------------------------------------------------------------------------

**Regras de dados** - Definir esquema e validação no ponto de
persistência; não confiar apenas na validação do navegador. - Normalizar
WhatsApp para dígitos e formato consistente antes da deduplicação. - Não
guardar dados que não tenham finalidade definida. - Restringir acesso a
respostas do quiz, notas e classificação interna. - Definir política de
retenção, exclusão e atendimento a solicitações do titular. - Registrar
UTMs quando disponíveis, sem falhar se estiverem ausentes.

### 7.3 Vocabulário de serviços

Manter os IDs consistentes em formulários, quiz, persistência, templates
e mensagens:

  ID canônico        Rótulo
  ------------------ ------------------------------------
  `design_grafico`   Design gráfico / identidade visual
  `social_media`     Social media
  `edicao_video`     Edição de vídeo
  `gestao_trafego`   Gestão de tráfego
  `web_design`       Web design e sites

O módulo `whatsapp-messages.js` apresenta atualmente um mapa de rótulos
que inclui `web_design`, mas não todos os IDs de serviços da interface.
Unificar os mapas para evitar exibição de IDs crus ou inconsistências.

## 8. Fluxos de conversão

### 8.1 Formulário

1.  Visitante informa os campos obrigatórios.
2.  Interface valida os dados.
3.  Sistema persiste/atualiza o lead com `source: formulario`.
4.  Sistema registra o evento pertinente.
5.  Interface apresenta confirmação apropriada.
6.  WhatsApp abre com mensagem contextual, quando solicitado/possível.

### 8.2 Quiz

1.  Visitante inicia o diagnóstico.
2.  Responde às oito perguntas.
3.  Informa os dados solicitados e consentimento aplicável.
4.  Sistema calcula score e classificação interna.
5.  Sistema persiste ou atualiza o lead por WhatsApp normalizado.
6.  Sistema apresenta resultado público e próximo passo.
7.  O roteamento ao WhatsApp depende das regras de intenção descritas no
    módulo de pontuação.
8.  Falhas devem permitir nova tentativa ou alternativa clara.

### 8.3 Newsletter

1.  Visitante informa e-mail.
2.  Sistema valida e verifica duplicidade.
3.  Sistema registra inscrição com origem `newsletter`.
4.  Interface confirma a inscrição ou apresenta erro recuperável.

## 9. Motor do quiz --- `src/lib/quizScoring.js`

-   `SCORE_VERSION` documentado: `1`.
-   `QUIZ_QUESTIONS` contém oito perguntas com pesos.
-   `computeScore(answers)` calcula score limitado ao intervalo de 0 a
    100.
-   `classifyTemperature(score, answers)` retorna `temperature`,
    `funnel_stage_internal`, `reason`, `intent_signals` e
    `intent_level`.
-   A classificação é interna; não renderizar `frio`, `morno` ou
    `quente` na experiência pública.

### Regras documentadas

-   Faixa inicial fria: score até 39.
-   Faixa inicial morna: score até 69, quando não estiver na faixa fria.
-   Faixa inicial quente: score acima de 69.
-   Intenção pode elevar um lead a quente a partir de score 55 com pelo
    menos dois sinais fortes.
-   Outra exceção pode elevar para quente a partir de score 45 quando
    urgência é 10 e objetivo é pelo menos 8.
-   Sinais incluem urgência, objetivo de acelerar, oferta definida e
    aquisição estruturada.

### Verificações obrigatórias

-   Testar limites 39/40, 54/55, 69/70 e 44/45.
-   Testar respostas ausentes e valores fora do domínio.
-   Confirmar que a soma dos pesos das oito perguntas equivale a 1.
-   Confirmar que `computeScore` sempre retorna inteiro entre 0 e 100.
-   Documentar qualquer mudança de regra e incrementar `SCORE_VERSION`
    quando houver impacto comparativo relevante.

## 10. Analytics

O documento de origem cita eventos via `base44.analytics.track`:

-   `quiz_start`
-   `quiz_question_answered`
-   `quiz_complete`
-   `lead_saved`
-   `hot_lead_routed`
-   `warm_lead_routed`
-   `cold_lead_saved`
-   `whatsapp_click`
-   `score_viewed`

Requisitos: - Padronizar nomes e payloads dos eventos em um módulo ou
contrato documentado. - Não enviar nome, telefone, e-mail, respostas
livres ou outras informações pessoais em eventos analíticos. - Evitar
disparos duplicados em re-renderizações. - Registrar falhas sem bloquear
a experiência do usuário. - Confirmar a disponibilidade da API de
analytics no ambiente real antes de depender dela.

## 11. SEO, semântica e compartilhamento

-   Definir um `title` específico e uma meta description clara para a RL
    Design.
-   Manter apenas um `h1` principal e hierarquia de headings
    consistente.
-   Usar HTML semântico (`header`, `nav`, `main`, `section`, `footer`)
    onde apropriado.
-   Definir canonical para a URL de produção correta.
-   Configurar robots/indexação de acordo com o ambiente; não indexar
    previews privados.
-   Adicionar Open Graph e metadados de compartilhamento.
-   Usar dados estruturados JSON-LD somente com informações verdadeiras
    e verificadas, adequadas ao tipo de negócio.
-   Garantir que links internos e externos tenham destinos válidos.
-   Textos alternativos devem descrever imagens informativas; imagens
    decorativas usam `alt=""`.

## 12. Performance e qualidade

-   Otimizar imagens e entregar dimensões responsivas adequadas.
-   Usar `loading="lazy"` em imagens fora da primeira dobra e evitar
    lazy loading na imagem LCP principal quando isso prejudicar o
    carregamento.
-   Definir `width`/`height` ou `aspect-ratio` para reduzir CLS.
-   Evitar carregar imagens de todos os slides em alta resolução sem
    necessidade; avaliar pré-carregamento do slide ativo e do próximo.
-   Limitar sombras, blur e animações simultâneas em dispositivos
    modestos.
-   Respeitar `prefers-reduced-motion`.
-   Evitar listeners globais sem necessidade e sempre limpar efeitos.
-   Não recriar timers de autoplay em cada renderização sem motivo;
    revisar dependências de `useEffect`.
-   Verificar console, rede, imports e warnings de React.
-   Meta de qualidade: sem erros críticos de acessibilidade, console ou
    navegação; metas de Core Web Vitals devem ser avaliadas em ambiente
    real.

## 13. Segurança e privacidade

-   Não expor chaves privadas ou segredos em código client-side.
-   Validar e normalizar entradas também no backend/serviço de
    persistência.
-   Tratar falhas de rede e erros de integração sem mostrar dados
    sensíveis.
-   Aplicar controle de acesso a painéis internos e campos de
    qualificação.
-   Implementar consentimento e transparência compatíveis com a LGPD,
    incluindo finalidade, contato e política de privacidade.
-   Não declarar sucesso de gravação antes da confirmação do serviço.
-   Abrir URLs externas com os atributos de segurança adequados.

## 14. Testes e critérios de aceite

### Funcionalidade

-   [ ] A rota `/` abre sem erros.
-   [ ] Todos os componentes renderizam na ordem definida.
-   [ ] Todos os CTAs internos apontam para âncoras existentes.
-   [ ] Slider possui anterior, próximo, indicadores e comportamento de
    pausa adequado.
-   [ ] Filtros da galeria mostram apenas a categoria selecionada.
-   [ ] Comparador antes/depois funciona com mouse, toque e teclado.
-   [ ] Quiz permite avançar, voltar, validar e apresentar resultado.
-   [ ] Pontuação e classificação respeitam os limites documentados.
-   [ ] Formulário salva/atualiza leads corretamente e trata falhas.
-   [ ] Newsletter trata e-mail inválido e duplicidade.
-   [ ] Links de WhatsApp usam o número centralizado e mensagens
    corretas.
-   [ ] Eventos analíticos são enviados uma única vez por ação válida.

### Acessibilidade

-   [ ] Navegação completa por teclado.
-   [ ] Foco visível em todos os controles interativos.
-   [ ] Botões e links têm nomes acessíveis.
-   [ ] Campos têm rótulos, instruções e erros associados.
-   [ ] Contraste legível e hierarquia de headings consistente.
-   [ ] Experiência utilizável sem hover.
-   [ ] Movimento reduzido é respeitado.

### Responsividade e performance

-   [ ] Validado em mobile, tablet e desktop.
-   [ ] Sem overflow horizontal.
-   [ ] Botões flutuantes não cobrem conteúdo.
-   [ ] Imagens não provocam layout shift evitável.
-   [ ] Efeitos visuais continuam utilizáveis em dispositivos modestos.

### Conteúdo e confiança

-   [ ] Número de WhatsApp confirmado.
-   [ ] Estatísticas e métricas verificadas.
-   [ ] Depoimentos reais e autorizados.
-   [ ] Preços, prazos e disponibilidade atualizados.
-   [ ] Imagens licenciadas ou autorizadas.
-   [ ] Política de privacidade e consentimento revisados.

## 15. Problemas identificados no documento de origem

Estes pontos devem ser verificados durante a implementação; não presumir
que todos ainda existam no código atual:

1.  **Links internos podem abrir nova aba:** `NeonButton` aplica
    `target="_blank"` a qualquer `href`, inclusive âncoras como
    `#diagnostico` e `#transformacao`. Aplicar nova aba apenas a links
    externos.
2.  **Timer do Hero:** o efeito de autoplay depende de `index`, criando
    intervalos novamente a cada mudança. Rever para manter timer estável
    e limpar corretamente.
3.  **Autoplay e acessibilidade:** adicionar uma estratégia explícita de
    pausa, incluindo teclado, toque, foco e preferência por movimento
    reduzido.
4.  **Slider antes/depois:** o exemplo usa eventos globais de mouse e
    toque; testar arraste, teclado e limpeza de listeners. Preferir
    Pointer Events ou um controle semântico equivalente.
5.  **Tamanho da imagem recortada:** a imagem de "antes" usa largura
    baseada em `offsetWidth` com fallback fixo. Confirmar alinhamento e
    redimensionamento após mudanças de viewport.
6.  **Prova social e métricas:** nomes, depoimentos, estrelas e
    percentuais aparecem no conteúdo de exemplo. Validar autenticidade e
    autorização antes de publicar.
7.  **Escassez:** "até 3 novos projetos" deve refletir disponibilidade
    real.
8.  **Consistência de serviços:** IDs usados no quiz/formulário e mapas
    de rótulos em mensagens auxiliares não parecem totalmente alinhados.
    Centralizar o catálogo.
9.  **Persistência e confirmação:** conferir se o formulário só informa
    sucesso depois de salvar o lead; tratar falha ao abrir WhatsApp
    separadamente da gravação.
10. **Privacidade analítica:** garantir que eventos não incluam dados
    pessoais ou respostas identificáveis.
11. **Newsletter:** validar se o armazenamento, a deduplicação e o
    consentimento estão implementados de forma consistente.
12. **Código de documentação misturado:** o arquivo original contém
    blocos extensos de código e uma segunda especificação geral no fim.
    Manter esta SPEC como contrato de implementação e mover exemplos de
    código para documentação por componente, evitando duplicidade e
    divergência.

## 16. Plano recomendado de execução

1.  Inspecionar o repositório e confirmar dependências, scripts,
    aliases, integrações e estado atual.
2.  Comparar o código real com esta SPEC e listar diferenças antes de
    refatorar.
3.  Corrigir primeiro erros de navegação, persistência, pontuação e
    links.
4.  Unificar o catálogo de serviços e as mensagens de WhatsApp.
5.  Melhorar acessibilidade dos sliders, quiz, galeria e FAQ.
6.  Otimizar imagens, animações e carregamento.
7.  Validar conteúdo comercial, métricas, depoimentos, preços e escassez
    com o responsável.
8.  Executar lint, testes disponíveis, build de produção e verificações
    manuais.
9.  Entregar resumo das alterações, testes executados e pendências que
    dependem de credenciais ou validação humana.

## 17. Fora do escopo / dependências externas

A SPEC não comprova, por si só, que a integração Base44, a persistência
de leads, o analytics, o envio de newsletter ou os links externos
estejam operacionais. Essas funcionalidades precisam ser verificadas no
repositório e no ambiente de execução. Não simular sucesso quando a
integração não confirmar a operação.

------------------------------------------------------------------------

## Apêndice A --- Referência do documento de origem

O SPEC original descreve os seguintes módulos e responsabilidades:

-   `LandingPage.jsx`: composição e ordenação das seções.
-   `HeroSection.jsx`, `HeroBackground.jsx`, `HeroSlideContent.jsx`,
    `heroSlides.jsx`: slider e conteúdo do hero.
-   `SectionHeading.jsx`, `NeonButton.jsx`: elementos visuais
    reutilizáveis.
-   `PainSection.jsx`, `SolutionSection.jsx`, `ProcessSection.jsx`:
    narrativa, serviços e processo.
-   `BeforeAfterSection.jsx`, `GaleriaInterativa.jsx`,
    `SocialProofSection.jsx`, `DifferentialSection.jsx`: portfólio e
    confiança.
-   `QuizDiagnostico.jsx`, `LeadFunnel.jsx`: qualificação e captura.
-   `ScarcitySection.jsx`, `FAQSection.jsx`, `FooterSection.jsx`:
    conteúdo complementar.
-   `FloatingWhatsApp.jsx`, `BackToTop.jsx`: controles persistentes.
-   `wa.js`: centralização de número, links e mensagens.
-   `quizScoring.js`: perguntas, pesos, score e temperatura interna.
-   `whatsapp-messages.js`: templates auxiliares para agendamento e lead
    convertido.

Esta referência resume a organização funcional; o código-fonte real do
repositório continua sendo a fonte definitiva para imports, assinaturas
e comportamento efetivamente implementado.
