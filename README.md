# thinktree-web

thinkTREE 的展示站：深色扁平风格参考同级目录的 `thinktree-fast`。首页使用 `out-assets/docs/demo-canvas.mp4` 的真实会话录制视频（自动静音循环，可暂停）；「一张图，替代 endless scroll」一节内嵌 `npm run demo` 的真实虚拟演示（22 轮、148 个事件），而不是另写的简化画布。

站点本身是静态页面，无需构建，可直接部署到 GitHub Pages 或其他免费托管。内嵌演示需要在本机运行一个零依赖的 Node 服务（`demo-app/`，从 `thinktree-fast` 原样复制）。

## 本地预览

先启动虚拟演示服务（Node.js ≥ 22.5）：

```bash
npm run demo
# thinkTREE demo: http://localhost:9178
```

再在另一个终端启动静态站点：

```bash
# Python 3
python -m http.server 8080

# 或 Node（无需安装）
npx --yes serve . -l 8080
```

打开 <http://localhost:8080>，滚动到「一张图，替代 endless scroll」，页面会自动检测 9178 并内嵌演示。未启动演示服务时，该区域显示启动命令和「重新检查」。

直接双击 `index.html` 也能查看页面，但内嵌演示仍需要 9178 服务，且建议用 HTTP 服务避免个别浏览器限制。

## 目录

| 文件 | 说明 |
|---|---|
| `index.html` | 页面结构与文案，含 9178 演示的 iframe |
| `styles.css` | 全部样式，tokens 与 thinktree-fast 对齐 |
| `app.js` | 中英切换、复制按钮、首页视频控制、演示服务检测 |
| `assets/` | 首页真实演示视频（直接复制自 `out-assets/docs/demo-canvas.mp4`）、视频封面、Dashboard 截图 |
| `out-assets/` | 原始演示素材来源，保持不动 |
| `demo-app/` | 从 `thinktree-fast` 复制的虚拟演示：`demo/demo-data.js`、`src/sources/demo.js`、`src/sources/index.js`、`scripts/demo.mjs`、`src/web/dist` |
| `package.json` | 根目录入口，`npm run demo` 转发到 `demo-app` |
| `.github/workflows/pages.yml` | GitHub Pages 自动部署（只发布静态文件） |
| `favicon.svg` | 站点图标 |

## 内嵌虚拟演示

`demo-app/` 是 `thinktree-fast` 演示模式的副本，文件内容未改写：

- `demo-app/demo/demo-data.js`：22 轮中英混合对话、工具调用、项目 FAQ 与 5 个 Dashboard 历史会话。
- `demo-app/src/sources/demo.js`：把虚拟数据包装成 demo source。
- `demo-app/src/sources/index.js`：`TT_DEMO=1` 时只加载虚拟 source。
- `demo-app/scripts/demo.mjs`：设置 `TT_DEMO=1` 并启动服务。
- `demo-app/src/web/dist/`：已构建的前端。

运行：

```bash
npm run demo
# http://localhost:9178
```

页面通过 `index.html` 中 `#demoFrame` 的 `data-src` 检测并加载该地址：

```html
<iframe id="demoFrame" data-src="http://localhost:9178/" ...></iframe>
```

启动顺序不限：先开页面也能在演示服务启动后点「重新检查」。静态部署无法运行 Node 服务，此时该区域会显示启动说明，首页视频仍展示同一份虚拟会话。

> 演示代码与虚拟数据来自 `thinktree-fast`，遵循 MIT License；许可证与第三方说明见 `demo-app/LICENSE`、`demo-app/THIRD_PARTY_NOTICES.md`。

## 部署到 GitHub Pages（免费）

1. 在 GitHub 新建仓库，例如 `thinktree-web`。
2. 把本目录推送到 `main` 分支：

   ```bash
   git init
   git add .
   git commit -m "Add thinktree-web landing page"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/thinktree-web.git
   git push -u origin main
   ```

3. 打开仓库的 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**。
4. 等待 `Deploy static site to GitHub Pages` 工作流完成。

访问地址：

```
https://<你的用户名>.github.io/thinktree-web/
```

> 免费账号需要仓库为 **Public**。私有仓库使用 Pages 需要 GitHub Pro。
> 如果仓库名就是 `<你的用户名>.github.io`，地址会变成 `https://<你的用户名>.github.io/`。

GitHub Pages 只发布 `index.html`、`styles.css`、`app.js`、`favicon.svg`、`.nojekyll` 与 `assets/`；`demo-app/` 不会被部署，因此线上页面会显示演示启动说明。

若希望线上也能交互，需要把 `demo-app/` 部署到支持 Node 的平台（Render、Railway、Fly.io 等），然后把 `index.html` 中 `#demoFrame` 的 `data-src` 与「在新窗口打开」的 `href` 改成该服务地址（建议 HTTPS）。跨域 iframe 无需额外配置；页面检测接口只要求该地址提供 `/api/agents`。

### 绑定自己的域名

在仓库 **Settings → Pages → Custom domain** 填入域名，然后按提示配置 DNS：

- 根域名：`A` 记录指向 GitHub Pages 的 IP（见 GitHub 文档）
- 子域名：`CNAME` 记录指向 `<你的用户名>.github.io`

勾选 Enforce HTTPS 后即可使用。

## 其他免费托管

| 平台 | 特点 |
|---|---|
| **Cloudflare Pages** | 免费、带宽不限、全球 CDN；连接仓库或直接拖拽上传 |
| **Netlify** | 拖拽部署，自动 HTTPS，免费额度足够展示站 |
| **Vercel** | 连接仓库自动部署，免费计划 |
| **腾讯云 EdgeOne Pages** | 国内访问通常更稳定，有免费额度 |

这些平台大多支持直接上传本目录，或配置构建命令为空、输出目录为 `.`。

## 部署前检查

- 把 `app.js` 顶部的 `REPO_URL` 替换成实际仓库地址；页头、底部 CTA 与页脚的 GitHub 链接会统一更新。
- 如需调整品牌色、字号或间距，修改 `styles.css` 顶部的 `:root` 变量即可。
- 首页展示视频为 `assets/canvas-demo.mp4`，与 `out-assets/docs/demo-canvas.mp4` 内容一致；如需更换视频，替换该文件并同时更新 `assets/canvas-poster.jpg` 封面。
- 内嵌演示地址在 `index.html` 的 `#demoFrame[data-src]` 与「在新窗口打开」链接中，默认 `http://localhost:9178/`。
- 虚拟会话数据在 `demo-app/demo/demo-data.js`；如需修改演示内容，直接改这份副本，或从 `thinktree-fast` 重新同步。不要单独修改 `demo-app/src` 里的服务端逻辑，以便后续整体升级。

## 说明

页面是展示站；`demo-app/` 是从 `thinktree-fast` 复制的演示子集，包含虚拟数据、source 包装、服务端与已构建前端。产品能力、适配状态与隐私说明均来自 `thinktree-fast` 文档。

页面「快速开始」中的 `npm run web:install` / `npm run build:web` / `npm start` 是 `thinktree-fast` 项目的命令。本目录的 `npm run demo` 会转发到 `demo-app`，启动虚拟演示；本静态站点本身无需构建。
