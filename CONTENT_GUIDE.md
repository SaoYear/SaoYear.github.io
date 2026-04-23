# SaoYear.github.io 内容维护说明

本文档用于指导你在当前站点结构下添加/更新内容，并保持 Publication 与 Blog 页面一致。

## 1. 当前内容结构

- 主页: `index.html`
- Publication 列表页: `archives/index.html`
- Blog 列表页: `tags/index.html`
- 文章详情页目录: `post/<slug>/index.html`
- 文章配图目录: `post-images/`
- 全局样式: `styles/main.css`
- 中英文切换脚本: `i18n.js`

## 2. 新增一篇 Publication（论文）

### 步骤 A: 新建详情页

1. 新建目录: `post/<slug>/`
2. 复制现有论文页作为模板（如 `post/finetune_ATST_SED/index.html`）
3. 修改:
- 标题（`h2.post-title`）
- 日期（`.post-date`）
- 正文（`.post-content`）
- `next-post` 跳转（如果需要）

### 步骤 B: 中英双语

对需要中英切换的元素加 `data-zh`，例如:

```html
<h2 class="post-title" data-zh="中文标题">English Title</h2>
<p data-zh="中文摘要">English abstract</p>
```

说明:
- 英文写在元素正文中
- 中文写在 `data-zh`
- `i18n.js` 会自动切换

### 步骤 C: 列表页挂载

将该论文加入 `archives/index.html` 的 `.archive-card-list`。

推荐卡片模板:

```html
<article class="archive-card">
  <a class="archive-card-thumb" href="https://saoyear.github.io/post/<slug>/" aria-label="<English title>">
    <img src="https://saoyear.github.io/post-images/<image-file>" alt="<English title> preview">
  </a>
  <div class="archive-card-body">
    <div class="archive-card-meta">
      <span class="venue-pill" data-zh="会议/期刊中文名">Conference / Journal</span>
      <span class="archive-card-date">YYYY-MM-DD</span>
    </div>
    <a href="https://saoyear.github.io/post/<slug>/">
      <h3 class="archive-card-title" data-zh="中文标题">English Title</h3>
    </a>
    <p class="archive-card-desc" data-zh="中文简介">English summary</p>
  </div>
</article>
```

### 步骤 D: 主页是否展示

如果希望新论文出现在首页，更新 `index.html` 对应的文章列表卡片（通常仅展示最新若干篇）。

## 3. 新增一篇 Blog（非论文）

### 步骤 A: 新建详情页

与 Publication 相同，在 `post/<slug>/index.html` 创建内容。

### 步骤 B: 添加到 Blog 列表

在 `tags/index.html` 的 `.blog-card-list` 下添加卡片。

有预览图时:

```html
<article class="blog-card">
  <a class="blog-card-thumb" href="https://saoyear.github.io/post/<slug>/" aria-label="<English title>">
    <img src="https://saoyear.github.io/post-images/<image-file>" alt="<English title> preview">
  </a>
  <div class="blog-card-body">
    <div class="blog-card-meta">
      <span class="blog-pill" data-zh="分类中文">Category</span>
      <span class="blog-card-date">YYYY-MM-DD</span>
    </div>
    <a href="https://saoyear.github.io/post/<slug>/">
      <h3 class="blog-card-title" data-zh="中文标题">English Title</h3>
    </a>
    <p class="blog-card-desc" data-zh="中文简介">English summary</p>
  </div>
</article>
```

无预览图时:
- 删除 `.blog-card-thumb` 块
- 保留 `.blog-card-body` 即可

## 4. 预览图规范

- 路径: `post-images/<file>`
- 建议比例: 16:10 或接近
- 建议宽度: 1200px 左右
- 文件名建议与文章 slug 对齐，便于维护

示例:
- `post-images/finetune_ATST_SED.png`
- `post-images/FS_EEND.png`

## 5. 固定文案翻译（导航/分页/页面标题）

这类文本在 `i18n.js` 中维护（UI 对象）。

常见项:
- 导航: `nav`
- 页面标题: `archivesTitle`, `tagListTitle`
- 分页: `pageNext`, `pagePrev`

## 6. 发布流程

在仓库根目录执行:

```powershell
git add -A
git commit -m "content: add <topic>"
git push
```

GitHub Pages 通常会在几分钟内生效。
如本地看不到更新，浏览器强刷（Ctrl+F5）。

## 7. 清理策略（防止仓库膨胀）

每次发版前检查:

1. 是否存在未被引用的页面/样式文件
2. 是否有临时预览文件
3. 是否有重复图片资源

建议只删除“确认未被任何页面引用”的文件。

---

如需，我可以继续补一份“新增内容检查清单（Checklist）”版本，便于你每次按条目发布。