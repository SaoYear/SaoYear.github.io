/**
 * i18n.js — Language switcher + Google Fonts injector
 * Supports: English (default) / 中文
 * Persists choice in localStorage key "site-lang"
 *
 * Usage: add <script src="/i18n.js"></script> before </body>
 * No HTML attribute changes required for sidebar elements.
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
      zh: '邵念，西湖大学博士生',
    },
  };

  var STORAGE_KEY = 'site-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  /* ── Apply translations ──────────────────────────────────────────── */
  function applyLang(lang) {
    /* Nav links */
    var navEls = document.querySelectorAll('.site-nav');
    navEls.forEach(function (el) {
      var txt = el.textContent.trim();
      var match = UI.nav.find(function (n) {
        return n.en === txt || n.zh === txt;
      });
      if (match) el.textContent = lang === 'zh' ? match.zh : match.en;
    });

    /* Sidebar description */
    var descEl = document.querySelector('.site-description');
    if (descEl) {
      descEl.innerHTML = lang === 'zh' ? UI.description.zh : UI.description.en;
    }

    /* Sidebar footer — preserve RSS link */
    var footerEl = document.querySelector('.site-footer');
    if (footerEl) {
      var rssEl = footerEl.querySelector('.rss');
      var rssHTML = rssEl ? ' | ' + rssEl.outerHTML : '';
      footerEl.innerHTML =
        (lang === 'zh' ? UI.footer.zh : UI.footer.en) + rssHTML;
    }

    /* Update button label */
    var btn = document.querySelector('.lang-btn');
    if (btn) btn.textContent = lang === 'zh' ? 'EN' : '中文';

    localStorage.setItem(STORAGE_KEY, lang);
  }

  /* ── Inject toggle button into sidebar ──────────────────────────── */
  function injectButton() {
    if (document.querySelector('.lang-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'lang-btn';
    btn.setAttribute('aria-label', 'Toggle language / 切换语言');
    btn.textContent = getLang() === 'zh' ? 'EN' : '中文';
    btn.addEventListener('click', function () {
      applyLang(getLang() === 'zh' ? 'en' : 'zh');
    });
    var container = document.querySelector('.sidebar .top-container');
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
