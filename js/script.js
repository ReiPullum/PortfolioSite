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
      "cta.view": "VIEW PROJECTS",
      "cta.contact": "CONTACT ME",
      "about.title": "ABOUT",
      "about.text": `<p>Hey, I'm <strong style="color:var(--cyan)">Jonathan</strong>, but most people call me <strong style="color:#b94fff">Rei</strong>. I'm currently looking for opportunities where I can expand my knowledge and continue developing my skills. I enjoy collaborating with others, exploring new tools, and taking on projects that push me to grow. I'm always open to feedback on my work and interested in hearing ideas for future projects that will challenge me and help me improve.</p>`,
      "about.langsLabel": "LANGUAGES",
      "about.langsSub": "Spoken languages",
      "about.lang1": "English",
      "about.lang2": "Japanese",
      "projects.title": "PROJECTS",
      "proj.code": "CODE",
      "proj.preview": "PREVIEW",
      "proj.portfolio.name": "Portfolio Website",
      "proj.portfolio.desc": "I built this portfolio from scratch using HTML, CSS, and JavaScript to showcase my frontend craftsmanship and document my growth. It's a place where I experiment with modern web design, responsive layouts, and interactive UI patterns while prioritizing accessibility and performance.",
      "proj.gm.name": "General Motors SE Internship",
      "proj.gm.desc": "During a Software Engineering internship at General Motors, collaborated with Data Analysts and Software Engineers in an Agile environment to build and deploy impactful solutions. Contributed to an internal GM repository actively used by current engineers. Deployed a deep learning model capable of summarizing documents up to 300,000 words into concise summaries, significantly increasing data analyst productivity.",
      "proj.nexus.name": "Newscape Nexus",
      "proj.nexus.desc": "This project was developed independently as a full stack RuneScape3 Grand Exchange tracker. Built with Angular and Express, it features a public market dashboard that processes live GE data, a backend caching layer for optimized API responses, and a production ready CI pipeline complete with health endpoints and structured JSON logging.",
      "skills.title": "SKILLS",
      "experience.title": "EXPERIENCE",
      "exp.gm": `<li>Contributed to an internal General Motors repository used by current engineers.</li>
        <li>Collaborated with General Motors Data Analysts and Software Engineers following Agile methodology.</li>
        <li>Deployed a deep learning model to summarize documents up to 300,000 words improving overall efficiency.</li>`,
      "exp.costco": `<li>Led and mentored several teams of 3 to 6 employees to meet daily operational goals.</li>
        <li>Drove warehouse sales performance by identifying gaps and implementing strategies to meet targets.</li>`,
      "exp.jimmy": `<li>Trained multiple employees in food preperation, saftey protocols, and customer service standards.</li>
        <li>Encouraged employees to promote  the rewards program resulting in a 40% growth in member enrollments.</li>
        <li>Optimized sandwich assembly proccess to ensure consistently quick order completions while maintaining quality standards.</li>`,
      "college.title": "COLLEGE",
      "college.degree": "B.S. IN COMPUTER SCIENCE",
      "college.text": "Graduated December 2024. Through active involvement in all three clubs, I worked alongside students from diverse backgrounds, gaining valuable experience in community engagement and strengthening my communication skills",
      "contact.title": "CONTACT",
      "contact.text": `<span class="big">FEEL FREE <br>TO REACH OUT.</span> Open to full-time roles, internships, and part-time roles. Always looking forward to connecting.`,
      "footer.line1": "DESIGNED & BUILT BY REI PULLUM // 2026",
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
      "cta.view": "開発実績を見る",
      "cta.contact": "お問い合わせ",
      "about.title": "概要",
      "about.text": `<p>こんにちは、<strong style="color:var(--cyan)">ジョナサン</strong> と申します。周囲からは <strong style="color:#b94fff">レイ</strong> と呼ばれております。現在は、知識を深め、自身のスキルをさらに磨き続けることができる機会を探しております。他者との協力を大切にし、最新のツールを積極的に取り入れながら、自己成長に繋がる挑戦的なプロジェクトに取り組むことに強い意欲を持っております。また、自身の成果物に対するフィードバックを真摯に受け入れるとともに、さらなる改善や成長に繋がる、やりがいのある次なるプロジェクトへのアイデアやご提案もぜひお伺いしたいと考えております。</p>`,
      "about.langsLabel": "語学",
      "about.langsSub": "対応言語",
      "about.lang1": "英語",
      "about.lang2": "日本語",
      "projects.title": "プロジェクト",
      "proj.code": "ソースコードを表示",
      "proj.preview": "プレビュー",
      "proj.portfolio.name": "Portfolio Website",
      "proj.portfolio.desc": "本ポートフォリオは、フロントエンドにおける技術力と自身の成長を形にするため、HTML、CSS、JavaScriptを用いて一から構築いたしました。アクセシビリティやパフォーマンスを最優先に考慮しつつ、モダンなウェブデザイン、レスポンシブレイアウト、そしてインタラクティブなUIパターンの探求を実践する場として活用しております。",
      "proj.gm.name": "General Motors SE Internship",
      "proj.gm.desc": "ゼネラルモーターズでのソフトウェアエンジニアリングインターンシップ中、アジャイル環境においてデータアナリストおよびソフトウェアエンジニアと協力し、インパクトのあるソリューションの構築と展開に取り組みました。現在のエンジニアに活用されているGMの社内リポジトリに貢献しました。300,000語までの文書を簡潔な要約に圧縮できるディープラーニングモデルを展開し、データアナリストの生産性を大幅に向上させました。",
      "proj.nexus.name": "Newscape Nexus",
      "proj.nexus.desc": "本プロジェクトは、RuneScape3のグランドエクスチェンジを追跡するフルスタックトラッカーとして独自に開発いたしました。AngularとExpressを用いて構築し、リアルタイムGEデータを処理する公開マーケットダッシュボード、APIレスポンスを最適化するバックエンドキャッシュ層、ヘルスエンドポイントと構造化JSONログを備えた本番対応のCIパイプラインを実装しております。",
      "skills.title": "スキル",
      "experience.title": "経験",
      "exp.gm": `<li>現在のエンジニアに使用されているゼネラルモーターズの社内リポジトリに貢献しました。</li>
        <li>ゼネラルモーターズのデータアナリストおよびソフトウェアエンジニアとアジャイル手法に従い協力しました。</li>
        <li>300,000語までの文書を要約するディープラーニングモデルを展開し、全体的な効率を向上させました。</li>`,
      "exp.costco": `<li>3〜6名の複数チームを率いて指導し、日々の業務目標を達成しました。</li>
        <li>倉庫の販売実績を向上させるため、課題を特定し目標達成のための戦略を実施しました。</li>`,
      "exp.jimmy": `<li>複数の従業員に食品の調理、安全プロトコル、および顧客サービス基準についてトレーニングを行いました。</li>
        <li>従業員に報酬プログラムの促進を奨励し、会員登録数が40%増加しました。</li>
        <li>サンドイッチの組み立てプロセスを最適化し、品質基準を維持しながら一貫して迅速な注文完了を確保しました。</li>`,
      "college.title": "大学",
      "college.degree": "コンピュータサイエンス学士",
      "college.text": `<p>2024年12月に卒業しました。3つのクラブ活動を通じて、多様なバックグラウンドの学生と協働し、コミュニティ活動やコミュニケーション能力を磨きました。</p>`,
      "contact.title": "お問い合わせ",
      "contact.text": `<span class="big">いつでもお気軽にお問い合わせください。</span> 私は現在、正社員、インターンシップ、ならびにパートタイムでの機会を幅広く探しております。皆様との新たなつながりを持てることを、心より楽しみにしております。`,
      "footer.line1": "DESIGNED & BUILT BY REI PULLUM // 2026",
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
  const validLangs = ["en", "ja"];

  if (urlLang && !validLangs.includes(urlLang)) {
    const fallback = localStorage.getItem("site_lang") || "en";
    history.replaceState(null, '', '?lang=' + fallback);
  }

  const savedLang =
    (validLangs.includes(urlLang) ? urlLang : null) ||
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

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
    });
  });
}
});