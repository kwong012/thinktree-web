# thinktree-web

thinkTREE 的静态展示站：深色扁平风格参考同级目录的 `thinktree-fast`。首页使用 `out-assets/docs/demo-canvas.mp4` 的真实会话录制视频（自动静音循环，可暂停），下方另有一个可直接交互的轨迹画布演示（平移、缩放、拖动节点、小地图、轨迹树、LOD）。

纯静态站点，无需构建步骤，可直接部署到 GitHub Pages 或其他免费托管。

## 本地预览

任选一种：

```bash
# Python 3
python -m http.server 8080

# Node（无需安装）
npx --yes serve . -l 8080
```

打开 <http://localhost:8080>。

直接双击 `index.html` 也能查看，但建议用本地 HTTP 服务，避免个别浏览器对本地脚本的限制。

## 目录

| 文件 | 说明 |
|---|---|
| `index.html` | 页面结构与文案 |
| `styles.css` | 全部样式，tokens 与 thinktree-fast 对齐 |
| `app.js` | 中英切换、复制按钮、交互式 Canvas 轨迹演示 |
| `assets/` | 首页真实演示视频（直接复制自 `out-assets/docs/demo-canvas.mp4`）、视频封面、Dashboard 截图 |
| `out-assets/` | 原始演示素材来源，保持不动 |
| `.github/workflows/pages.yml` | GitHub Pages 自动部署 |
| `favicon.svg` | 站点图标 |

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
- 交互演示的数据全部在 `app.js` 的 `NODES` / `EDGES` / `TURNS` 中，可直接替换为真实会话内容。

## 说明

本页面是独立静态展示站，不包含 `thinktree-fast` 的后端与实时数据读取逻辑。产品能力、适配状态与隐私说明均来自该项目文档。

页面「快速开始」中的 `npm run web:install` / `npm run build:web` / `npm start` / `npm run demo` 是 `thinktree-fast` 项目的命令，不是本静态站点的命令；本静态站点无需构建，本地预览见上文。
