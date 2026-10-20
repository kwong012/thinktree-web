/* =========================================================
   thinkTREE web — i18n, hero video, local demo embed
   ========================================================= */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const REPO_URL = 'https://github.com'; // TODO: replace with your real repository URL
  document.querySelectorAll('[data-github]').forEach((a) => { a.href = REPO_URL; });

  const I18N = {
    zh: {
      'meta.title': 'thinkTREE · 把 agent 的工作轨迹摊开在一张图上',
      'meta.desc': 'thinkTREE 把终端里翻不完的 agent 对话日志，变成一张可缩放、可拖动的轨迹图。轨迹树、无限画布、小地图与 Dashboard，只读本地数据。',
      'top.live': 'LIVE',
      'top.github': 'GitHub ↗',
      'nav.trace': '演示',
      'nav.features': '功能',
      'nav.dashboard': 'Dashboard',
      'nav.start': '快速开始',
      'nav.agents': 'Agents',
      'hero.eyebrow': 'LOCAL-FIRST · AGENT TRACE',
      'hero.title': '把 agent 的工作轨迹，<br>整理成<em>一张可缩放的地图</em>。',
      'hero.lead': 'thinkTREE 读取本地 agent 会话，把提问、上下文、模型调用、工具与回答组织成可缩放的工作轨迹。左侧对话树，右侧画布，右下角小地图。只读本地数据。',
      'hero.cta1': '查看演示',
      'hero.cta2': '安装',
      'hero.cmdLabel': 'QUICK PREVIEW',
      'hero.m1': 'agent 适配',
      'hero.m2': '7.2k 节点 p95',
      'hero.m3': '数据上传',
      'hero.m4': '开源许可',
      'hero.cap': '真实会话录制 · 可暂停回看',
      'hero.videoLabel': '真实会话录制',
      'hero.videoPause': '暂停',
      'hero.videoPlay': '播放',
      'hero.videoFallbackHtml': '浏览器不支持视频播放。<a href="assets/canvas-demo.mp4">下载演示视频</a>',
      'hero.videoAria': 'thinkTREE 真实会话录制',

      'trace.title': '一张图，替代 endless scroll',
      'trace.lead': '拖拽平移、滚轮缩放、点击节点展开。左侧轨迹树与画布同步定位。演示数据为合成数据，不会读取你的任何文件。',
      'trace.data': '数据',
      'trace.session': '重构会话解析层',
      'trace.meta': '2 turns · 13 events · D:\\agent\\thinktree',
      'trace.reset': '复位',
      'trace.hint': '拖拽平移 · 滚轮缩放 · 点击节点展开',
      'demo.checking': '检查中',
      'demo.live': '已连接',
      'demo.offline': '未启动',
      'demo.open': '在新窗口打开 ↗',
      'demo.meta': '22 轮 · 148 个事件',
      'demo.swipe': '横向滚动查看',
      'demo.fallbackTitle': '本地演示尚未启动',
      'demo.fallbackNote': '在项目根目录运行：',
      'demo.fallbackHint': '启动后点击重试。默认地址 http://localhost:9178。',
      'demo.staticNote': '静态站点无法运行 Node 服务；首页视频是同一份虚拟会话的真实录制。',
      'demo.retry': '重新检查',
      'features.title': '为长会话设计的工作台',
      'features.lead': '不是把日志换个皮肤，而是换一种组织信息的方式。每一步都有位置，每一轮都看得见。',
      'f1.title': '轨迹树',
      'f1.desc': '借鉴工业软件的设计树：按轮次展开提问、上下文、模型调用、思考、工具与回答。点击任意步骤，画布自动定位。',
      'f2.title': '无限画布',
      'f2.desc': 'Canvas 2D 批量绘制，缩放、平移、拖动节点都不掉帧。信息按空间位置组织，而不是挤在一条滚动日志里。',
      'f3.title': '小地图',
      'f3.desc': '右下角缩略图显示整个会话与当前视口。单击跳转、拖拽移动视口、滚轮缩放。长会话里也能随时回到某一轮。',
      'f4.title': '语义缩放',
      'f4.desc': '远、中、近三档细节：缩小保留全部节点与主线，放大展开完整内容。任何缩放级别都不会丢掉信息。',
      'f5.title': 'Dashboard',
      'f5.desc': '需要看整体时打开右侧抽屉：token、缓存命中、上下文构成、费用、轮次、热力图与会话明细，按 24h / 7d / 30d 汇总。',
      'f6.title': '本地只读',
      'f6.desc': '只读取本地 agent 的会话存储。不上传内容、不截屏、不 OCR、无遥测。服务默认只建议在可信局域网使用。',
      'dash.title': '需要总量时，看数据',
      'dash.lead': '当前会话看清每一步，全部会话看清成本与缓存。Dashboard 作为右侧抽屉展开，不打断画布。',
      'dash.cap': 'token、缓存命中、上下文构成、费用、轮次与会话热力图，集中在一个面板里。',
      'start.title': '四行命令，开始使用',
      'start.lead': '没有本地 agent 时，先用合成数据预览界面。有 agent 时，直接启动面板跟随当前存活会话。',
      'start.req': '环境要求',
      'start.reqLocal': '数据',
      'start.reqLocalV': '只读本地会话存储',
      'start.note': '默认打开 http://localhost:9178。Windows 也可以双击 thinktree.bat，通过菜单启动、停止或查看日志。',
      'start.s1': '安装前端依赖',
      'start.s1d': '独立在 webapp/ 中安装，后端保持零运行时依赖。',
      'start.s2': '构建并启动',
      'start.s2d': '构建产物由 Node 内置 HTTP 服务托管，默认端口 9178。',
      'start.s3': '没有 agent？用演示数据',
      'start.s3d': 'npm run demo 会生成一份中英混合的多轮合成会话。',
      'start.out': '面板已启动',
      'start.out2': '没有本地 agent 时，用合成多轮数据预览界面。',
      'start.foot': '只读 · 不上传 · MIT',
      'agents.title': '已经适配的 agent',
      'agents.lead': '读取各 agent 的原生本地存储，不做屏幕捕获。opencode TUI 与 pi CLI 是主要验证平台。',
      'agents.name': 'Agent',
      'agents.iface': '接口',
      'agents.status': '状态',
      'agents.store': '数据源',
      'agents.primary': '主要验证',
      'agents.adapted': '已适配，未大量验证',
      'privacy.title': '只读本地，不上传',
      'privacy.lead': '会话内容属于你。thinkTREE 只做一件事：把你本机已有的事件读出来，画成图。',
      'p1.title': '只读本地存储',
      'p1.desc': '读取 opencode、pi、Codex 等 agent 的本地数据库或 JSONL 文件，不修改原始数据。',
      'p2.title': '无网络上传',
      'p2.desc': '会话内容不出本机。服务只在你启动的本地端口上通过 /api 提供数据。',
      'p3.title': '不截屏 / 不 OCR',
      'p3.desc': '直接解析结构化存储，不抓取屏幕像素，不识别终端画面。',
      'p4.title': '无遥测',
      'p4.desc': '没有统计上报、没有账号、没有云端依赖。断开网络仍可运行。',
      'privacy.warn': '服务默认监听 0.0.0.0:9178 且没有登录鉴权。请只在可信局域网使用，或用防火墙限制端口，不要直接暴露到公网。',
      'cta.eyebrow': 'STOP SCROLLING · START SEEING',
      'cta.title': '打开它，停止翻页。',
      'cta.lead': '下一个长会话开始时，让每一步都有位置。',
      'cta.btn1': '在 GitHub 查看',
      'cta.btn2': '查看安装步骤',
      'footer.tagline': '把 agent 的工作轨迹摊开在一张图上。',
      'footer.links': '项目',
      'footer.install': '安装',
      'footer.agents': '支持的 agent',
      'footer.privacy': '隐私',
      'footer.docs': '说明',
      'footer.license': 'MIT License',
      'footer.third': '第三方组件许可见 THIRD_PARTY_NOTICES',
      'footer.status': '状态：早期版本，持续适配中',
      'footer.built': '基于 thinktree-fast 项目构建的静态展示站',
      'footer.local': '只读本地数据',
      copy: '复制',
      copyDone: '已复制',
    },
    en: {
      'meta.title': 'thinkTREE · See every step of your agent',
      'meta.desc': 'thinkTREE turns long agent chat logs into a zoomable, draggable trace map: a turn tree, an infinite canvas, a minimap, and a dashboard. Local data, read-only.',
      'top.live': 'LIVE',
      'top.github': 'GitHub ↗',
      'nav.trace': 'Demo',
      'nav.features': 'Features',
      'nav.dashboard': 'Dashboard',
      'nav.start': 'Quick start',
      'nav.agents': 'Agents',
      'hero.eyebrow': 'LOCAL-FIRST · AGENT TRACE',
      'hero.title': 'An agent\'s working trace,<br>on <em>a zoomable map</em>.',
      'hero.lead': 'thinkTREE reads local agent sessions and organizes prompts, context, model calls, tools, and answers into a zoomable trace. A turn tree on the left, a canvas on the right, a minimap in the corner. Read-only.',
      'hero.cta1': 'View the demo',
      'hero.cta2': 'Install',
      'hero.cmdLabel': 'QUICK PREVIEW',
      'hero.m1': 'agents adapted',
      'hero.m2': '7.2k nodes p95',
      'hero.m3': 'data uploaded',
      'hero.m4': 'open source',
      'hero.cap': 'Real session recording · pause anytime',
      'hero.videoLabel': 'REAL RECORDING',
      'hero.videoPause': 'Pause',
      'hero.videoPlay': 'Play',
      'hero.videoFallbackHtml': 'Your browser cannot play this video. <a href="assets/canvas-demo.mp4">Download the demo</a>',
      'hero.videoAria': 'thinkTREE real session recording',

      'trace.title': 'One map instead of endless scroll',
      'trace.lead': 'Pan, zoom, and click nodes to expand. The trajectory tree stays in sync with the canvas. The demo uses synthetic data and never reads your files.',
      'trace.data': 'Data',
      'trace.session': 'Refactor session parser',
      'trace.meta': '2 turns · 13 events · D:\\agent\\thinktree',
      'trace.reset': 'Reset',
      'trace.hint': 'Drag to pan · scroll to zoom · click a node',
      'demo.checking': 'CHECKING',
      'demo.live': 'LIVE',
      'demo.offline': 'OFFLINE',
      'demo.open': 'Open in new window ↗',
      'demo.meta': '22 turns · 148 events',
      'demo.swipe': 'Scroll sideways',
      'demo.fallbackTitle': 'The local demo is not running',
      'demo.fallbackNote': 'Run this from the project root:',
      'demo.fallbackHint': 'Start it, then check again. Default address: http://localhost:9178.',
      'demo.staticNote': 'Static hosting cannot run the Node server; the hero video is a real recording of the same virtual session.',
      'demo.retry': 'Check again',
      'features.title': 'A workbench built for long sessions',
      'features.lead': 'Not a new skin for logs — a different way to organize the information. Every step has a place; every turn stays visible.',
      'f1.title': 'Trajectory tree',
      'f1.desc': 'Borrowed from the design tree in industrial software: expand each turn into prompt, context, model call, thinking, tools, and answer. Click any step to jump to it.',
      'f2.title': 'Infinite canvas',
      'f2.desc': 'Batch-drawn with Canvas 2D. Pan, zoom, and drag nodes without dropping frames. Information is organized spatially instead of in one long scroll.',
      'f3.title': 'Minimap',
      'f3.desc': 'A thumbnail of the whole session and your current viewport. Click to jump, drag to move, scroll to zoom. Return to any turn in a long session.',
      'f4.title': 'Semantic zoom',
      'f4.desc': 'Three levels of detail: zoomed out keeps every node and the main thread; zoomed in reveals full content. No information is lost at any scale.',
      'f5.title': 'Dashboard',
      'f5.desc': 'Open the right drawer for tokens, cache hits, context composition, cost, turns, heatmaps, and session details across 24h / 7d / 30d.',
      'f6.title': 'Local and read-only',
      'f6.desc': 'Reads the local storage of your agents. No uploads, no screenshots, no OCR, no telemetry. The server is meant for trusted local networks.',
      'dash.title': 'When you need the totals, look at the data',
      'dash.lead': 'One session shows every step; all sessions show cost and cache. The dashboard opens as a right drawer without interrupting the canvas.',
      'dash.cap': 'Tokens, cache hits, context composition, cost, turns, and session heatmaps in one panel.',
      'start.title': 'Four commands to get started',
      'start.lead': 'No local agent yet? Preview the interface with synthetic data. With an agent running, start the panel and follow the live session.',
      'start.req': 'Requirements',
      'start.reqLocal': 'Data',
      'start.reqLocalV': 'Local session storage, read-only',
      'start.note': 'Opens http://localhost:9178 by default. On Windows you can also double-click thinktree.bat to start, stop, or view logs from a menu.',
      'start.s1': 'Install frontend dependencies',
      'start.s1d': 'Installed inside webapp/; the backend keeps zero runtime dependencies.',
      'start.s2': 'Build and start',
      'start.s2d': "The build is served by Node's built-in HTTP server on port 9178.",
      'start.s3': 'No agent? Use demo data',
      'start.s3d': 'npm run demo generates a synthetic multi-turn session in Chinese and English.',
      'start.out': 'panel ready',
      'start.out2': 'Preview the interface with synthetic multi-turn data when no local agent is available.',
      'start.foot': 'Read-only · no uploads · MIT',
      'agents.title': 'Agents already adapted',
      'agents.lead': "Reads each agent's native local storage instead of capturing the screen. opencode TUI and pi CLI are the primary test platforms.",
      'agents.name': 'Agent',
      'agents.iface': 'Interface',
      'agents.status': 'Status',
      'agents.store': 'Source',
      'agents.primary': 'Primary',
      'agents.adapted': 'Adapted, lightly tested',
      'privacy.title': 'Local and read-only',
      'privacy.lead': 'Your session content belongs to you. thinkTREE does one thing: read events already on your machine and draw them.',
      'p1.title': 'Reads local storage',
      'p1.desc': 'Parses the local databases or JSONL files of opencode, pi, Codex, and others without modifying the originals.',
      'p2.title': 'No network uploads',
      'p2.desc': 'Session content never leaves your machine. The server only exposes it over /api on the local port you start.',
      'p3.title': 'No screenshots / OCR',
      'p3.desc': 'Parses structured storage directly — no screen pixels, no terminal OCR.',
      'p4.title': 'No telemetry',
      'p4.desc': 'No analytics, no accounts, no cloud dependency. It keeps working offline.',
      'privacy.warn': 'The server listens on 0.0.0.0:9178 by default with no authentication. Use it only on a trusted LAN, restrict the port with a firewall, and never expose it directly to the public internet.',
      'cta.eyebrow': 'STOP SCROLLING · START SEEING',
      'cta.title': 'Open it. Stop scrolling.',
      'cta.lead': 'The next long session can have every step in its place.',
      'cta.btn1': 'View on GitHub',
      'cta.btn2': 'See installation',
      'footer.tagline': 'Every agent working trace, on one map.',
      'footer.links': 'Project',
      'footer.install': 'Installation',
      'footer.agents': 'Supported agents',
      'footer.privacy': 'Privacy',
      'footer.docs': 'Docs',
      'footer.license': 'MIT License',
      'footer.third': 'Third-party notices in THIRD_PARTY_NOTICES',
      'footer.status': 'Status: early, adapters in progress',
      'footer.built': 'Static showcase site built from the thinktree-fast project',
      'footer.local': 'reads local data only',
      copy: 'Copy',
      copyDone: 'Copied',
    },
  };

  const metaDesc = $('meta[name="description"]');
  const langBtn = $('#langBtn');
  const demoFrameEl = $('#demoFrame');
  const demoBase = (demoFrameEl?.dataset.src || 'http://localhost:9178/');
  const DEMO_URL = demoBase.endsWith('/') ? demoBase : demoBase + '/';

  let lang = localStorage.getItem('tt-web-lang') || 'zh';
  if (!I18N[lang]) lang = 'zh';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function t(key) { return I18N[lang][key] ?? key; }

  /* ---------------- language ---------------- */
  function applyLang(next, save) {
    lang = I18N[next] ? next : 'zh';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.lang = lang;
    document.title = t('meta.title');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.desc'));
    const heroVideoEl = document.getElementById('heroVideo');
    if (heroVideoEl) heroVideoEl.setAttribute('aria-label', t('hero.videoAria'));
    $$('[data-i18n]').forEach((el) => {
      const value = I18N[lang][el.dataset.i18n];
      if (value != null) el.textContent = value;
    });
    $$('[data-i18n-html]').forEach((el) => {
      const value = I18N[lang][el.dataset.i18nHtml];
      if (value != null) el.innerHTML = value;
    });
    langBtn.textContent = lang === 'zh' ? 'EN' : '中';
    langBtn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换为中文');
    if (typeof syncVideo === 'function') syncVideo();
    if (save) localStorage.setItem('tt-web-lang', lang);
  }

  langBtn.addEventListener('click', () => {
    applyLang(lang === 'zh' ? 'en' : 'zh', true);
    if (typeof setDemoStatus === 'function') setDemoStatus(demoState);
  });

  /* ---------------- copy buttons ---------------- */
  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch {
        return false;
      }
    }
  }

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const ok = await copyText(btn.dataset.copy);
    if (!ok) return;
    btn.textContent = t('copyDone');
    btn.classList.add('ok');
    window.setTimeout(() => {
      if (!btn.isConnected) return;
      btn.textContent = t('copy');
      btn.classList.remove('ok');
    }, 1400);
  });

  /* ---------------- reveal on scroll ---------------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------------- hero real recording ---------------- */
  const heroSection = $('.hero');
  const heroVideo = $('#heroVideo');
  const videoToggle = $('#videoToggle');

  function syncVideo() {
    if (!heroSection || !heroVideo || !videoToggle) return;
    const paused = heroVideo.paused;
    heroSection.classList.toggle('paused', paused);
    videoToggle.setAttribute('aria-label', paused ? t('hero.videoPlay') : t('hero.videoPause'));
  }

  if (heroSection && heroVideo && videoToggle) {
    const toggleVideo = () => {
      if (heroVideo.paused) heroVideo.play().catch(() => syncVideo());
      else heroVideo.pause();
    };
    videoToggle.addEventListener('click', toggleVideo);
    heroVideo.addEventListener('play', syncVideo);
    heroVideo.addEventListener('pause', syncVideo);
    if (reduceMotion) heroVideo.pause();
    syncVideo();
  }

  /* ---------------- local demo embed ---------------- */
  const demoEmbed = $('.demo-embed');
  const demoFrame = $('#demoFrame');
  const demoView = $('.demo-view');
  const demoFallback = $('#demoFallback');
  const demoStateEl = $('#demoState');
  const demoStatusEl = $('#demoStatus');
  const demoRetry = $('#demoRetry');
  let demoState = 'checking';

  function setDemoStatus(state) {
    demoState = state;
    if (demoStateEl) demoStateEl.dataset.state = state;
    if (demoStatusEl) demoStatusEl.textContent = t('demo.' + state);
  }

  async function checkDemo() {
    if (!demoFrame || !demoFallback) return;
    setDemoStatus('checking');
    demoFallback.hidden = false;
    demoFrame.hidden = true;

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 2500);
    try {
      await fetch(DEMO_URL.replace(/\/$/, '') + '/api/agents', {
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal,
      });
      if (demoFrame.getAttribute('src') !== DEMO_URL) demoFrame.setAttribute('src', DEMO_URL);
      demoFrame.hidden = false;
      demoFallback.hidden = true;
      setDemoStatus('live');
    } catch {
      demoFrame.hidden = true;
      demoFallback.hidden = false;
      setDemoStatus('offline');
    } finally {
      window.clearTimeout(timer);
    }
  }

  if (demoRetry) demoRetry.addEventListener('click', checkDemo);
  if (demoFrame) {
    demoFrame.addEventListener('load', () => {
      if (demoView && window.innerWidth <= 720) demoView.scrollLeft = 300;
    });
  }

  if (demoEmbed && 'IntersectionObserver' in window) {
    const dio = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        dio.disconnect();
        checkDemo();
      }
    }, { rootMargin: '200px 0px', threshold: 0.01 });
    dio.observe(demoEmbed);
  } else {
    checkDemo();
  }

  /* ---------------- init ---------------- */
  applyLang(lang, false);
  setDemoStatus('checking');
})();
