# thinktree-demo

`thinktree-fast` 演示模式的副本，用于在 `thinktree-web` 的「一张图，替代 endless scroll」一节内嵌真实的虚拟演示。

复制内容：

- `demo/demo-data.js`：22 轮中英混合对话、复杂工具调用、项目 FAQ、代码库讲解，以及 5 个 Dashboard 历史会话。
- `src/sources/demo.js`：把虚拟数据包装成 demo source。
- `src/sources/index.js`：`TT_DEMO=1` 时只加载虚拟 source，不读取真实 agent。
- `scripts/demo.mjs`：设置 `TT_DEMO=1` 并启动服务。
- `src/web/dist/`：已构建的前端。
- `src/` 其余部分：服务端、schema 与 source 适配层，保持与 `thinktree-fast` 一致。

## 运行

要求 Node.js ≥ 22.5。

```bash
npm run demo
```

打开 <http://localhost:9178>。服务默认监听 `0.0.0.0:9178`，没有登录鉴权，请只在可信局域网使用，不要直接暴露到公网。

也可以在 `thinktree-web` 根目录运行 `npm run demo`，效果相同。

## 说明

- 演示模式只读取 `demo/demo-data.js`，不读取本机 agent 会话。
- 不带 `TT_DEMO=1` 运行 `npm start` 时会加载真实 source；本副本主要用于演示。
- 代码、虚拟数据与前端构建产物来自 `thinktree-fast`，遵循 MIT License；见 `LICENSE` 与 `THIRD_PARTY_NOTICES.md`。
- 如需更新，建议从 `thinktree-fast` 重新同步这些文件，而不是单独改写。
