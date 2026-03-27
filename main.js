/* ========================================
   職場壓力指數測驗 — main.js
   IIFE 包裝，零 emoji，零全域污染
   ======================================== */
(function () {
  'use strict';

  /* ── 題庫 ── */
  var questions = [
    {
      text: '週一早上鬧鐘響了，你的第一個念頭是？',
      illustration: './assets/questions/question-01.png',
      options: [
        { text: '美好的一天開始了！', score: 0 },
        { text: '嗯...再躺五分鐘', score: 1 },
        { text: '腦中自動播放公司待辦清單', score: 2 },
        { text: '認真考慮裝病請假', score: 3 }
      ]
    },
    {
      text: '午休時間到了，你通常？',
      illustration: './assets/questions/question-02.png',
      options: [
        { text: '開心揪同事吃飯聊天', score: 0 },
        { text: '邊吃邊滑手機放空', score: 1 },
        { text: '邊吃邊回訊息處理公事', score: 2 },
        { text: '午休？那是什麼能吃嗎？', score: 3 }
      ]
    },
    {
      text: '主管突然說「等等來我辦公室一下」，你？',
      illustration: './assets/questions/question-03.png',
      options: [
        { text: '好的～蹦蹦跳跳過去', score: 0 },
        { text: '冷靜走過去，內心小鹿亂撞', score: 1 },
        { text: '先回想最近有沒有闖什麼禍', score: 2 },
        { text: '開始寫遺書（不是）', score: 3 }
      ]
    },
    {
      text: '下班時間到了，同事都還在座位上，你？',
      illustration: './assets/questions/question-04.png',
      options: [
        { text: '準時收包走人，生活最重要', score: 0 },
        { text: '假裝收東西，觀察一下風向再走', score: 1 },
        { text: '再撐半小時好了...', score: 2 },
        { text: '下班時間只是參考用的吧', score: 3 }
      ]
    },
    {
      text: '假日收到工作訊息，你的反應？',
      illustration: './assets/questions/question-05.png',
      options: [
        { text: '已讀不回，假日是我的', score: 0 },
        { text: '看一下內容，明天再處理', score: 1 },
        { text: '馬上回覆，怕被認為不積極', score: 2 },
        { text: '週末也在工作群組裡待命', score: 3 }
      ]
    },
    {
      text: '開會時你最常有的想法是？',
      illustration: './assets/questions/question-06.png',
      options: [
        { text: '認真聽並提出想法', score: 0 },
        { text: '偷偷在桌下滑手機', score: 1 },
        { text: '這個會不能發 email 就好嗎', score: 2 },
        { text: '靈魂已經離開身體了', score: 3 }
      ]
    },
    {
      text: '工作上遇到困難，你傾向？',
      illustration: './assets/questions/question-07.png',
      options: [
        { text: '覺得是成長的機會，衝啊', score: 0 },
        { text: '找同事討論看看', score: 1 },
        { text: '默默扛著，怕問了被覺得不行', score: 2 },
        { text: '困難太多已經麻木了', score: 3 }
      ]
    },
    {
      text: '你最近的睡眠狀況？',
      illustration: './assets/questions/question-08.png',
      options: [
        { text: '倒頭就睡，一覺到天亮', score: 0 },
        { text: '偶爾翻來覆去才睡著', score: 1 },
        { text: '常常半夜突然想到工作的事', score: 2 },
        { text: '失眠是常態，數羊數到牧場倒閉', score: 3 }
      ]
    },
    {
      text: '關於「離職」這件事，你？',
      illustration: './assets/questions/question-09.png',
      options: [
        { text: '目前很滿意，沒想過', score: 0 },
        { text: '偶爾會滑一下人力銀行', score: 1 },
        { text: '履歷隨時保持更新狀態', score: 2 },
        { text: '每天都在心裡辭職 87 次', score: 3 }
      ]
    },
    {
      text: '用一個詞形容你現在的工作狀態？',
      illustration: './assets/questions/question-09.png',
      options: [
        { text: '樂在其中', score: 0 },
        { text: '還行吧', score: 1 },
        { text: '苦撐', score: 2 },
        { text: '生無可戀', score: 3 }
      ]
    }
  ];

  /* ── 結果分級 ── */
  var results = [
    {
      min: 0,   max: 15,
      title: '佛系無壓 \u00B7 職場仙人',
      desc: '你根本是來公司度假的吧？上班對你來說就像去公園散步，羨煞旁人。拜託分享一下你的快樂秘訣！',
      image: './assets/results/result-level1.png',
      colorClass: 'stress-low'
    },
    {
      min: 16,  max: 30,
      title: '微風輕拂 \u00B7 淡定打工人',
      desc: '偶爾有點小煩躁，但整體來說你 handle 得很好。適當的壓力反而是你的動力，繼續保持這個節奏！',
      image: './assets/results/result-level2.png',
      colorClass: 'stress-low'
    },
    {
      min: 31,  max: 45,
      title: '小有負擔 \u00B7 努力搬磚者',
      desc: '壓力開始有點份量了，但你還撐得住。記得偶爾放自己一馬，下班後的時間是你的，別客氣。',
      image: './assets/results/result-level3.png',
      colorClass: 'stress-mid'
    },
    {
      min: 46,  max: 60,
      title: '壓力臨界 \u00B7 瀕臨當機',
      desc: '警告：壓力水位已達警戒線！你可能需要一個假期，或至少一杯好咖啡。記住：你的價值不等於你的產出。',
      image: './assets/results/result-level4.png',
      colorClass: 'stress-mid'
    },
    {
      min: 61,  max: 75,
      title: '明顯過載 \u00B7 身心俱疲',
      desc: '紅燈亮起！你的身心正在發出求救訊號。是時候認真思考一下工作與生活的平衡了，你值得被好好對待。',
      image: './assets/results/result-level5.png',
      colorClass: 'stress-high'
    },
    {
      min: 76,  max: 90,
      title: '瀕臨爆炸 \u00B7 壓力鍋模式',
      desc: '你簡直是行走的壓力鍋，隨時可能噴氣！強烈建議跟信任的人聊聊，或考慮尋求專業協助。你的健康比任何 KPI 都重要。',
      image: './assets/results/result-level6.png',
      colorClass: 'stress-high'
    },
    {
      min: 91,  max: 100,
      title: '壓力爆表 \u00B7 需要擁抱',
      desc: '你承受的壓力已經超出正常範圍了。請認真考慮跟主管談談工作量，或諮詢專業心理師。記住：請求幫助是勇敢的表現。',
      image: './assets/results/result-level7.png',
      colorClass: 'stress-high'
    }
  ];

  /* ── 狀態 ── */
  var currentQuestion = 0;
  var totalScore = 0;
  var TOTAL_QUESTIONS = questions.length;
  var MAX_SCORE = TOTAL_QUESTIONS * 3;

  /* ── DOM 快取 ── */
  var screens = {
    start:   document.getElementById('screen-start'),
    quiz:    document.getElementById('screen-quiz'),
    loading: document.getElementById('screen-loading'),
    result:  document.getElementById('screen-result')
  };

  /* ── 畫面切換 ── */
  function showScreen(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.remove('active');
    });
    screens[name].classList.add('active');
  }

  /* ── 渲染題目 ── */
  function renderQuestion() {
    var q = questions[currentQuestion];

    /* 進度 */
    var pct = ((currentQuestion) / TOTAL_QUESTIONS * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('q-current').textContent = currentQuestion + 1;
    document.getElementById('q-total').textContent = TOTAL_QUESTIONS;

    /* 插圖淡入 */
    var img = document.getElementById('question-illustration');
    img.classList.add('fade-out');
    setTimeout(function () {
      img.src = q.illustration;
      img.onload = function () { img.classList.remove('fade-out'); };
      img.onerror = function () { img.classList.remove('fade-out'); };
    }, 200);

    /* 題目文字 */
    document.getElementById('question-text').textContent = 'Q' + (currentQuestion + 1) + '. ' + q.text;

    /* 選項 */
    var container = document.getElementById('options-container');
    container.innerHTML = '';
    var labels = ['A', 'B', 'C', 'D'];
    q.options.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type = 'button';
      btn.textContent = labels[i] + '. ' + opt.text;
      btn.addEventListener('click', function () { selectOption(opt.score); });
      container.appendChild(btn);
    });
  }

  /* ── 選擇選項 ── */
  function selectOption(score) {
    totalScore += score;
    currentQuestion++;

    if (currentQuestion < TOTAL_QUESTIONS) {
      renderQuestion();
    } else {
      showLoading();
    }
  }

  /* ── 計算中 ── */
  function showLoading() {
    showScreen('loading');
    setTimeout(function () {
      showResult();
    }, 1500);
  }

  /* ── 顯示結果 ── */
  function showResult() {
    var percentage = Math.round(totalScore / MAX_SCORE * 100);
    var result = getResult(percentage);

    showScreen('result');

    /* 數字動畫 */
    animateNumber(document.getElementById('result-percentage'), 0, percentage, 1200);

    /* 壓力條動畫 */
    var fill = document.getElementById('result-meter-fill');
    fill.style.width = '0%';
    fill.style.background = getMeterGradient(percentage);
    setTimeout(function () {
      fill.style.width = percentage + '%';
    }, 100);

    /* 結果內容 */
    document.getElementById('result-image').src = result.image;
    var titleEl = document.getElementById('result-title');
    titleEl.textContent = result.title;
    titleEl.className = 'result-title ' + result.colorClass;
    document.getElementById('result-desc').textContent = result.desc;

    /* 百分比數字顏色 */
    var pctEl = document.getElementById('result-percentage');
    pctEl.className = 'result-percentage ' + result.colorClass;
  }

  /* ── 取得對應結果 ── */
  function getResult(pct) {
    for (var i = 0; i < results.length; i++) {
      if (pct >= results[i].min && pct <= results[i].max) {
        return results[i];
      }
    }
    return results[results.length - 1];
  }

  /* ── 壓力條漸層色 ── */
  function getMeterGradient(pct) {
    if (pct <= 30) return 'linear-gradient(90deg, #66BB6A, #81C784)';
    if (pct <= 60) return 'linear-gradient(90deg, #66BB6A, #FFA726)';
    return 'linear-gradient(90deg, #66BB6A, #FFA726, #EF5350)';
  }

  /* ── 數字遞增動畫 ── */
  function animateNumber(el, from, to, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── 重新測驗 ── */
  function resetQuiz() {
    currentQuestion = 0;
    totalScore = 0;
    document.getElementById('share-panel').classList.add('hidden');
    showScreen('quiz');
    renderQuestion();
  }

  /* ── 分享功能 ── */
  function toggleSharePanel() {
    var panel = document.getElementById('share-panel');
    panel.classList.toggle('hidden');
  }

  function shareResult(platform) {
    var pct = Math.round(totalScore / MAX_SCORE * 100);
    var result = getResult(pct);
    var text = '我的職場壓力指數是 ' + pct + '%「' + result.title + '」！你呢？快來測測看 ';
    var url = window.location.href.split('?')[0] + '?utm_source=' + platform + '&utm_medium=social&utm_campaign=tool-work-stress-quiz-v1.0.0';

    switch (platform) {
      case 'facebook':
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&quote=' + encodeURIComponent(text), '_blank');
        break;
      case 'line':
        window.open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '_blank');
        break;
      case 'twitter':
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(url), '_blank');
        break;
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text + url);
          var btn = document.querySelector('[data-platform="copy"]');
          var orig = btn.textContent;
          btn.textContent = '已複製！';
          setTimeout(function () { btn.textContent = orig; }, 2000);
        }
        break;
    }
  }

  /* ── 初始化 ── */
  function init() {
    document.getElementById('btn-start').addEventListener('click', function () {
      showScreen('quiz');
      renderQuestion();
    });

    document.getElementById('btn-retry').addEventListener('click', resetQuiz);
    document.getElementById('btn-share').addEventListener('click', toggleSharePanel);

    /* 分享按鈕委派 */
    document.getElementById('share-panel').addEventListener('click', function (e) {
      var btn = e.target.closest('.share-btn');
      if (btn) shareResult(btn.dataset.platform);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
