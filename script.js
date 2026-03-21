document.addEventListener("DOMContentLoaded", () => {
  // Cursor glow
  const glow = document.getElementById("cursor-glow");
  if (glow) {
    document.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  // rain effect with characters
  const canvas = document.getElementById("rain");
  let ctx = null;
  let W = 0,
    H = 0,
    drops = [];
  const chars =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

  if (canvas && canvas.getContext) {
    ctx = canvas.getContext("2d");
    function initRain() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      drops = Array.from(
        { length: Math.floor(W / 18) },
        () => Math.random() * -H,
      );
    }
    function drawRain() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(5,2,15,0.08)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "13px monospace";
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle =
          i % 5 === 0
            ? `rgba(185,79,255,${Math.random() > 0.5 ? 1 : 0.4})`
            : `rgba(0,245,255,0.3)`;
        ctx.fillText(ch, i * 18, y);
        drops[i] = y > H + Math.random() * 100 ? -20 : y + 18;
      });
    }
    initRain();
    window.addEventListener("resize", initRain);
    setInterval(drawRain, 55);
  }

  // Kanji floaters
  const kanji = [
    "夢",
    "力",
    "成",
    "忍",
    "誠",
    "知",
    "詳細",
    "創",
    "挑",
    "野心",
  ];

  const kanjiEng = [
    "DREAM",
    "STRENGTH",
    "ACHIEVEMENT",
    "PERSEVERANCE",
    "INTEGRITY",
    "KNOWLEDGE",
    "DETAIL",
    "CREATION",
    "CHALLENGE",
    "AMBITION",
  ];

  const kanjiBg = document.getElementById("kanji-bg");
  if (kanjiBg) {
    function spawnKanji() {
      const lang = localStorage.getItem("site_lang") || "en";
      const pool = lang === "ja" ? kanji : kanjiEng;
      const el = document.createElement("div");
      el.className = "kanji";
      el.textContent = pool[Math.floor(Math.random() * pool.length)];
      el.style.left = Math.random() * 100 + "vw";
      el.style.fontSize = lang === "ja"
        ? 3 + Math.random() * 5 + "rem"
        : 1 + Math.random() * 1.5 + "rem";
      const dur = 20 + Math.random() * 20;
      el.style.animationDuration = dur + "s";
      el.style.animationDelay = -Math.random() * dur + "s";
      kanjiBg.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000);
    }
    for (let i = 0; i < 4; i++) spawnKanji();
    setInterval(spawnKanji, 8000);
  }

  // Typing effect on hero
  const roles = [
    "FULL STACK DEV",
    "WAYNE STATE UNIVERSITY GRADUATE",
    "B.S. IN COMPUTER SCIENCE",
  ];
  let ri = 0,
    ci = 0,
    del = false;
  const typed = document.getElementById("typed-role");
  function type() {
    if (!typed) return;
    const word = roles[ri];
    if (!del) {
      typed.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        del = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      typed.textContent = word.slice(0, --ci);
      if (ci === 0) {
        del = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(type, del ? 60 : 110);
  }
  setTimeout(type, 800);

  // Scroll reveal
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll("section, .proj-card, .tl-item, .skill-cat, .stat-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      obs.observe(el);
    });

  const dict = {
    en: {
      "nav.about": "ABOUT",
      "nav.skills": "SKILLS",
      "nav.experience": "EXPERIENCE",
      "nav.college": "COLLEGE",
      "nav.projects": "PROJECTS",
      "nav.contact": "CONTACT",
      "hero.subtitle": "プログラマー ／ ソフトウェアエンジニア",
      "hero.tagline": "Thank you for spending the time to check out my portfolio. Feel free to contact me and chat anytime!",
      "hero.jp": "未来をコードで作る ─ 美しいソフトウェアへの情熱",
      "cta.view": "VIEW PROJECTS",
      "cta.contact": "CONTACT ME",
      "about.title": "ABOUT",
      "about.jp": "について",
      "about.text": `<p>Hey, I'm <strong style="color:var(--cyan)">Jonathan</strong>, but most people call me <strong style="color:#b94fff">Rei</strong>. I'm currently looking for opportunities where I can expand my knowledge and continue developing my skills. I enjoy collaborating with others, exploring new tools, and taking on projects that push me to grow. I'm always open to feedback on my work and interested in hearing ideas for future projects that will challenge me and help me improve.</p>`,
      "about.langsLabel": "LANGUAGES",
      "about.langsSub": "Spoken languages",
      "about.lang1": "English",
      "about.lang2": "Japanese",
      "projects.title": "PROJECTS",
      "projects.jp": "プロジェクト",
      "proj.code": "CODE",
      "proj.preview": "PREVIEW",
      "proj.portfolio.name": "Portfolio Website",
      "proj.portfolio.desc": "I built this portfolio from scratch using HTML, CSS, and JavaScript to showcase my frontend craftsmanship and document my growth. It's a place where I experiment with modern web design, responsive layouts, and interactive UI patterns while prioritizing accessibility and performance.",
      "proj.gm.name": "PPA Project — General Motors",
      "proj.gm.desc": "This project was developed by a team of six as part of a capstone course in partnership with General Motors. We built a full stack analytics platform that processed over 30 million public policy records and integrated an AI powered summarization engine to condense lengthy documents into clear short descriptions. Our work was later presented to 150+ GM EDI leaders and data engineers, where it received strong feedback for its innovation and practical value.",
      "skills.title": "SKILLS",
      "skills.jp": "スキル",
      "experience.title": "EXPERIENCE",
      "experience.jp": "経験",
      "exp.costco": `<li>Adapted quickly to surges, scaling prep and service processes to meet increased customer demand without sacrificing quality.</li>
        <li>Managed time sensitive production under pressure, prioritizing tasks to keep the line moving during the busiest hours.</li>
        <li>Managed high volume rotisserie production, preparing up to 80 chickens per shift while maintaining strict quality and timing standards.</li>`,
      "exp.jimmy": `<li>Maintained positive customer relationships by demonstrating strong communication and problem solving skills during peak hours.</li>
        <li>Optimized sandwich assembly proccess to ensure consistently quick order completions while maintaining quality standards.</li>
        <li>Trained multiple employees in food preperation, saftey protocols, and customer service standards.</li>`,
      "footer.line1": "DESIGNED & BUILT BY <span>REI PULLUM</span> // 2026",
    },
    ja: {
      "nav.about": "概要",
      "nav.skills": "スキル",
      "nav.experience": "経験",
      "nav.college": "大学",
      "nav.projects": "プロジェクト",
      "nav.contact": "お問い合わせ",
      "hero.subtitle": "プログラマー ／ ソフトウェアエンジニア",
      "hero.tagline": "お忙しい中、ポートフォリオをご高覧いただき誠にありがとうございます。ご質問やご相談などございましたら、いつでもお気軽にお問い合わせください。",
      "hero.jp": "未来をコードで作る ─ 美しいソフトウェアへの情熱",
      "cta.view": "開発実績を見る",
      "cta.contact": "お問い合わせ",
      "about.title": "概要",
      "about.jp": "概要",
      "about.text": `<p>こんにちは、<strong style="color:var(--cyan)">ジョナサン</strong> と申します。周囲からは <strong style="color:#b94fff">レイ</strong> と呼ばれております。現在は、知識を深め、自身のスキルをさらに磨き続けることができる機会を探しております。他者との協力を大切にし、最新のツールを積極的に取り入れながら、自己成長に繋がる挑戦的なプロジェクトに取り組むことに強い意欲を持っております。また、自身の成果物に対するフィードバックを真摯に受け入れるとともに、さらなる改善や成長に繋がる、やりがいのある次なるプロジェクトへのアイデアやご提案もぜひお伺いしたいと考えております。</p>`,
      "about.langsLabel": "語学",
      "about.langsSub": "対応言語",
      "about.lang1": "英語",
      "about.lang2": "日本語",
      "projects.title": "プロジェクト",
      "projects.jp": "プロジェクト",
      "proj.code": "ソースコードを表示",
      "proj.preview": "プレビュー",
      "proj.portfolio.name": "Portfolio Website",
      "proj.portfolio.desc": "本ポートフォリオは、フロントエンドにおける技術力と自身の成長を形にするため、HTML、CSS、JavaScriptを用いて一から構築いたしました。アクセシビリティやパフォーマンスを最優先に考慮しつつ、モダンなウェブデザイン、レスポンシブレイアウト、そしてインタラクティブなUIパターンの探求を実践する場として活用しております。",
      "proj.gm.name": "PPA Project — General Motors",
      "proj.gm.desc": "本プロジェクトは、ゼネラルモーターズ（GM）社との提携によるキャップストーン・プログラムの一環として、6名のチームで開発いたしました。3,000万件以上の公的政策データを処理するフルスタックの分析プラットフォームを構築し、AIを活用した要約エンジンを統合することで、膨大な文書を簡潔で明快な記述に凝縮する機能を実装いたしました。本成果は、GM社のEDIリーダーやデータエンジニアを含む150名以上の前で発表を行い、その革新性と実用性において高い評価をいただきました。",
      "skills.title": "スキル",
      "skills.jp": "スキル",
      "experience.title": "経験",
      "experience.jp": "経験",
      "exp.costco": `<li>需要の急増に迅速に対応し、準備およびサービス工程を効率的にスケールさせることで、品質を維持しつつ業務を完遂いたしました。</li>
        <li>時間制約のある生産業務をプレッシャー下で管理し、繁忙期においても優先順位を的確に判断してラインの稼働を維持いたしました。</li>
        <li>高ボリュームのロティサリー調理を管理し、1シフトあたり最大80羽の調理を厳格な品質基準と時間制限のもとで担当いたしました。</li>`,
      "exp.jimmy": `<li>ピーク時においても、的確なコミュニケーションと問題解決能力を発揮し、良好な顧客関係の維持に努めました。</li>
        <li>サンドイッチの調理工程を最適化し、迅速な提供と品質維持を両立させる仕組みを構築いたしました。</li>
        <li>複数の従業員に対し、食材準備、安全プロトコル、および接客基準に関するトレーニングを担当いたしました。</li>`,
      "footer.line1": "DESIGNED & BUILT BY <span>REI PULLUM</span> // 2026",
    },
  };

  function setLanguage(lang) {
    localStorage.setItem("site_lang", lang);
    history.replaceState(null, '', '?lang=' + lang);

    if (kanjiBg) {
      kanjiBg.innerHTML = '';
      for (let i = 0; i < 4; i++) spawnKanji();
    }

    document.querySelectorAll("[data-dict]").forEach((node) => {
      const key = node.getAttribute("data-dict");
      const val = dict[lang] && dict[lang][key];
      if (val !== undefined) {
        const tag = node.tagName.toLowerCase();
        if (["div", "p", "span", "ul", "li"].includes(tag))
          node.innerHTML = val;
        else node.textContent = val;
      }
    });
    const btn = document.getElementById("translate-btn");
    if (btn) {
      btn.textContent = lang === "en" ? "日本語" : "EN";
      btn.setAttribute("aria-pressed", lang === "ja" ? "true" : "false");
    }
  }

  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const savedLang =
    urlLang ||
    localStorage.getItem("site_lang") ||
    (navigator.language && navigator.language.startsWith("ja") ? "ja" : "en");
  setLanguage(savedLang);

  const translateBtn = document.getElementById("translate-btn");
  if (translateBtn) {
    translateBtn.addEventListener("click", () => {
      const current = localStorage.getItem("site_lang") || "en";
      const next = current === "en" ? "ja" : "en";
      setLanguage(next);
    });
  }

  // Create modal and append to body
  let previewModal = document.getElementById("preview-modal");
  if (!previewModal) {
    previewModal = document.createElement("div");
    previewModal.id = "preview-modal";
    previewModal.innerHTML = `
      <div class="modal-inner" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="Close preview">BACK</button>
        <img src="" alt="Preview image" />
      </div>
    `;
    document.body.appendChild(previewModal);
  }

  const modalImg = previewModal.querySelector("img");

  function openPreviewModal(url, alt = "Preview image") {
    if (!modalImg) return;
    modalImg.src = url;
    modalImg.alt = alt;
    previewModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closePreviewModal() {
    previewModal.classList.remove("show");
    if (modalImg) modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const previewBtn = e.target.closest(".preview-btn");
    if (previewBtn) {
      const full = previewBtn.dataset.full;
      if (full) openPreviewModal(full);
      return;
    }
    if (e.target.closest(".modal-close")) {
      closePreviewModal();
      return;
    }
  });

  previewModal.addEventListener("click", (e) => {
    if (e.target === previewModal) closePreviewModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && previewModal.classList.contains("show"))
      closePreviewModal();
  });
});