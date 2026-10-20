# thinktree-web

thinkTREE 的展示站：深色扁平风格参考同级目录的 `thinktree-fast`。首页使用 `out-assets/docs/demo-canvas.mp4` 的真实会话录制视频（自动静音循环，可暂停）；「一张图，替代 endless scroll」一节内嵌同一套真实虚拟演示（22 轮、148 个事件）。演示已静态化，整个站点无任何后端，可直接部署到 GitHub Pages 或其他静态托管。

## 本地预览

```bash
# Python 3
python -m http.server 8080

# 或 Node（无需安装）
npx --yes serve . -l 8080
```

打开 <http://localhost:8080>，滚动到「一张图，替代 endless scroll」即可查看内嵌演示，无需启动 9178 服务。

直接双击 `index.html` 也能查看大部分页面，但内嵌演示使用 ES module，建议通过 HTTP 服务打开以避免浏览器对 `file://` 模块的限制。

## 目录

| 文件 | 说明 |
|---|---|
| `index.html` | 页面结构与文案，含静态演示的 iframe |
| `styles.css` | 全部样式，tokens 与 thinktree-fast 对齐 |
| `app.js` | 中英切换、复制按钮、首页视频控制 |
| `assets/` | 首页真实演示视频（直接复制自 `out-assets/docs/demo-canvas.mp4`）、视频封面、Dashboard 截图 |
| `out-assets/` | 原始演示素材来源，保持不动 |
| `demo/` | 静态演示：已构建前端、`demo-data.js`、`static-mock.js`，无需服务 |
| `demo-app/` | 从 `thinktree-fast` 复制的原始演示子集，仅作来源与对照 |
| `package.json` | 可选开发入口，`npm run demo` 启动原始 Node 演示 |
| `.github/workflows/pages.yml` | GitHub Pages 自动部署（只发布静态文件） |
| `favicon.svg` | 站点图标 |

## 内嵌虚拟演示

`demo/` 是演示前端的静态构建，页面通过 `<iframe src="demo/">` 直接加载：

- `demo/assets/`：与 `demo-app/src/web/dist/` 相同的已构建前端，保留全部交互与动画。
- `demo/demo-data.js`：22 轮中英混合对话、工具调用、项目 FAQ 与 5 个 Dashboard 历史会话。
- `demo/static-mock.js`：在浏览器内模拟 `/api/agents`、`/api/session/...`、`/api/dashboard/...` 与 `/api/stream` SSE，因此无需 Node 服务。

演示数据、source 包装与 UI 来自 `thinktree-fast`；静态版只替换了数据入口，前端代码与效果保持一致。`demo-app/` 保留原始 Node 版本，可用 `npm run demo` 启动后与静态版对照，但站点本身不依赖它。

> 演示代码与虚拟数据遵循 MIT License；许可证与第三方说明见 `demo-app/LICENSE`、`demo-app/THIRD_PARTY_NOTICES.md`。

## 部署到 GitHub Pages（免费）

1. 在 GitHub 新建仓库，例如 `thinktree-web`。
2. 把本目录推送到 `main` 分支：

   ```bash
   git init
   git add .
   git commit -m "Add thinktree-web landing page"
   git branch -M main
   git remote add origin https://github.com/kwong012/thinktree-web.git
   git push -u origin main
   ```

3. 打开仓库的 **Settings → Pages**，将 **Build and deployment → Source** 设为 **GitHub Actions**。
4. 等待 `Deploy static site to GitHub Pages` 工作流完成。

访问地址：

```
https://kwong012.github.io/thinktree-web/
```

> 免费账号需要仓库为 **Public**。私有仓库使用 Pages 需要 GitHub Pro。
> 当前仓库名不是 `kwong012.github.io`，因此地址是 `https://kwong012.github.io/thinktree-web/`。

GitHub Pages 发布 `index.html`、`styles.css`、`app.js`、`favicon.svg`、`.nojekyll`、`assets/` 与 `demo/`；`demo/` 已包含演示所需的全部静态资源，线上可直接交互，不需要任何服务器。

### 绑定自己的域名

在仓库 **Settings → Pages → Custom domain** 填入域名，然后按提示配置 DNS：

- 根域名：`A` 记录指向 GitHub Pages 的 IP（见 GitHub 文档）
- 子域名：`CNAME` 记录指向 `kwong012.github.io`

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

- `app.js` 顶部的 `REPO_URL` 已指向 <https://github.com/kwong012/thinktree>；页头、底部 CTA 与页脚的 GitHub 链接会统一更新。
- 如需调整品牌色、字号或间距，修改 `styles.css` 顶部的 `:root` 变量即可。
- 首页展示视频为 `assets/canvas-demo.mp4`，与 `out-assets/docs/demo-canvas.mp4` 内容一致；如需更换视频，替换该文件并同时更新 `assets/canvas-poster.jpg` 封面。
- 内嵌演示地址在 `index.html` 的 `#demoFrame[src]` 与「在新窗口打开」链接中，默认 `demo/`。
- 静态演示的虚拟会话数据在 `demo/demo-data.js`；如需修改演示内容，优先改这份副本，或从 `demo-app/demo/demo-data.js` 重新同步。
- 如果重新构建了 `demo-app/src/web/dist/`，把新的 `assets/` 复制到 `demo/assets/`，并同步更新 `demo/index.html` 中的哈希文件名。

## 说明

页面是展示站；`demo-app/` 是从 `thinktree-fast` 复制的演示子集，包含虚拟数据、source 包装、服务端与已构建前端。产品能力、适配状态与隐私说明均来自 `thinktree-fast` 文档。

页面「快速开始」中的 `npm run web:install` / `npm run build:web` / `npm start` 是 `thinktree-fast` 项目的命令。本目录的 `npm run demo` 仅用于启动原始 Node 演示做对照；静态站点与内嵌演示都不需要构建或服务。
