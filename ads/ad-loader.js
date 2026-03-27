/* ========================================
   ad-loader.js — 職場壓力指數測驗
   廣告載入 + UTM 追蹤 + GAS 點擊追蹤
   ======================================== */
(function () {
  'use strict';

  /* ── 設定 ── */
  var TOOL_SLUG = 'tool-work-stress-quiz-v1.0.0';
  var PROJECT_SLUG = 'work-stress-quiz';

  var GAS_URL = 'https://script.google.com/macros/s/AKfycbwErP5VVl_6vI29OiH4BAfmvCwC2eYmO5QrvK-BKYmYz1M6dCGyIffxmQgFwKzZlKs/exec';

  /* ── 廣告資料（CDN 圖片） ── */
  var ADS = [
    {
      title: '明星3缺1',
      desc: 'gametower',
      img: 'https://scontent.ftpe7-1.fna.fbcdn.net/v/t39.30808-6/648706321_1448981057013542_9064894674256098713_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=MH0HC92vLg8Q7kNvwFaQvRb&_nc_oc=AdrhM4bh7Sha--Wghetp5OWif1IgqSsYjMt9Ga7gxDTZ5a_HAsVCTnU-LxFQnGJCkQk&_nc_zt=23&_nc_ht=scontent.ftpe7-1.fna&_nc_gid=hrmRiiO0Kj1yUskP1_Q4XA&_nc_ss=7a32e&oh=00_AfzOv7XrGzIsnGs15eC4KubMhglBlbmHqLIN7iozTmrkKw&oe=69C952CA',
      url: 'https://www.gametower.com.tw/games/mobile/i371/'
    },
    {
      title: '滿貫大亨',
      desc: 'gametower',
      img: 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t39.30808-6/539616014_1089253463330462_7513008573003625713_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=7o_VZfypDjgQ7kNvwG4RrF6&_nc_oc=Adqq14JN3dNzKRxEandE-L7i2N-Yuz8HRrTlHL6QC_msLCbLZQxjmcRbu2z2gVnDnEg&_nc_zt=23&_nc_ht=scontent.ftpe7-3.fna&_nc_gid=K6tCugfHTAYFeFBOsKuPJA&_nc_ss=7a32e&oh=00_AfzB9tUtq9FRC8f1a_u0L7NrkxSwh8sL4h-9VXHnWFgrrg&oe=69C93DBB',
      url: 'https://www.gametower.com.tw'
    },
    {
      title: '競技麻將2',
      desc: 'cmj2',
      img: 'https://scontent.ftpe7-3.fna.fbcdn.net/v/t39.30808-6/629195011_1463303279138868_7447318853304926633_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=GQc1CEAK1oIQ7kNvwH9-aYq&_nc_oc=AdoI9uoJ-Mh5M4aKIQOLHX1oZuYuDKVqfuFI2t5jDwuHNlrG8y7qoyuQeitIHRnxdxE&_nc_zt=23&_nc_ht=scontent.ftpe7-3.fna&_nc_gid=z3mBXk_jWVBH7CJGcz9I4Q&_nc_ss=7a32e&oh=00_Afy-5peyzc6vN0x_cBMXhadMVcWyvw2pBY0YmW9oLKztfw&oe=69C93183',
      url: 'https://www.gametower.com.tw'
    },
    {
      title: 'Mythrune',
      desc: 'mythrune.net',
      img: 'https://i.pinimg.com/originals/63/ba/29/63ba2995f8893cfcf5cf46c274626a0c.jpg',
      url: 'https://mythrune.net/'
    }
  ];

  /* ── UTM ── */
  var ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  function utm(url, adIndex) {
    var sep = url.indexOf('?') === -1 ? '?' : '&';
    var ord = ORDINALS[adIndex] || (adIndex + 1) + 'th';
    return url + sep +
      'utm_source=' + PROJECT_SLUG +
      '&utm_medium=display' +
      '&utm_campaign=mega_traffic_2026' +
      '&utm_content=' + ord + '_banner';
  }

  /* ── 取得使用者 IP ── */
  var cachedIP = '';
  function getIP() {
    if (cachedIP) return Promise.resolve(cachedIP);
    return fetch('https://api.ipify.org?format=json')
      .then(function (r) { return r.json(); })
      .then(function (d) { cachedIP = d.ip; return d.ip; })
      .catch(function () { return 'unknown'; });
  }

  /* ── GAS 點擊追蹤 ── */
  function trackClick(adId) {
    getIP().then(function (ip) {
      fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'click', ip: ip, adId: adId })
      }).catch(function () {});
    });
  }

  /* ── 渲染 Sidebar 廣告 ── */
  var VISIBLE_COUNT = 3;
  var ROTATE_MS = 12000;

  function renderSidebar(el) {
    var label = document.createElement('div');
    label.className = 'ad-sponsor-label';
    label.textContent = '贊助夥伴';
    el.appendChild(label);

    var grid = document.createElement('div');
    grid.className = 'ad-grid';

    ADS.forEach(function (ad, i) {
      var a = document.createElement('a');
      a.href = utm(ad.url, i);
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'ad-link ad-card';
      a.setAttribute('data-ad-id', '廣告' + (i + 1) + '_' + ad.title);
      if (i >= VISIBLE_COUNT) a.style.display = 'none';

      var img = document.createElement('img');
      img.src = ad.img;
      img.alt = ad.title + '廣告';
      img.className = 'ad-img';
      img.loading = 'lazy';
      a.appendChild(img);

      var lbl = document.createElement('div');
      lbl.className = 'ad-label';

      var t = document.createElement('span');
      t.className = 'ad-title';
      t.textContent = ad.title;
      lbl.appendChild(t);

      var s = document.createElement('span');
      s.className = 'ad-source';
      s.textContent = ad.desc;
      lbl.appendChild(s);

      a.appendChild(lbl);
      grid.appendChild(a);
    });

    el.appendChild(grid);

    // 輪播邏輯
    if (ADS.length > VISIBLE_COUNT) {
      var offset = 0;
      setInterval(function () {
        var cards = grid.querySelectorAll('.ad-card');
        cards.forEach(function (c) { c.style.opacity = '0'; });
        setTimeout(function () {
          offset = (offset + 1) % ADS.length;
          cards.forEach(function (c, i) {
            var show = false;
            for (var v = 0; v < VISIBLE_COUNT; v++) {
              if (i === (offset + v) % ADS.length) show = true;
            }
            c.style.display = show ? 'block' : 'none';
            if (show) c.style.opacity = '1';
          });
        }, 400);
      }, ROTATE_MS);
    }

    /* 點擊追蹤 */
    el.addEventListener('click', function (e) {
      var link = e.target.closest('.ad-link');
      if (link) trackClick(link.getAttribute('data-ad-id'));
    });
  }

  /* ── 渲染 Header/Footer Banner ── */
  function renderBanner(el, slot) {
    var ad = ADS[slot === 'header' ? 0 : ADS.length - 1];
    var idx = slot === 'header' ? 0 : ADS.length - 1;
    
    el.style.cssText = 'background:var(--color-surface);border:1px solid var(--color-border);border-radius:8px;overflow:hidden;display:flex;width:100%;height:100%;max-width:320px;margin:0 auto;';

    var a = document.createElement('a');
    a.href = utm(ad.url, idx);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'ad-link';
    a.setAttribute('data-ad-id', '廣告' + (idx + 1) + '_' + ad.title);
    a.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:12px;padding:8px 16px;text-decoration:none;width:100%;';

    var badge = document.createElement('span');
    badge.textContent = 'AD';
    badge.style.cssText = 'font-size:0.55rem;background:var(--color-surface-alt);color:var(--color-text-muted);padding:2px 6px;border-radius:4px;letter-spacing:0.08em;';
    a.appendChild(badge);

    var img = document.createElement('img');
    img.src = ad.img;
    img.alt = ad.title + '廣告';
    img.style.cssText = 'width:32px;height:32px;border-radius:6px;object-fit:cover;';
    img.loading = 'lazy';
    a.appendChild(img);

    var text = document.createElement('span');
    text.textContent = ad.title + ' — 立即體驗 →';
    text.style.cssText = 'font-size:0.8rem;color:var(--color-text);font-weight:bold;';
    a.appendChild(text);

    el.appendChild(a);

    a.addEventListener('click', function () {
      trackClick(a.getAttribute('data-ad-id'));
    });
  }

  /* ── 初始化 ── */
  function init() {
    var slots = document.querySelectorAll('[data-ad-slot]');
    slots.forEach(function (el) {
      var slot = el.getAttribute('data-ad-slot');
      if (slot === 'sidebar') { renderSidebar(el); }
      else { renderBanner(el, slot); }
      el.classList.add('ad-loaded');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
