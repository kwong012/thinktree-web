/* =========================================================
   thinkTREE web — i18n, copy buttons, interactive trace canvas
   ========================================================= */
(() => {
  'use strict';

  const REPO_URL = 'https://github.com'; // TODO: replace with your real repository URL

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  document.querySelectorAll('[data-github]').forEach((a) => { a.href = REPO_URL; });

  /* ---------------- i18n ---------------- */
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
  let lang = localStorage.getItem('tt-web-lang') || 'zh';
  if (!I18N[lang]) lang = 'zh';

  /* ---------------- trace demo data ---------------- */
  const KINDS = {
    send: { color: '#6871ff', zh: '发送', en: 'SEND' },
    context: { color: '#9a9a9a', zh: '上下文', en: 'CONTEXT' },
    model: { color: '#ca30c7', zh: '模型', en: 'MODEL' },
    reason: { color: '#ff77ff', zh: '思考', en: 'THINKING' },
    tool: { color: '#c7c400', zh: '工具', en: 'TOOL' },
    answer: { color: '#5ffa68', zh: '回答', en: 'ANSWER' },
  };
  const KIND_ORDER = ['send', 'context', 'model', 'reason', 'tool', 'answer'];

  const WORLD = { w: 1560, h: 596 };
  const FRAMES = [
    { id: 1, x: 24, y: 24, w: 744, h: 548, zh: 'TURN 01 · 重构会话解析层', en: 'TURN 01 · Refactor session parser' },
    { id: 2, x: 800, y: 24, w: 736, h: 430, zh: 'TURN 02 · 为什么丢失工具输出？', en: 'TURN 02 · Why is tool output missing?' },
  ];

  const NODES = [
    {
      id: 't1-send', turn: 1, kind: 'send', x: 48, y: 72, w: 200, h: 120,
      zh: { title: '重构会话解析层', body: '把 opencode 的 session 解析拆成独立适配层，统一事件模型。', short: '发送 / 重构解析层' },
      en: { title: 'Refactor session parser', body: 'Split opencode session parsing into a dedicated adapter and unify the event model.', short: 'Send / refactor parser' },
      chips: ['USER', '12.4k tok'], state: 'ok', dur: '4.2s', tok: '12.4k',
    },
    {
      id: 't1-context', turn: 1, kind: 'context', x: 48, y: 222, w: 200, h: 104,
      zh: { title: '上下文注入', body: '系统提示 + 项目规范 + 最近 6 轮对话；缓存命中 68%。', short: '上下文 / 缓存 68%' },
      en: { title: 'Context injection', body: 'System prompt, project rules, and the last 6 turns; 68% cache hit.', short: 'Context / cache 68%' },
      chips: ['CACHE 68%', '6 turns'], state: 'cached', dur: '1.1s', tok: '8.6k',
    },
    {
      id: 't1-model', turn: 1, kind: 'model', x: 300, y: 72, w: 216, h: 126,
      zh: { title: '模型调用', body: 'opencode / claude-sonnet-4.5 · reasoning medium · stream', short: '模型 / claude-sonnet' },
      en: { title: 'Model call', body: 'opencode / claude-sonnet-4.5 · reasoning medium · stream', short: 'Model / claude-sonnet' },
      chips: ['2.4k in', '486 out'], state: 'ok', dur: '12.8s', tok: '2.4k → 486',
    },
    {
      id: 't1-reason', turn: 1, kind: 'reason', x: 300, y: 228, w: 216, h: 104,
      zh: { title: '设计事件模型', body: '用 turn → event 两层结构；按 seq 排序，保留原始 JSON 作为 raw。', short: '思考 / 设计事件模型' },
      en: { title: 'Design the event model', body: 'Use a two-level turn → event structure, sort by seq, and keep raw JSON.', short: 'Thinking / event model' },
      chips: ['THINKING'], state: 'thinking', dur: '3.1s', tok: '1.2k',
    },
    {
      id: 't1-read', turn: 1, kind: 'tool', x: 564, y: 72, w: 180, h: 94,
      zh: { title: '读取 session_v2 表', body: 'sqlite · session_message\n→ 读取 2,184 行消息', short: '工具 / 读取 session_v2' },
      en: { title: 'Read session_v2', body: 'sqlite · session_message\n→ 2,184 message rows', short: 'Tool / read session_v2' },
      chips: ['READ'], state: 'ok', dur: '38ms', tok: '—',
    },
    {
      id: 't1-edit', turn: 1, kind: 'tool', x: 564, y: 194, w: 180, h: 94,
      zh: { title: '修改 trace.js', body: 'src/schema/trace.js\n+ 86 − 24', short: '工具 / 修改 trace.js' },
      en: { title: 'Edit trace.js', body: 'src/schema/trace.js\n+ 86 − 24', short: 'Tool / edit trace.js' },
      chips: ['EDIT'], state: 'ok', dur: '120ms', tok: '—',
    },
    {
      id: 't1-answer', turn: 1, kind: 'answer', x: 564, y: 318, w: 180, h: 112,
      zh: { title: '解析层重构完成', body: '统一事件模型已落地，legacy 与 v2 共用同一条归一化管线。', short: '回答 / 解析层完成' },
      en: { title: 'Parser refactor complete', body: 'The unified event model is in place; legacy and v2 share one normalization pipeline.', short: 'Answer / parser complete' },
      chips: ['DONE'], state: 'ok', dur: '0.4s', tok: '487',
    },
    {
      id: 't2-send', turn: 2, kind: 'send', x: 824, y: 72, w: 200, h: 120,
      zh: { title: '为什么丢失工具输出？', body: '第二轮回答里没有出现 tool-result，但日志里明明有。', short: '发送 / 工具输出丢失' },
      en: { title: 'Why is tool output missing?', body: 'The second answer has no tool-result, yet the log clearly contains one.', short: 'Send / missing tool output' },
      chips: ['USER', '3.1k tok'], state: 'ok', dur: '2.8s', tok: '3.1k',
    },
    {
      id: 't2-context', turn: 2, kind: 'context', x: 824, y: 222, w: 200, h: 104,
      zh: { title: '上下文检查', body: '命中缓存；跨轮引用 t1 的 answer 与 tool 节点。', short: '上下文 / 跨轮引用' },
      en: { title: 'Context check', body: 'Cache hit; cross-turn references to the answer and tool nodes from turn 1.', short: 'Context / cross-turn' },
      chips: ['CACHE HIT', 'CROSS-TURN'], state: 'cached', dur: '0.2s', tok: '1.8k',
    },
    {
      id: 't2-model', turn: 2, kind: 'model', x: 1076, y: 72, w: 212, h: 126,
      zh: { title: '模型调用', body: 'opencode / gpt-5 · reasoning high', short: '模型 / gpt-5' },
      en: { title: 'Model call', body: 'opencode / gpt-5 · reasoning high', short: 'Model / gpt-5' },
      chips: ['1.8k in', '312 out'], state: 'ok', dur: '9.4s', tok: '1.8k → 312',
    },
    {
      id: 't2-reason', turn: 2, kind: 'reason', x: 1076, y: 228, w: 212, h: 104,
      zh: { title: '对比 legacy 结构', body: 'tool-result 在 legacy 中挂在 part 下，新解析器漏了 type 映射。', short: '思考 / 对比 legacy' },
      en: { title: 'Compare the legacy structure', body: 'In legacy, tool-result lives under part; the new parser missed the type mapping.', short: 'Thinking / compare legacy' },
      chips: ['THINKING'], state: 'thinking', dur: '2.2s', tok: '940',
    },
    {
      id: 't2-grep', turn: 2, kind: 'tool', x: 1336, y: 72, w: 180, h: 94,
      zh: { title: '检索 part 表', body: "grep 'tool-result'\n→ 3 处匹配", short: '工具 / 检索 part 表' },
      en: { title: 'Search the part table', body: "grep 'tool-result'\n→ 3 matches", short: 'Tool / search part' },
      chips: ['TOOL'], state: 'ok', dur: '12ms', tok: '—',
    },
    {
      id: 't2-answer', turn: 2, kind: 'answer', x: 1336, y: 194, w: 180, h: 112,
      zh: { title: '已定位并修复', body: '补上 part.type → event.type 映射，回归测试通过。', short: '回答 / 已定位修复' },
      en: { title: 'Found and fixed', body: 'Added the part.type → event.type mapping; regression tests pass.', short: 'Answer / fixed' },
      chips: ['FIXED'], state: 'ok', dur: '0.3s', tok: '312',
    },
  ];
  const NODE = new Map(NODES.map((n) => [n.id, n]));

  const EDGES = [
    ['t1-send', 't1-context', 'flow'],
    ['t1-context', 't1-model', 'flow'],
    ['t1-model', 't1-reason', 'flow'],
    ['t1-model', 't1-read', 'flow'],
    ['t1-read', 't1-edit', 'flow'],
    ['t1-edit', 't1-answer', 'flow'],
    ['t1-reason', 't1-answer', 'flow'],
    ['t1-answer', 't2-send', 'thread'],
    ['t1-context', 't2-context', 'context'],
    ['t2-send', 't2-context', 'flow'],
    ['t2-context', 't2-model', 'flow'],
    ['t2-model', 't2-reason', 'flow'],
    ['t2-model', 't2-grep', 'flow'],
    ['t2-grep', 't2-answer', 'flow'],
    ['t2-reason', 't2-answer', 'flow'],
  ];

  const TURNS = [
    { id: 1, zh: '重构会话解析层', en: 'Refactor session parser', nodes: ['t1-send', 't1-context', 't1-model', 't1-reason', 't1-read', 't1-edit', 't1-answer'] },
    { id: 2, zh: '为什么丢失工具输出？', en: 'Why is tool output missing?', nodes: ['t2-send', 't2-context', 't2-model', 't2-reason', 't2-grep', 't2-answer'] },
  ];

  const DEMO_LABELS = {
    zh: { state: '状态', duration: '耗时', tokens: 'token', turn: '轮次' },
    en: { state: 'STATE', duration: 'DURATION', tokens: 'TOKENS', turn: 'TURN' },
  };

  const SANS = '"IBM Plex Sans Condensed", "Segoe UI", "Microsoft YaHei", sans-serif';
  const MONO = '"IBM Plex Mono", ui-monospace, Consolas, monospace';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- elements ---------------- */
  const stage = $('#traceStage');
  const canvas = $('#traceCanvas');
  const ctx = canvas.getContext('2d');
  const mini = $('#miniCanvas');
  const mctx = mini.getContext('2d');
  const detail = $('#nodeDetail');
  const treeBody = $('#treeBody');
  const legend = $('#legend');
  const lodPill = $('#lodPill');

  let W = 0;
  let H = 0;
  let DPR = 1;
  let view = { x: 0, y: 0, z: 1 };
  let userMoved = false;
  let selectedId = null;
  let hoverId = null;
  let drag = null;
  let visible = true;
  let rafId = 0;
  let viewAnim = 0;
  const openTurns = new Set([1, 2]);

  function t(key) { return I18N[lang][key] ?? key; }
  function nodeText(n) { return n[lang] || n.zh; }
  function kindLabel(kind) { return KINDS[kind][lang]; }

  /* ---------------- viewport ---------------- */
  function fit() {
    const padX = 34;
    const padY = 34;
    let z = Math.min((W - padX * 2) / WORLD.w, (H - padY * 2) / WORLD.h, 1.15);
    const minZ = W < 560 ? 0.2 : W >= 900 ? 0.5 : 0.62;
    z = Math.max(minZ, z);
    view.z = Math.min(z, 1.15);
    if (z > (W - padX * 2) / WORLD.w + 0.001) {
      // ????????????????????????????
      view.x = 24;
      view.y = (H - WORLD.h * view.z) / 2 + 4;
    } else {
      view.x = (W - WORLD.w * view.z) / 2;
      view.y = (H - WORLD.h * view.z) / 2 + 4;
    }
    userMoved = false;
    updateLod();
    draw();
  }

  function updateLod() {
    const z = view.z;
    lodPill.textContent = z < 0.5 ? 'FAR' : z < 0.85 ? 'MID' : 'NEAR';
  }

  function resize() {
    const r = stage.getBoundingClientRect();
    if (!r.width || !r.height) return;
    W = r.width;
    H = r.height;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const mr = mini.getBoundingClientRect();
    mini.width = Math.max(1, Math.round(mr.width * DPR));
    mini.height = Math.max(1, Math.round(mr.height * DPR));
    mctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    if (!userMoved) fit();
    else { draw(); }
  }

  function nodeRect(n) {
    return { x: n.x * view.z + view.x, y: n.y * view.z + view.y, w: n.w * view.z, h: n.h * view.z };
  }

  function screenToWorld(px, py) {
    return { x: (px - view.x) / view.z, y: (py - view.y) / view.z };
  }

  function hitTest(px, py) {
    for (let i = NODES.length - 1; i >= 0; i -= 1) {
      const r = nodeRect(NODES[i]);
      if (px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h) return NODES[i];
    }
    return null;
  }

  /* ---------------- drawing ---------------- */
  function truncate(text, maxW, font) {
    ctx.font = font;
    if (ctx.measureText(text).width <= maxW) return text;
    let lo = 0;
    let hi = text.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (ctx.measureText(text.slice(0, mid) + '…').width <= maxW) lo = mid;
      else hi = mid - 1;
    }
    return text.slice(0, Math.max(1, lo)) + '…';
  }

  function wrapText(text, maxW, font, maxLines) {
    ctx.font = font;
    const lines = [];
    const paragraphs = String(text).split('\n');
    for (const para of paragraphs) {
      if (lines.length >= maxLines) break;
      let line = '';
      for (const ch of para) {
        const test = line + ch;
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line);
          line = ch;
          if (lines.length >= maxLines) break;
        } else {
          line = test;
        }
      }
      if (lines.length < maxLines && line) lines.push(line);
    }
    if (lines.length === maxLines) {
      const last = lines[maxLines - 1];
      if (ctx.measureText(last).width > maxW - 8 && !last.endsWith('…')) {
        lines[maxLines - 1] = truncate(last + '…', maxW, font);
      }
    }
    return lines;
  }

  function drawGrid() {
    const step = 48 * view.z;
    if (step < 14) return;
    const ox = ((view.x % step) + step) % step;
    const oy = ((view.y % step) + step) % step;
    ctx.fillStyle = '#171717';
    for (let x = ox; x < W; x += step) {
      for (let y = oy; y < H; y += step) {
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  function drawFrame(f) {
    const x = f.x * view.z + view.x;
    const y = f.y * view.z + view.y;
    const w = f.w * view.z;
    const h = f.h * view.z;
    if (x + w < -80 || y + h < -80 || x > W + 80 || y > H + 80) return;

    ctx.save();
    ctx.setLineDash([4, 5]);
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 1;
    ctx.strokeRect(Math.round(x) + .5, Math.round(y) + .5, w, h);
    ctx.restore();

    ctx.font = `600 8.5px ${MONO}`;
    ctx.fillStyle = '#7f7f7f';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const label = view.z < 0.38 ? `TURN 0${f.id}` : f[lang].toUpperCase();
    ctx.fillText(label, x + 2, Math.max(10, y - 7));
  }

  function edgeGeometry(a, b) {
    const A = nodeRect(a);
    const B = nodeRect(b);
    let x1;
    let y1;
    let x2;
    let y2;
    let c1x;
    let c1y;
    let c2x;
    let c2y;

    if (B.x >= A.x + A.w - 4) {
      x1 = A.x + A.w; y1 = A.y + A.h / 2;
      x2 = B.x; y2 = B.y + B.h / 2;
      const dx = Math.max(22, Math.abs(x2 - x1) * 0.45);
      c1x = x1 + dx; c1y = y1; c2x = x2 - dx; c2y = y2;
    } else if (B.y >= A.y + A.h - 4) {
      x1 = A.x + A.w / 2; y1 = A.y + A.h;
      x2 = B.x + B.w / 2; y2 = B.y;
      const dy = Math.max(16, Math.abs(y2 - y1) * 0.5);
      c1x = x1; c1y = y1 + dy; c2x = x2; c2y = y2 - dy;
    } else if (B.x + B.w <= A.x + 4) {
      x1 = A.x; y1 = A.y + A.h / 2;
      x2 = B.x + B.w; y2 = B.y + B.h / 2;
      const dx = Math.max(22, Math.abs(x1 - x2) * 0.45);
      c1x = x1 - dx; c1y = y1; c2x = x2 + dx; c2y = y2;
    } else {
      x1 = A.x + A.w / 2; y1 = A.y;
      x2 = B.x + B.w / 2; y2 = B.y + B.h;
      const dy = Math.max(16, Math.abs(y1 - y2) * 0.5);
      c1x = x1; c1y = y1 - dy; c2x = x2; c2y = y2 + dy;
    }
    return { x1, y1, c1x, c1y, c2x, c2y, x2, y2 };
  }

  function drawEdges(now) {
    for (const [fromId, toId, kind] of EDGES) {
      const a = NODE.get(fromId);
      const b = NODE.get(toId);
      if (!a || !b) continue;
      const g = edgeGeometry(a, b);
      const highlighted = selectedId && (fromId === selectedId || toId === selectedId);
      const dim = selectedId && !highlighted;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(g.x1, g.y1);
      ctx.bezierCurveTo(g.c1x, g.c1y, g.c2x, g.c2y, g.x2, g.y2);
      ctx.lineWidth = highlighted ? 1.4 : 1;
      ctx.strokeStyle = highlighted ? '#ff6e67' : kind === 'context' ? '#00c5c7' : kind === 'thread' ? '#c7c7c7' : '#8a8a8a';
      ctx.globalAlpha = dim ? 0.22 : kind === 'flow' ? 0.72 : 0.85;
      ctx.setLineDash(kind === 'flow' ? [4, 7] : [3, 6]);
      ctx.lineDashOffset = reduceMotion || !visible ? 0 : -((now || 0) / 70) % 11;
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawNode(n, now) {
    const r = nodeRect(n);
    if (r.x + r.w < -40 || r.y + r.h < -40 || r.x > W + 40 || r.y > H + 40) return;
    const color = KINDS[n.kind].color;
    const text = nodeText(n);
    const isSel = selectedId === n.id;
    const isHover = hoverId === n.id;
    const z = view.z;

    if (z < 0.5) {
      ctx.fillStyle = color;
      ctx.fillRect(r.x, r.y, r.w, r.h);
      if (z >= 0.3) {
        ctx.fillStyle = 'rgba(0,0,0,.55)';
        ctx.font = `700 6.5px ${MONO}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(kindLabel(n.kind), r.x + 6, r.y + 12);
        ctx.fillStyle = '#0a0b0d';
        ctx.font = `600 9px ${SANS}`;
        ctx.fillText(truncate(text.title, Math.max(10, r.w - 12), `600 9px ${SANS}`), r.x + 6, r.y + Math.min(r.h - 6, 27));
      }
      if (isSel) {
        ctx.strokeStyle = '#ff6e67';
        ctx.lineWidth = 1;
        ctx.strokeRect(r.x + .5, r.y + .5, r.w - 1, r.h - 1);
      }
      return;
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.clip();

    ctx.fillStyle = isHover ? '#161616' : '#0d0d0d';
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.globalAlpha = 0.065;
    ctx.fillStyle = color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fillRect(r.x, r.y, 3, r.h);

    const fs = Math.min(1.55, Math.max(1, z));
    const pad = 8 * fs;
    const left = r.x + pad + 2;
    const maxW = r.w - pad * 2 - 2;
    const showBody = r.h > 40 * fs;
    const showChips = z >= 0.82 && r.h > 76 * fs;
    const showFooter = z >= 0.7 && r.h > 60 * fs;
    const linesAllowed = z < 0.78 ? 1 : z < 1.05 ? 2 : 3;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = `700 ${7 * fs}px ${MONO}`;
    ctx.fillStyle = color;
    ctx.fillText(kindLabel(n.kind), left, r.y + 13 * fs);

    const titleFont = `600 ${11 * fs}px ${SANS}`;
    ctx.font = titleFont;
    ctx.fillStyle = '#f2f2f2';
    ctx.fillText(truncate(text.title, maxW, titleFont), left, r.y + 27 * fs);

    if (showBody) {
      const bodyFont = `${9.5 * fs}px ${SANS}`;
      const bodyTop = r.y + 40 * fs;
      const footerSpace = showFooter ? 12 * fs : 0;
      const chipsSpace = showChips ? 18 * fs : 0;
      const available = r.h - (bodyTop - r.y) - footerSpace - chipsSpace - 4 * fs;
      const lineH = 12 * fs;
      const maxLines = Math.max(0, Math.min(linesAllowed, Math.floor(available / lineH)));
      if (maxLines > 0) {
        const lines = wrapText(text.body, maxW, bodyFont, maxLines);
        ctx.font = bodyFont;
        ctx.fillStyle = '#b9b9b9';
        lines.forEach((line, i) => {
          ctx.fillText(line, left, bodyTop + i * lineH);
        });
      }
    }

    if (showChips) {
      let cx = left;
      const cy = r.y + r.h - (showFooter ? 25 : 17) * fs;
      ctx.font = `${8 * fs}px ${MONO}`;
      for (const chip of n.chips) {
        const cw = ctx.measureText(chip).width + 8 * fs;
        if (cx + cw > r.x + r.w - pad) break;
        ctx.fillStyle = '#232323';
        ctx.fillRect(cx, cy, cw, 13 * fs);
        ctx.fillStyle = '#c7c7c7';
        ctx.fillText(chip, cx + 4 * fs, cy + 9.5 * fs);
        cx += cw + 4 * fs;
      }
    }

    if (showFooter) {
      ctx.font = `${7.5 * fs}px ${MONO}`;
      ctx.fillStyle = '#5f5f5f';
      ctx.textAlign = 'right';
      ctx.fillText(n.dur, r.x + r.w - pad, r.y + r.h - 6 * fs);
      ctx.textAlign = 'left';
    }

    ctx.restore();

    if (isHover && !isSel) {
      ctx.strokeStyle = '#454545';
      ctx.lineWidth = 1;
      ctx.strokeRect(r.x + .5, r.y + .5, r.w - 1, r.h - 1);
    }
    if (isSel) {
      ctx.strokeStyle = '#ff6e67';
      ctx.lineWidth = 1;
      ctx.strokeRect(r.x + .5, r.y + .5, r.w - 1, r.h - 1);
    }
  }

  function draw(now) {
    if (!W || !H) return;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    drawGrid();
    for (const f of FRAMES) drawFrame(f);
    drawEdges(now);
    for (const n of NODES) drawNode(n, now);
    drawMini();
  }

  function drawMini() {
    const mW = mini.clientWidth;
    const mH = mini.clientHeight;
    if (!mW || !mH) return;
    mctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    mctx.clearRect(0, 0, mW, mH);
    mctx.fillStyle = '#0a0a0a';
    mctx.fillRect(0, 0, mW, mH);

    const pad = 6;
    const s = Math.min((mW - pad * 2) / WORLD.w, (mH - pad * 2) / WORLD.h);
    const ox = (mW - WORLD.w * s) / 2;
    const oy = (mH - WORLD.h * s) / 2;

    mctx.strokeStyle = '#2d2d2d';
    mctx.lineWidth = 1;
    for (const f of FRAMES) {
      mctx.strokeRect(ox + f.x * s + .5, oy + f.y * s + .5, f.w * s, f.h * s);
    }
    for (const n of NODES) {
      mctx.fillStyle = KINDS[n.kind].color;
      mctx.globalAlpha = selectedId === n.id ? 1 : 0.68;
      mctx.fillRect(ox + n.x * s, oy + n.y * s, Math.max(1, n.w * s), Math.max(1, n.h * s));
    }
    mctx.globalAlpha = 1;

    const wx = -view.x / view.z;
    const wy = -view.y / view.z;
    const ww = W / view.z;
    const wh = H / view.z;
    mctx.fillStyle = 'rgba(0,197,199,.08)';
    mctx.fillRect(ox + wx * s, oy + wy * s, ww * s, wh * s);
    mctx.strokeStyle = '#00c5c7';
    mctx.lineWidth = 1;
    mctx.strokeRect(ox + wx * s + .5, oy + wy * s + .5, ww * s, wh * s);
  }

  /* ---------------- animation loop ---------------- */
  function loop(now) {
    rafId = 0;
    if (!visible) return;
    draw(now);
    if (!reduceMotion) rafId = requestAnimationFrame(loop);
  }

  function startLoop() {
    if (reduceMotion || rafId) return;
    rafId = requestAnimationFrame(loop);
  }

  /* ---------------- tree ---------------- */
  function buildTree() {
    treeBody.innerHTML = '';
    for (const turn of TURNS) {
      const head = document.createElement('button');
      head.type = 'button';
      head.className = 'tree-row tree-turn' + (openTurns.has(turn.id) ? '' : ' closed');
      head.innerHTML = `<span class="tree-caret"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><path d="M2 1 6 4 2 7" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="tree-tlabel"></span><span class="tree-tcount">${turn.nodes.length}</span>`;
      head.querySelector('.tree-tlabel').textContent = turn[lang];
      head.addEventListener('click', () => {
        if (openTurns.has(turn.id)) openTurns.delete(turn.id);
        else openTurns.add(turn.id);
        buildTree();
      });
      treeBody.appendChild(head);

      const wrap = document.createElement('div');
      wrap.className = 'tree-children';
      wrap.hidden = !openTurns.has(turn.id);
      for (const id of turn.nodes) {
        const n = NODE.get(id);
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'tree-row tree-child' + (selectedId === id ? ' active' : '');
        row.dataset.node = id;
        row.style.setProperty('--c', KINDS[n.kind].color);
        row.innerHTML = `<i></i><span></span>`;
        row.querySelector('span').textContent = nodeText(n).short;
        row.addEventListener('click', () => {
          selectNode(id, true);
        });
        wrap.appendChild(row);
      }
      treeBody.appendChild(wrap);
    }
    syncTreeActive();
  }

  function syncTreeActive() {
    $$('.tree-child', treeBody).forEach((row) => {
      row.classList.toggle('active', row.dataset.node === selectedId);
    });
  }

  /* ---------------- selection / detail ---------------- */
  function selectNode(id, center) {
    selectedId = id;
    const n = NODE.get(id);
    if (!n) return;
    syncTreeActive();
    showDetail(n);
    if (center) centerNode(n);
    else draw();
  }

  function showDetail(n) {
    if (!n) {
      detail.hidden = true;
      detail.innerHTML = '';
      return;
    }
    const text = nodeText(n);
    const color = KINDS[n.kind].color;
    const labels = DEMO_LABELS[lang];
    detail.hidden = false;
    detail.style.setProperty('--c', color);
    detail.innerHTML = `
      <div class="detail-head">
        <span class="detail-kind">${kindLabel(n.kind)}</span>
        <button class="detail-close" type="button" aria-label="Close">×</button>
      </div>
      <p class="detail-title"></p>
      <p class="detail-body"></p>
      <div class="detail-chips"></div>
      <dl class="detail-rows">
        <dt>${labels.state}</dt><dd class="d-state"></dd>
        <dt>${labels.duration}</dt><dd class="d-dur"></dd>
        <dt>${labels.tokens}</dt><dd class="d-tok"></dd>
        <dt>${labels.turn}</dt><dd class="d-turn"></dd>
      </dl>`;
    detail.querySelector('.detail-title').textContent = text.title;
    detail.querySelector('.detail-body').textContent = text.body;
    const chips = detail.querySelector('.detail-chips');
    for (const chip of n.chips) {
      const s = document.createElement('span');
      s.textContent = chip;
      chips.appendChild(s);
    }
    detail.querySelector('.d-state').textContent = n.state;
    detail.querySelector('.d-dur').textContent = n.dur;
    detail.querySelector('.d-tok').textContent = n.tok;
    detail.querySelector('.d-turn').textContent = `TURN 0${n.turn}`;
  }

  function centerNode(n) {
    const z = Math.max(view.z, 0.8);
    const target = {
      z,
      x: W / 2 - (n.x + n.w / 2) * z,
      y: H / 2 - (n.y + n.h / 2) * z,
    };
    animateView(target, 320);
  }

  function animateView(target, duration) {
    cancelAnimationFrame(viewAnim);
    const from = { ...view };
    if (reduceMotion || duration <= 0) {
      view = { ...target };
      updateLod();
      draw();
      return;
    }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      view.x = from.x + (target.x - from.x) * e;
      view.y = from.y + (target.y - from.y) * e;
      view.z = from.z + (target.z - from.z) * e;
      updateLod();
      draw(now);
      if (p < 1) viewAnim = requestAnimationFrame(step);
    };
    viewAnim = requestAnimationFrame(step);
  }

  /* ---------------- canvas interaction ---------------- */
  function localPoint(e) {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  canvas.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    const p = localPoint(e);
    const n = hitTest(p.x, p.y);
    canvas.setPointerCapture(e.pointerId);
    if (n) {
      drag = { type: 'node', id: n.id, sx: p.x, sy: p.y, nx: n.x, ny: n.y, moved: false };
      selectedId = n.id;
      syncTreeActive();
      draw();
    } else {
      drag = { type: 'pan', sx: p.x, sy: p.y, vx: view.x, vy: view.y, moved: false };
    }
    canvas.classList.add('dragging');
  });

  canvas.addEventListener('pointermove', (e) => {
    const p = localPoint(e);
    if (!drag) {
      const n = hitTest(p.x, p.y);
      const next = n ? n.id : null;
      if (next !== hoverId) {
        hoverId = next;
        canvas.classList.toggle('pointing', !!next);
        draw();
      }
      return;
    }
    const dx = p.x - drag.sx;
    const dy = p.y - drag.sy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;

    if (drag.type === 'pan') {
      view.x = drag.vx + dx;
      view.y = drag.vy + dy;
      userMoved = true;
      draw();
    } else {
      const n = NODE.get(drag.id);
      if (n) {
        n.x = drag.nx + dx / view.z;
        n.y = drag.ny + dy / view.z;
        userMoved = true;
        draw();
      }
    }
  });

  function endDrag(e) {
    if (!drag) return;
    const wasClick = !drag.moved;
    const id = drag.type === 'node' ? drag.id : null;
    drag = null;
    canvas.classList.remove('dragging');
    try { canvas.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    if (wasClick) {
      if (id) selectNode(id, false);
      else {
        selectedId = null;
        detail.hidden = true;
        syncTreeActive();
        draw();
      }
    }
  }

  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const p = localPoint(e);
    const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    const factor = Math.exp(-delta * 0.0015);
    const z = Math.min(2.1, Math.max(0.22, view.z * factor));
    const wx = (p.x - view.x) / view.z;
    const wy = (p.y - view.y) / view.z;
    view.z = z;
    view.x = p.x - wx * z;
    view.y = p.y - wy * z;
    userMoved = true;
    updateLod();
    draw();
  }, { passive: false });

  canvas.addEventListener('dblclick', () => {
    fit();
  });

  detail.addEventListener('click', (e) => {
    if (e.target.closest('.detail-close')) {
      selectedId = null;
      detail.hidden = true;
      syncTreeActive();
      draw();
    }
  });

  /* zoom buttons */
  function zoomBy(factor) {
    const z = Math.min(2.1, Math.max(0.22, view.z * factor));
    const cx = W / 2;
    const cy = H / 2;
    const wx = (cx - view.x) / view.z;
    const wy = (cy - view.y) / view.z;
    view.z = z;
    view.x = cx - wx * z;
    view.y = cy - wy * z;
    userMoved = true;
    updateLod();
    draw();
  }
  $('#zoomIn').addEventListener('click', () => zoomBy(1.25));
  $('#zoomOut').addEventListener('click', () => zoomBy(0.8));
  $('#resetBtn').addEventListener('click', () => fit());
  $('#fitBtn').addEventListener('click', () => fit());

  /* ---------------- minimap interaction ---------------- */
  function miniToWorld(e) {
    const r = mini.getBoundingClientRect();
    const pad = 6;
    const s = Math.min((r.width - pad * 2) / WORLD.w, (r.height - pad * 2) / WORLD.h);
    const ox = (r.width - WORLD.w * s) / 2;
    const oy = (r.height - WORLD.h * s) / 2;
    return {
      x: (e.clientX - r.left - ox) / s,
      y: (e.clientY - r.top - oy) / s,
    };
  }

  let miniDrag = false;
  function jumpTo(e) {
    const w = miniToWorld(e);
    view.x = W / 2 - w.x * view.z;
    view.y = H / 2 - w.y * view.z;
    userMoved = true;
    draw();
  }
  mini.addEventListener('pointerdown', (e) => {
    miniDrag = true;
    mini.setPointerCapture(e.pointerId);
    jumpTo(e);
  });
  mini.addEventListener('pointermove', (e) => {
    if (miniDrag) {
      e.preventDefault();
      jumpTo(e);
    }
  });
  mini.addEventListener('pointerup', (e) => {
    miniDrag = false;
    try { mini.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
  });
  mini.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 1.12 : 0.89);
  }, { passive: false });

  /* ---------------- legend / language ---------------- */
  function buildLegend() {
    legend.innerHTML = KIND_ORDER.map((k) => `<span><i style="--c:${KINDS[k].color}"></i>${KINDS[k][lang]}</span>`).join('');
  }

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
    buildLegend();
    buildTree();
    if (selectedId) {
      const n = NODE.get(selectedId);
      if (n) showDetail(n);
    }
    draw();
    if (typeof syncVideo === 'function') syncVideo();
    if (save) localStorage.setItem('tt-web-lang', lang);
  }

  langBtn.addEventListener('click', () => {
    applyLang(lang === 'zh' ? 'en' : 'zh', true);
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

  /* ---------------- visibility / resize ---------------- */
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) startLoop();
    }, { threshold: 0.01 });
    vio.observe(stage);
  }

  new ResizeObserver(() => resize()).observe(stage);
  window.addEventListener('resize', resize);


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

  /* ---------------- init ---------------- */
  applyLang(lang, false);
  requestAnimationFrame(() => {
    resize();
    startLoop();
  });
})();
