/**
 * i18n.js — Language switcher + Google Fonts injector
 * Supports: English (default) / 中文
 * Persists choice in localStorage key "site-lang"
 *
 * Two mechanisms:
 *  1. Hard-coded UI strings (nav, hero, page labels…)
 *  2. data-zh / data-en attributes on any element for per-element overrides
 */
(function () {
  'use strict';

  /* ── Inject Google Fonts ─────────────────────────────────────────── */
  if (!document.querySelector('link[href*="Space+Grotesk"]')) {
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700' +
      '&family=IBM+Plex+Sans:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);
  }

  /* ── Translation data ────────────────────────────────────────────── */
  var UI = {
    nav: [
      { en: 'Home',         zh: '首页' },
      { en: 'Publications', zh: '发表论文' },
      { en: 'Blogs',        zh: '博客' },
      { en: 'About me',     zh: '关于我' },
    ],
    description: {
      en: 'Welcome to my site!<br />'
        + 'I am a PhD. student @ Westlake University. My research interests include '
        + '<b>sound event detection</b>; <b>semi-supervised / self-supervised learning</b> '
        + 'in audio processing.<br />Feel free to contact me: sao_year@126.com',
      zh: '欢迎来到我的主页！<br />'
        + '我是西湖大学博士在读生，研究方向包括<b>声音事件检测</b>以及'
        + '音频处理中的<b>半监督 / 自监督学习</b>。<br />'
        + '联系方式：sao_year@126.com',
    },
    footer: {
      en: 'Nian Shao, PhD. student @ Westlake University',
      zh: '邵年，西湖大学博士生',
    },
    hero: {
      eyebrow: { en: 'Audio Research · Signal Learning', zh: '音频研究 · 信号学习' },
      name:    { en: 'EtherSpace of Nian', zh: '邵年的主页' },
      desc: {
        en: 'PhD student at Westlake University, focused on <b>sound event detection</b> and '
          + '<b>semi-supervised / self-supervised learning</b> in audio processing.<br>'
          + 'Contact: sao_year@126.com',
        zh: '西湖大学博士在读，研究方向为<b>声音事件检测</b>与音频处理中的'
          + '<b>半监督 / 自监督学习</b>。<br>联系方式：sao_year@126.com',
      },
      btn1:  { en: 'Publications', zh: '发表论文' },
      btn2:  { en: 'Contact',      zh: '联系我' },
      stat1: { en: 'Research tracks', zh: '研究方向' },
      stat2: { en: 'Publications',    zh: '论文数' },
      stat3: { en: 'Open to collab',  zh: '开放合作' },
    },
    postsHead:     { en: 'Latest Posts',         zh: '最新文章' },
    archivesTitle: { en: 'Publications Archive', zh: '文章归档' },
    tagListTitle:  { en: 'Tag List',             zh: '标签列表' },
    nextPost:      { en: 'Next Post',            zh: '下一篇' },
    pageNext:      { en: 'Next Page',            zh: '下一页' },
    pagePrev:      { en: 'Prev Page',            zh: '上一页' },
  };

  var STORAGE_KEY = 'site-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  /* ── Apply translations ──────────────────────────────────────────── */
  function applyLang(lang) {
    var isZH = lang === 'zh';

    /* 1. Nav links */
    document.querySelectorAll('.site-nav').forEach(function (el) {
      var txt = el.textContent.trim();
      var match = UI.nav.find(function (n) { return n.en === txt || n.zh === txt; });
      if (match) el.textContent = isZH ? match.zh : match.en;
    });

    /* 2. Sidebar description */
    var descEl = document.querySelector('.site-description');
    if (descEl) descEl.innerHTML = isZH ? UI.description.zh : UI.description.en;

    /* 3. Sidebar footer — preserve RSS link */
    var footerEl = document.querySelector('.site-footer');
    if (footerEl) {
      var rssEl = footerEl.querySelector('.rss');
      var rssHTML = rssEl ? ' | ' + rssEl.outerHTML : '';
      footerEl.innerHTML = (isZH ? UI.footer.zh : UI.footer.en) + rssHTML;
    }

    /* 4. Lang button label */
    var btn = document.querySelector('.lang-btn');
    if (btn) btn.textContent = isZH ? 'EN' : '中文';

    /* 5. Hero section */
    function set(sel, val) { var el = document.querySelector(sel); if (el) el.innerHTML = val; }
    set('.hero-eyebrow', UI.hero.eyebrow[lang]);
    set('.hero-name',    UI.hero.name[lang]);
    set('.hero-desc',    UI.hero.desc[lang]);
    var heroBtns = document.querySelectorAll('.hero-btn');
    if (heroBtns[0]) heroBtns[0].textContent = UI.hero.btn1[lang];
    if (heroBtns[1]) heroBtns[1].textContent = UI.hero.btn2[lang];
    var stats = document.querySelectorAll('.hero-stat span');
    if (stats[0]) stats[0].textContent = UI.hero.stat1[lang];
    if (stats[1]) stats[1].textContent = UI.hero.stat2[lang];
    if (stats[2]) stats[2].textContent = UI.hero.stat3[lang];
    var postsH = document.querySelector('.posts-section-head h2');
    if (postsH) postsH.textContent = UI.postsHead[lang];

    /* 6. Page-level fixed labels */
    set('.archives-title', UI.archivesTitle[lang]);
    set('.tag-list-title',  UI.tagListTitle[lang]);
    document.querySelectorAll('.next-post .next').forEach(function (el) {
      el.textContent = UI.nextPost[lang];
    });

    /* 7. Pagination — preserve icon nodes */
    function pgTxt(el, label) {
      if (!el) return;
      var icon = el.querySelector('i');
      el.textContent = label + ' ';
      if (icon) {
        el.classList.contains('prev') ? el.insertBefore(icon, el.firstChild) : el.appendChild(icon);
      }
    }
    document.querySelectorAll('.pagination-container .next').forEach(function (el) { pgTxt(el, UI.pageNext[lang]); });
    document.querySelectorAll('.pagination-container .prev').forEach(function (el) { pgTxt(el, UI.pagePrev[lang]); });

    /* 8. Generic data-zh / data-en attributes — covers post titles, abstracts, content */
    document.querySelectorAll('[data-zh]').forEach(function (el) {
      var zhVal = el.getAttribute('data-zh');
      var enVal = el.getAttribute('data-en') || el.getAttribute('data-en-orig') || '';
      if (isZH) {
        if (!el.getAttribute('data-en-orig')) el.setAttribute('data-en-orig', el.innerHTML);
        el.innerHTML = zhVal;
      } else {
        var orig = el.getAttribute('data-en-orig');
        if (orig) el.innerHTML = orig;
        else if (enVal) el.innerHTML = enVal;
      }
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  /* ── Inject toggle button ────────────────────────────────────────── */
  function injectButton() {
    if (document.querySelector('.lang-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'lang-btn';
    btn.setAttribute('aria-label', 'Toggle language / 切换语言');
    btn.textContent = getLang() === 'zh' ? 'EN' : '中文';
    btn.addEventListener('click', function () {
      applyLang(getLang() === 'zh' ? 'en' : 'zh');
    });
    var container = document.querySelector('.sidebar');
    if (container) container.appendChild(btn);
  }

  /* ── Bootstrap ───────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectButton();
      applyLang(getLang());
    });
  } else {
    injectButton();
    applyLang(getLang());
  }
})();
