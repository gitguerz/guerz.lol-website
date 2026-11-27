/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

const FCC_TRACKS = [
  { id:'fcc1', label:'Responsive Web Design (HTML + CSS)' },
  { id:'fcc2', label:'JavaScript Algorithms & Data Structures' },
  { id:'fcc3', label:'Front End Development Libraries (React)' },
  { id:'fcc4', label:'Relational Database (SQL + MySQL)' },
  { id:'fcc5', label:'Back End Dev & APIs (Node + Express)' },
  { id:'fcc6', label:'Scientific Computing with Python' },
  { id:'fcc7', label:'Data Analysis with Python' },
];

// ★ = already in your bookmarks   + = new recommendation
const PHASES = [
  {
    id:'p1', num:'01', color:'#00D4A8',
    name:'Environment + AFFiNE + HTML / CSS',
    weeks:'Weeks 1–2', dates:'May 7 – May 20',
    desc:'Nothing gets built without the right environment. Get your M4 Mac wired up properly — it will carry you through everything else on this list. Then: HTML and CSS. The bones and skin of the web. The stuff you were already doing on Geocities, now with proper names.',
    tasks:[
      {
        id:'p1t1', name:'Dev environment: Homebrew, VS Code, Node via nvm',
        detail:'Install Homebrew first — it\'s the package manager for everything else. Then VS Code (download the Apple Silicon build explicitly). Install nvm to manage Node versions cleanly. Add VS Code extensions: Prettier, Live Server, GitLens, and the Tailwind CSS IntelliSense.',
        res:[
          {n:'★ VS Code', u:'https://code.visualstudio.com/', bk:true},
          {n:'★ VS Code Docs', u:'https://code.visualstudio.com/docs', bk:true},
          {n:'+ Homebrew', u:'https://brew.sh', bk:false},
          {n:'+ nvm', u:'https://github.com/nvm-sh/nvm', bk:false},
          {n:'+ Warp Terminal', u:'https://www.warp.dev', bk:false},
        ]
      },
      {
        id:'p1t2', name:'AFFiNE: full PKM + roadmap system setup',
        detail:'This is your learning operating system for the next 16 weeks. Set up: (1) a Kanban board with 7 columns, one per phase — drag tasks as you complete them. (2) A daily journal template — log what you built every single day. (3) A mind map for each tech topic you study. (4) Use AFFiNE AI to generate study outlines and quiz you on your notes.',
        res:[
          {n:'+ AFFiNE', u:'https://affine.pro', bk:false},
          {n:'+ AFFiNE Docs', u:'https://docs.affine.pro', bk:false},
        ]
      },
      {
        id:'p1t3', name:'HTML5 essentials',
        detail:'Semantic tags (header, nav, main, article, section, footer), document structure, forms, tables, media elements, accessibility basics (alt text, ARIA roles, tab order). Goal: rebuild your old Geocities layout from memory using proper 2026 HTML.',
        res:[
          {n:'★ web.dev/learn/html', u:'https://web.dev/learn/html', bk:true},
          {n:'★ W3Schools HTML', u:'https://www.w3schools.com/', bk:true},
          {n:'★ fCC HTML course', u:'https://www.freecodecamp.org/learn', bk:true},
          {n:'★ hackr.io HTML', u:'https://hackr.io/tutorials/learn-html', bk:true},
          {n:'★ HTML flashcards', u:'https://www.asabeneh.com/flashcards/HTML', bk:true},
          {n:'★ W3Schools URL Enc', u:'https://www.w3schools.com/tags/ref_urlencode.asp', bk:true},
        ]
      },
      {
        id:'p1t4', name:'CSS fundamentals',
        detail:'Box model, display & position, flexbox, CSS Grid, custom properties (variables), transitions, basic animations. Use interactive games to lock in flexbox and grid — they\'re the hardest mental models. simplecss.org is already in your bookmarks and is a great reference for clean, minimal CSS patterns.',
        res:[
          {n:'★ web.dev/learn/css', u:'https://web.dev/learn/css', bk:true},
          {n:'★ W3Schools CSS', u:'https://www.w3schools.com/', bk:true},
          {n:'★ simplecss.org', u:'https://simplecss.org/', bk:true},
          {n:'★ CSS flashcards', u:'https://www.asabeneh.com/flashcards/CSS', bk:true},
          {n:'★ hackr.io CSS', u:'https://hackr.io/tutorials/learn-css', bk:true},
          {n:'+ Flexbox Froggy', u:'https://flexboxfroggy.com', bk:false},
          {n:'+ Grid Garden', u:'https://cssgridgarden.com', bk:false},
          {n:'+ CSS Tricks', u:'https://css-tricks.com', bk:false},
        ]
      },
      {
        id:'p1t5', name:'Build: first static webpage from scratch',
        detail:'Combine HTML + CSS into one real page. Make it a "coming soon" page for guerz.link, or a static version of your origin story. No frameworks, no libraries — just you and the browser. The Geocities instinct is still in there.',
        res:[
          {n:'+ CodePen', u:'https://codepen.io', bk:false},
          {n:'★ fCC 19 Projects', u:'https://www.freecodecamp.org/news/build-19-web-dev-projects-using-html-css-javascript/', bk:true},
        ]
      },
    ],
    tips:[
      {type:'m4', label:'M4 Tip', text:'Homebrew runs natively on Apple Silicon — no Rosetta 2. Download the Apple Silicon (ARM64) build of VS Code explicitly from the VS Code site. Run <code>arch</code> in terminal to verify you\'re on arm64.'},
      {type:'affine', label:'AFFiNE', text:'Open AFFiNE\'s mind map, title it "HTML Tags I Know," and add a node every time you learn a new tag. Your brain retains structure better when it\'s visual. By end of week 1 that map should be dense.'},
      {type:'adhd', label:'ADHD Strategy', text:'One concept per 25-min Pomodoro. When you finish a task, physically drag the card on AFFiNE\'s kanban to the Done column. That visual motion is a mini dopamine hit your brain will learn to chase productively.'},
    ]
  },
  {
    id:'p2', num:'02', color:'#A87CF8',
    name:'JavaScript + Markdown + p5.js Intro',
    weeks:'Weeks 3–5', dates:'May 21 – Jun 10',
    desc:'JavaScript is the engine that makes everything move. p5.js is JavaScript that feels like art. Markdown is how the internet writes. All three in three weeks — and your ADHD brain will love p5.js specifically because the feedback is instant and visual.',
    tasks:[
      {
        id:'p2t1', name:'JavaScript fundamentals',
        detail:'Variables (let/const, never var), data types, functions (regular + arrow), arrays, objects, loops (for, forEach, map, filter), conditionals, template literals. javascript.info is the single best resource that exists for this — read it like a book, chapter by chapter.',
        res:[
          {n:'★ web.dev/learn/js', u:'https://web.dev/learn/javascript', bk:true},
          {n:'★ JS flashcards', u:'https://www.asabeneh.com/flashcards/JavaScript', bk:true},
          {n:'★ hackr.io JS guide', u:'https://hackr.io/blog/how-to-learn-javascript', bk:true},
          {n:'★ fCC JS course', u:'https://www.freecodecamp.org/learn', bk:true},
          {n:'★ W3Schools React/JS', u:'https://www.w3schools.com/', bk:true},
          {n:'+ javascript.info', u:'https://javascript.info', bk:false},
        ]
      },
      {
        id:'p2t2', name:'DOM manipulation + events',
        detail:'querySelector, getElementById, addEventListener, classList.add/remove/toggle, createElement, innerHTML vs textContent, basic form handling and validation. This is where JS becomes interactive — things change when you click them.',
        res:[
          {n:'+ javascript.info DOM', u:'https://javascript.info/document', bk:false},
          {n:'★ web.dev/learn/js', u:'https://web.dev/learn/javascript', bk:true},
          {n:'+ MDN DOM', u:'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', bk:false},
        ]
      },
      {
        id:'p2t3', name:'Markdown proficiency (30-minute learn)',
        detail:'Headings, bold, italic, links, images, code (inline + blocks), lists, blockquotes, tables, horizontal rules. You\'ll use this daily — in AFFiNE, in GitHub READMEs, in WordPress. Spend 30 focused minutes and you have it for life.',
        res:[
          {n:'★ Markdown Guide', u:'https://www.markdownguide.org/', bk:true},
          {n:'+ CommonMark', u:'https://commonmark.org/help/', bk:false},
        ]
      },
      {
        id:'p2t4', name:'p5.js: first sketches',
        detail:'p5.js is a JavaScript creative coding library built for artists and visual thinkers. You will understand JavaScript faster through p5 because you SEE the results instantly. Start: setup() and draw(), shapes (rect, ellipse, line), color (fill, stroke, background), frameCount, mouseX/mouseY. The Coding Train on YouTube (Daniel Shiffman) is the essential teacher — his energy is unmatched.',
        res:[
          {n:'★ p5js.org tutorials', u:'https://p5js.org/tutorials/', bk:true},
          {n:'★ p5js.org download', u:'https://p5js.org/download/', bk:true},
          {n:'★ p5 education', u:'https://p5js.org/education-resources/', bk:true},
          {n:'+ p5 Web Editor', u:'https://editor.p5js.org', bk:false},
          {n:'+ The Coding Train', u:'https://thecodingtrain.com', bk:false},
        ]
      },
      {
        id:'p2t5', name:'★ BONUS: physion.net — physics + JS',
        detail:'This is already in your bookmarks and is a hidden gem: Physion is a 2D physics simulation environment that uses JavaScript for scripting. It bridges your creative instinct with code. Spend a few sessions here as a reward/play session between harder study days.',
        res:[
          {n:'★ physion.net', u:'https://app.physion.net/#', bk:true},
          {n:'★ physion docs', u:'https://physion.net/docs', bk:true},
          {n:'★ physion JS scripts', u:'https://github.com/dimitrisx/physion-assets/tree/master/Assets/Text/JavaScript/NodeScripts', bk:true},
        ]
      },
      {
        id:'p2t6', name:'Build: interactive webpage combining all 3',
        detail:'Build one page that uses HTML structure, CSS styling, and JavaScript interactivity. Add a p5.js canvas to it. Make it weird. Make it personal. This becomes the first real thing in your GitHub portfolio.',
        res:[
          {n:'+ CodePen', u:'https://codepen.io', bk:false},
          {n:'+ CodeSandbox', u:'https://codesandbox.io', bk:false},
        ]
      },
    ],
    tips:[
      {type:'m4', label:'M4 Tip', text:'Use the p5.js web editor (editor.p5js.org) — zero setup, works instantly in Comet browser. When you\'re ready to go local, p5 installs via npm: <code>npm install p5</code>.'},
      {type:'affine', label:'AFFiNE', text:'Write ALL your notes in Markdown inside AFFiNE. You\'re learning Markdown by doing it, not studying it. AFFiNE supports full Markdown syntax — use it for every note from week 3 onward.'},
      {type:'adhd', label:'ADHD Strategy', text:'When JS fundamentals feel dry (they will), switch to a p5.js sketch. Draw something. Animate something. Then come back to fundamentals. Your brain gets the dopamine from the visual output and returns to abstract concepts more receptive. This is a feature, not a workaround.'},
    ]
  },
  {
    id:'p3', num:'03', color:'#F7C948',
    name:'AI Tools Mastery',
    weeks:'Weeks 6–7', dates:'Jun 11 – Jun 24',
    desc:'You already have the best AI stack available: Claude, Perplexity Pro, HuggingFace, and ChatGPT. This phase is about building a SYSTEM — so these tools multiply every hour of learning from here forward instead of just answering one-off questions.',
    tasks:[
      {
        id:'p3t1', name:'Claude: prompt engineering proficiency',
        detail:'Read the full prompt engineering guide at docs.claude.com. Key skills: being specific about output format, using positive AND negative examples, asking for step-by-step reasoning, using XML tags to structure complex prompts, and specifying exact length/format. Then: use Claude to explain everything you\'ve learned in phases 1 + 2.',
        res:[
          {n:'+ Claude Prompt Guide', u:'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview', bk:false},
          {n:'+ Claude docs', u:'https://docs.claude.com', bk:false},
          {n:'★ Prompt Eng flashcards', u:'https://www.asabeneh.com/flashcards/Prompt%20Engineering', bk:true},
        ]
      },
      {
        id:'p3t2', name:'Perplexity Pro: research workflow',
        detail:'Perplexity is your research engine — it gives sourced, cited answers with real links. Build the habit: any time you need to understand a concept deeply or find current resources, start with Perplexity. Use Pro\'s "Focus" modes (YouTube, Academic, Reddit) for different types of answers.',
        res:[
          {n:'+ Perplexity Pro', u:'https://www.perplexity.ai/pro', bk:false},
        ]
      },
      {
        id:'p3t3', name:'HuggingFace: explore the ecosystem',
        detail:'HuggingFace hosts thousands of AI models, Spaces (interactive demos), and datasets. For your goals: (1) explore Spaces — run models in-browser with zero setup. (2) Use the Inference API to call models from JavaScript. (3) This connects directly to your Digital Cinematography direction — image gen, audio, video models all live here.',
        res:[
          {n:'★ HuggingFace', u:'https://huggingface.co/', bk:true},
          {n:'★ HF Pricing', u:'https://huggingface.co/pricing', bk:true},
          {n:'★ HF Repos', u:'https://huggingface.co/settings/repositories', bk:true},
          {n:'+ HF Spaces', u:'https://huggingface.co/spaces', bk:false},
          {n:'+ HF Inference API', u:'https://huggingface.co/docs/api-inference/index', bk:false},
        ]
      },
      {
        id:'p3t4', name:'Build your 3-tool AI learning stack',
        detail:'Define your lanes: Perplexity (research + sourced answers), Claude (explain, iterate, build, code review), ChatGPT (second opinion, alternate explanations, O3 for hard problems). Each tool has strengths. Knowing which to reach for first is the actual skill.',
        res:[
          {n:'★ ChatGPT', u:'https://chatgpt.com/', bk:true},
        ]
      },
      {
        id:'p3t5', name:'AI-assisted review: phases 1 + 2',
        detail:'Use Claude to quiz you on HTML, CSS, JS, and p5.js. Paste your code and ask for a real code review. Use HuggingFace\'s Prompt Engineering Space to test different prompting strategies. Close every gap before moving to React.',
        res:[
          {n:'★ fCC flashcard review', u:'https://www.freecodecamp.org/learn', bk:true},
        ]
      },
    ],
    tips:[
      {type:'affine', label:'AFFiNE', text:'AFFiNE AI can generate quiz questions from any document you paste into it. Every time you finish a study session, paste your notes and ask AFFiNE AI to make 5 quiz questions. Review them the next morning.'},
      {type:'adhd', label:'ADHD Strategy', text:'The AI stack is your ADHD superpower. When you get stuck and start spiraling — open Claude. Describe exactly what\'s confusing you. Get unstuck in under 2 minutes. Repeat. You now have a 24/7 patient tutor who never sighs.'},
      {type:'extra', label:'HuggingFace Tip', text:'For Digital Cinematography: explore HuggingFace Spaces under "video" and "image" categories. Models like AnimateDiff, Stable Video Diffusion, and audio separation tools live here — free to try in-browser. This is your creative rabbit hole for reward days.'},
    ]
  },
  {
    id:'p4', num:'04', color:'#FF6872',
    name:'React + Tailwind CSS + SQL / MySQL',
    weeks:'Weeks 8–10', dates:'Jun 25 – Jul 15',
    desc:'The technical stack that powers modern WordPress development. React for dynamic interfaces, Tailwind for fast professional styling, and MySQL/MariaDB because every WordPress install runs on a database and you should know what\'s inside it.',
    tasks:[
      {
        id:'p4t1', name:'React fundamentals',
        detail:'Functional components, JSX, props, useState, useEffect, conditional rendering, lists + keys, basic event handling. Use the official react.dev tutorial — it was completely rewritten and is now the best React learning resource that exists. Also in your bookmarks: Epic React, patterns.dev, and React Resources.',
        res:[
          {n:'★ react.dev', u:'https://react.dev/', bk:true},
          {n:'★ react.dev/learn', u:'https://react.dev/learn', bk:true},
          {n:'★ hackr.io React', u:'https://hackr.io/tutorials/learn-react', bk:true},
          {n:'★ React flashcards', u:'https://www.asabeneh.com/flashcards/React', bk:true},
          {n:'★ Epic React', u:'https://www.epicreact.dev/', bk:true},
          {n:'★ patterns.dev', u:'https://www.patterns.dev/react/', bk:true},
          {n:'★ React Resources', u:'https://reactresources.com/', bk:true},
          {n:'★ React Router', u:'https://reactrouter.com/', bk:true},
        ]
      },
      {
        id:'p4t2', name:'Tailwind CSS',
        detail:'Utility-first classes, responsive prefixes (sm: md: lg:), hover/focus/active states, dark mode, basic Tailwind config, the Tailwind Playground for rapid prototyping. You can start with the CDN version — no build step required to explore.',
        res:[
          {n:'★ tailwindcss.com', u:'https://tailwindcss.com/docs/installation/using-vite', bk:true},
          {n:'+ Tailwind Playground', u:'https://play.tailwindcss.com', bk:false},
        ]
      },
      {
        id:'p4t3', name:'SQL essentials',
        detail:'SELECT + WHERE + ORDER BY + LIMIT, JOINs (INNER, LEFT, RIGHT), GROUP BY + HAVING, INSERT, UPDATE, DELETE, basic CREATE TABLE. SQLBolt is the fastest interactive way — 20 lessons, in-browser, you write real SQL immediately.',
        res:[
          {n:'★ hackr.io MySQL', u:'https://hackr.io/tutorials/learn-mysql', bk:true},
          {n:'★ Hyperskill SQL', u:'https://hyperskill.org/categories/20', bk:true},
          {n:'★ JetBrains SQL', u:'https://academy.jetbrains.com/?tag=SQL+and+Databases', bk:true},
          {n:'+ SQLBolt', u:'https://sqlbolt.com', bk:false},
          {n:'+ SQLZoo', u:'https://sqlzoo.net', bk:false},
        ]
      },
      {
        id:'p4t4', name:'MySQL + MariaDB: WordPress database layer',
        detail:'Install MySQL via Homebrew. Learn the wp_ table structure: wp_posts, wp_users, wp_options, wp_postmeta, wp_usermeta. Use TablePlus (best Mac GUI, free tier is generous) to browse and query your local WordPress database. Run real SELECT queries against it.',
        res:[
          {n:'+ TablePlus (Mac)', u:'https://tableplus.com', bk:false},
          {n:'+ WP DB Schema', u:'https://codex.wordpress.org/Database_Description', bk:false},
          {n:'★ WordPress Glossary', u:'https://wordpress.com/support/glossary/', bk:true},
          {n:'★ phpMyAdmin ref', u:'https://wordpress.org/documentation/article/wordpress-glossary/#phpMyAdmin', bk:true},
        ]
      },
      {
        id:'p4t5', name:'Build: React + Tailwind interactive component',
        detail:'Build a small but real UI component — a card grid, a filter interface, a toggle panel, a form with validation. Style it entirely with Tailwind. This is the kind of component you\'ll build inside WordPress Gutenberg blocks in Phase 5.',
        res:[
          {n:'+ CodeSandbox', u:'https://codesandbox.io', bk:false},
          {n:'+ Stackblitz', u:'https://stackblitz.com', bk:false},
        ]
      },
    ],
    tips:[
      {type:'m4', label:'M4 Tip', text:'Install MySQL via Homebrew: <code>brew install mysql</code>. Start it: <code>brew services start mysql</code>. Install MariaDB as a drop-in alternative: <code>brew install mariadb</code>. Both run natively on M4 at full speed.'},
      {type:'affine', label:'AFFiNE', text:'Create a React mind map: Component → JSX → Props → State (useState) → Side Effects (useEffect). Branch each concept. Visual mapping prevents the "I watched the tutorial but can\'t apply it" loop.'},
      {type:'adhd', label:'ADHD Strategy', text:'SQL feels abstract until it touches real data. Don\'t practice on fake datasets — run your queries on your actual local WordPress database. Querying real posts and real users makes the syntax stick immediately.'},
    ]
  },
  {
    id:'p5', num:'05', color:'#52AEFF',
    name:'WordPress + Custom Theme + Blog Launch',
    weeks:'Weeks 11–13', dates:'Jul 16 – Aug 5',
    desc:'This is the destination phase. Everything you\'ve built in phases 1–4 was the toolkit. WordPress is where it lands. Your blog goes live. guerz.link becomes real. And your origin story — Geocities to Full Sail — goes public.',
    tasks:[
      {
        id:'p5t1', name:'Local WordPress: Local by Flywheel',
        detail:'Local is the best way to run WordPress locally on a Mac — PHP, MySQL, nginx, all bundled, no config. Install it, create a local site, point VS Code at your site\'s theme folder. Break things here, not on your live site. This is your sandbox.',
        res:[
          {n:'+ Local by Flywheel', u:'https://localwp.com', bk:false},
          {n:'★ WordPress.org', u:'https://wordpress.org/documentation/', bk:true},
          {n:'★ WP install guide', u:'https://developer.wordpress.org/advanced-administration/before-install/howto-install/', bk:true},
          {n:'★ WP CLI', u:'https://make.wordpress.org/cli/', bk:true},
          {n:'★ WP CLI handbook', u:'https://make.wordpress.org/cli/handbook/', bk:true},
        ]
      },
      {
        id:'p5t2', name:'Gutenberg + block editor proficiency',
        detail:'Block types, block patterns, reusable blocks, Full Site Editing (FSE) basics, Custom HTML blocks (critical for embedding your roadmap), template parts, navigation. Learn.wordpress.org has structured learning pathways — both Designer and Developer tracks are in your bookmarks.',
        res:[
          {n:'★ learn.wordpress.org', u:'https://learn.wordpress.org/learning-pathway/developer/', bk:true},
          {n:'★ WP Designer path', u:'https://learn.wordpress.org/learning-pathway/designer/', bk:true},
          {n:'★ WordPress.tv', u:'https://wordpress.tv/category/how-to/', bk:true},
          {n:'★ Gutenberg dev docs', u:'https://developer.wordpress.org/block-editor/', bk:true},
          {n:'★ WP blocks', u:'https://wordpress.org/blocks/', bk:true},
          {n:'★ WP patterns', u:'https://wordpress.org/patterns/', bk:true},
        ]
      },
      {
        id:'p5t3', name:'Custom theme: upload + activate + debug',
        detail:'Upload your custom theme folder via wp-admin → Appearance → Themes → Add New → Upload. Activate it. Use browser DevTools + VS Code + Local\'s error log to debug any layout or PHP errors. The HTML + CSS knowledge from Phase 1 is now directly applicable.',
        res:[
          {n:'★ WP Theme Handbook', u:'https://developer.wordpress.org/', bk:true},
          {n:'★ WP Themes (Automattic)', u:'https://wordpress.org/themes/author/automattic/', bk:true},
          {n:'★ ThemeShaper CSS tips', u:'https://themeshaper.com/category/css-tips/', bk:true},
          {n:'★ ThemeShaper design', u:'https://themeshaper.com/category/design/', bk:true},
        ]
      },
      {
        id:'p5t4', name:'Essential plugins — lean stack only',
        detail:'Install only what\'s necessary: Yoast SEO or Rank Math (SEO), WPForms Lite (contact form), Wordfence (security), UpdraftPlus (backups). BuddyPress is already in your bookmarks if you want community features later. Fewer plugins = faster site = fewer conflicts.',
        res:[
          {n:'★ WP Plugins', u:'https://wordpress.org/plugins/', bk:true},
          {n:'★ BuddyPress', u:'https://buddypress.org/', bk:true},
          {n:'★ BuddyPress dev', u:'https://developer.buddypress.org/', bk:true},
          {n:'★ WP best plugins 2026', u:'https://wordpress.com/blog/2026/02/09/best-wordpress-plugins/', bk:true},
          {n:'★ Jetpack', u:'https://wordpress.com/support/jetpack-scan/', bk:true},
        ]
      },
      {
        id:'p5t5', name:'Connect guerz.link domain',
        detail:'If on WordPress.com with custom domain: upgrade plan and map guerz.link in Domains settings. If self-hosting: point DNS from WordPress.com (registrar) to your host\'s nameservers. Update WordPress Address in Settings → General. Cloudflare is already in your bookmarks — great for free DNS + CDN.',
        res:[
          {n:'★ WordPress.com Domains', u:'https://wordpress.com/support/ssh/', bk:true},
          {n:'★ Cloudflare', u:'https://www.cloudflare.com/', bk:true},
          {n:'★ Vercel (deploy)', u:'https://vercel.com/', bk:true},
          {n:'+ DigitalOcean', u:'https://www.digitalocean.com/', bk:false},
        ]
      },
      {
        id:'p5t6', name:'First post: "From Geocities to Full Sail — The Return"',
        detail:'Write your origin story. Where you started (Geocities, LiveJournal). Where life went. Why you\'re back. What this roadmap means. Link your LiveJournal as proof. Include your Gravatar. Draft it in AFFiNE in Markdown first, then paste to WordPress. This is your voice — don\'t sanitize it.',
        res:[
          {n:'★ Your LiveJournal', u:'https://died-trying.livejournal.com/', bk:true},
          {n:'★ Gravatar', u:'https://gravatar.com', bk:false},
          {n:'★ Openverse (free media)', u:'https://openverse.org/', bk:true},
          {n:'★ Matt Mullenweg blog', u:'https://ma.tt/', bk:true},
        ]
      },
      {
        id:'p5t7', name:'Publish this interactive HTML roadmap as a page',
        detail:'Create a new Page → Full Width template → switch to Code editor → add Custom HTML block → paste this entire file. Set it as a nav menu item titled "Roadmap." Your progress is saved in the browser via localStorage — visitors see your roadmap; you see your progress.',
        res:[
          {n:'★ WP Custom HTML', u:'https://wordpress.org/documentation/article/wordpress-glossary/', bk:true},
          {n:'+ WPCode plugin', u:'https://wpcode.com', bk:false},
        ]
      },
    ],
    tips:[
      {type:'m4', label:'M4 Tip', text:'Local by Flywheel has native Apple Silicon support since 2022. PHP, MySQL, and nginx are all bundled — zero system-level config. It\'s the fastest local WordPress setup on Mac, full stop.'},
      {type:'affine', label:'AFFiNE', text:'Draft every single blog post in AFFiNE first. Write in Markdown, review with AFFiNE AI, then paste into WordPress. Never write directly in the block editor — too many distractions, no version history.'},
      {type:'adhd', label:'ADHD Strategy', text:'This is the phase where everything becomes VISIBLE and REAL. Your blog going live is the biggest dopamine hit in the entire roadmap. Use it. Screenshot it. Post about it. Let the reward hit land — your brain deserves the payoff for the 10 weeks of work that preceded it.'},
    ]
  },
  {
    id:'p6', num:'06', color:'#3DDC84',
    name:'Git + GitHub + Python',
    weeks:'Weeks 14–15', dates:'Aug 6 – Aug 19',
    desc:'Git is how you stop losing your work. GitHub is how you show your work. Python is the language that will matter most at Full Sail and in every technical career that follows. Two weeks. Three tools. All functional by Full Sail.',
    tasks:[
      {
        id:'p6t1', name:'Git: the mental model + core commands',
        detail:'Learn the three states first (working tree, staging area, local repo) — draw them, understand them before memorizing commands. Then: init, status, add, commit, log, diff, branch, checkout/switch, merge, reset, stash. The Pro Git book is free online and is the definitive canonical resource.',
        res:[
          {n:'★ Pro Git book (free)', u:'https://git-scm.com/book/en/v2', bk:true},
          {n:'★ git-scm.com', u:'https://git-scm.com/', bk:true},
          {n:'★ Git cheat sheet', u:'https://git-scm.com/cheat-sheet', bk:true},
          {n:'★ git everyday guide', u:'https://git-scm.com/docs/giteveryday', bk:true},
          {n:'★ Git Immersion', u:'https://gitimmersion.com/', bk:true},
          {n:'★ Nulab Git tutorial', u:'https://nulab.com/learn/software-development/git-tutorial/', bk:true},
          {n:'★ LazyGit (TUI)', u:'https://github.com/jesseduffield/lazygit/releases', bk:true},
        ]
      },
      {
        id:'p6t2', name:'GitHub: repos, Pages, and your profile',
        detail:'Create a repo, add remote origin, push, pull, fork, create a pull request, write a proper README.md. Set up GitHub Pages — you already have docs.github.com/en/pages bookmarked extensively. Set up your profile README (github.com/Guerz is already yours).',
        res:[
          {n:'★ docs.github.com', u:'https://docs.github.com/en', bk:true},
          {n:'★ GitHub Pages quickstart', u:'https://docs.github.com/en/pages/quickstart', bk:true},
          {n:'★ GitHub Skills', u:'https://github.com/skills/github-pages', bk:true},
          {n:'★ GitHub Pages examples', u:'https://github.com/collections/github-pages-examples', bk:true},
          {n:'★ Your GitHub', u:'https://github.com/Guerz', bk:true},
          {n:'★ GitLab GitFlow', u:'https://gitlab.com/guerz/guerz/-/learn_gitlab', bk:true},
        ]
      },
      {
        id:'p6t3', name:'Push your WordPress theme to GitHub',
        detail:'git init inside your theme folder. Create .gitignore (ignore node_modules, .DS_Store, wp-config.php). Make your first commit. Push to a public repo on your Guerz GitHub account. Write a real README.md for it. This is your first public portfolio artifact.',
        res:[
          {n:'+ gitignore.io', u:'https://www.toptal.com/developers/gitignore', bk:false},
        ]
      },
      {
        id:'p6t4', name:'Python fundamentals',
        detail:'Variables, strings, lists, dicts, tuples, loops (for/while), functions, file I/O (open, read, write), error handling (try/except), basic OOP (classes). "Automate the Boring Stuff" is the gold standard — free online, practical, immediately applicable to real problems.',
        res:[
          {n:'★ python.org', u:'https://www.python.org/', bk:true},
          {n:'★ python.org beginner', u:'https://wiki.python.org/moin/BeginnersGuide/NonProgrammers', bk:true},
          {n:'★ inventwithpython.com', u:'https://inventwithpython.com/', bk:true},
          {n:'★ hackr.io Python', u:'https://hackr.io/tutorials/learn-python', bk:true},
          {n:'★ Hyperskill Python', u:'https://hyperskill.org/courses/18', bk:true},
          {n:'★ JetBrains Python', u:'https://academy.jetbrains.com/?tag=Python', bk:true},
          {n:'★ fCC Python', u:'https://www.freecodecamp.org/learn', bk:true},
          {n:'+ Automate Boring Stuff', u:'https://automatetheboringstuff.com', bk:false},
        ]
      },
      {
        id:'p6t5', name:'First Python project — something you actually need',
        detail:'Write a script that solves a real problem in your life. A Downloads folder organizer by file type. A script that renames your photos by date. A simple web scraper. A file that generates a formatted markdown blog draft from a template. Real application = real retention.',
        res:[
          {n:'+ Automate Ch.8', u:'https://automatetheboringstuff.com/2e/chapter8/', bk:false},
          {n:'+ Python Requests', u:'https://requests.readthedocs.io', bk:false},
        ]
      },
    ],
    tips:[
      {type:'m4', label:'M4 Tip', text:'Python 3 via Homebrew: <code>brew install python3</code>. Git is pre-installed on macOS — run <code>git --version</code> to confirm. GitHub CLI: <code>brew install gh</code> — lets you manage repos from terminal without a browser.'},
      {type:'affine', label:'AFFiNE', text:'Create a doc called "Git Commands I Know" and build it yourself as you learn each command. Writing your own reference beats memorizing someone else\'s. Include the mental model diagram at the top.'},
      {type:'adhd', label:'ADHD Strategy', text:'Git\'s mental model (not the commands) is the hard part. Spend the first session just drawing the three states on paper: working tree → staging area → repo. Once that clicks visually, every command makes sense. Don\'t rush past this diagram.'},
    ]
  },
  {
    id:'p7', num:'07', color:'#FF6EB3',
    name:'p5.js Deep Dive + Polish + Full Sail Prep',
    weeks:'Week 16', dates:'Aug 20 – Aug 31',
    desc:'Final act. p5.js deep dive because creative coding is where your artistic instinct and your new technical skills meet — and that intersection is exactly what Digital Cinematography is about. Then ship everything, review everything, and walk into Full Sail knowing you earned it.',
    tasks:[
      {
        id:'p7t1', name:'p5.js: build a real generative piece',
        detail:'Create something original — generative art, an interactive visual poem, a particle system, a visual noise piece, a Lissajous curve explorer, a pixel sorter. This goes on your WordPress blog as a standalone post with the p5 sketch embedded. This is Portfolio Piece #1.',
        res:[
          {n:'★ p5js.org', u:'https://p5js.org/', bk:true},
          {n:'★ p5 tutorials', u:'https://p5js.org/tutorials/', bk:true},
          {n:'+ The Coding Train', u:'https://thecodingtrain.com', bk:false},
          {n:'+ OpenProcessing', u:'https://openprocessing.org', bk:false},
          {n:'★ physion.net', u:'https://app.physion.net/#', bk:true},
        ]
      },
      {
        id:'p7t2', name:'Final blog post: Full Sail eve',
        detail:'Write the closing post of your roadmap documentation series. What you built. What surprised you. What was harder than expected. What clicked. What you want to keep learning. Publish the night before you start. Make it honest.',
        res:[
          {n:'★ guerz.link blog', u:'https://guerz.link', bk:false},
        ]
      },
      {
        id:'p7t3', name:'Phase audit: confidence inventory',
        detail:'Go back through all 7 phases. What do you know cold? What feels shaky? Use Claude to do a mock "quiz" on each topic — not a shame spiral, a confidence inventory. Identify your top 3 gaps. Spend 30 minutes each closing them.',
        res:[
          {n:'+ Claude', u:'https://claude.ai', bk:false},
        ]
      },
      {
        id:'p7t4', name:'Full Sail tech requirements check',
        detail:'Verify your M4 MacBook Air meets all requirements for your online Digital Cinematography courses. Check required software (Adobe CC, DaVinci Resolve, etc.), internet speed requirements, any student portals or VPN setups. Set up your student email. Do this early in the week — don\'t leave it for Aug 30.',
        res:[
          {n:'+ Full Sail Tech Reqs', u:'https://www.fullsail.edu/online-programs/requirements', bk:false},
        ]
      },
      {
        id:'p7t5', name:'Day 0: ship it. celebrate it. mean it.',
        detail:'Check the last box on this roadmap. guerz.link is live with real posts. Your GitHub has commits. Your theme is deployed. You have a running Python script. You know Git. You know React. You know WordPress. You came back from Geocities. Don\'t skip this moment. Your brain needs the closing ceremony to commit this as a real win.',
        res:[]
      },
    ],
    tips:[
      {type:'affine', label:'AFFiNE', text:'Export your entire AFFiNE roadmap — the kanban, journals, and mind maps — as a PDF. Screenshot the completed kanban with every card in Done. That\'s your before/after artifact. Keep it forever.'},
      {type:'adhd', label:'ADHD Strategy', text:'Week 16 is the week ADHD brains get distracted by "what\'s next" and don\'t finish what\'s current. Every day this week: one task, one reward, one move forward. No new rabbit holes until all 5 boxes are checked. This is the discipline the whole roadmap was building toward.'},
      {type:'m4', label:'M4 Tip', text:'Adobe Creative Cloud, DaVinci Resolve, and Final Cut Pro all run natively on M4. If Full Sail requires specific Adobe tools, the M4 MacBook Air handles them extremely well. You\'re on a great machine for Digital Cinematography.'},
    ]
  }
];

/* ══════════════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════════════ */
const STORE = 'guerz-roadmap-v2';

function load(){ try{ return JSON.parse(localStorage.getItem(STORE)||'{}'); }catch(e){ return {}; } }
function save(s){ try{ localStorage.setItem(STORE, JSON.stringify(s)); }catch(e){} }

let S = load();

/* ══════════════════════════════════════════════════════════════
   RENDER: fCC TRACKS
══════════════════════════════════════════════════════════════ */
function renderFCC(){
  const el = document.getElementById('fcc-tracks');
  if(!el) return;
  el.innerHTML = FCC_TRACKS.map(t=>`
    <span class="gr-fcc-track${S['fcc_'+t.id]?' done':''}"
          onclick="toggleFCC('${t.id}',this)">${t.label}</span>
  `).join('');
}
function toggleFCC(id, el){
  S['fcc_'+id] = !S['fcc_'+id];
  save(S);
  el.classList.toggle('done', !!S['fcc_'+id]);
}

/* ══════════════════════════════════════════════════════════════
   RENDER: PHASES
══════════════════════════════════════════════════════════════ */
function renderPhases(){
  const root = document.getElementById('phases-root');
  if(!root) return;

  PHASES.forEach((ph, idx) => {
    const div = document.createElement('div');
    div.className = 'gr-phase gr-ph-' + ph.id + (idx === 0 ? ' open' : '');
    div.id = 'phase-'+ph.id;

    // tasks html
    const tasksHtml = ph.tasks.map(t => {
      const done = !!S[t.id];
      const resHtml = t.res.length ? `<div class="gr-resources">${
        t.res.map(r=>`<a class="gr-res" href="${r.u}" target="_blank" rel="noopener"
          onclick="event.stopPropagation()">
          ${r.bk?'<span class="star">★</span>':'<span class="star">+</span>'} ${r.n}
        </a>`).join('')
      }</div>` : '';

      return `<li class="gr-task${done?' done':''}" data-tid="${t.id}" onclick="toggleTask('${t.id}','${ph.id}')">
        <div class="gr-cb">
          ${done?'✓':''}
        </div>
        <div class="gr-task-body">
          <div class="gr-task-name">${t.name}</div>
          <div class="gr-task-detail">${t.detail}</div>
          ${resHtml}
        </div>
      </li>`;
    }).join('');

    // tips html
    const tipsHtml = ph.tips.map(tip=>`
      <div class="gr-tip tip-${tip.type}">
        <b>${tip.label}</b><br>${tip.text}
      </div>
    `).join('');

    div.innerHTML = `
      <div class="gr-phase-hd" onclick="togglePhase('${ph.id}')">
        <div class="gr-phase-hd-ghost">${ph.num}</div>
        <div class="gr-phase-num">${ph.num}</div>
        <div class="gr-phase-info">
          <div class="gr-phase-name">${ph.name}</div>
          <div class="gr-phase-meta">${ph.weeks} &nbsp;·&nbsp; ${ph.dates}</div>
        </div>
        <div class="gr-phase-right">
          <div class="gr-phase-prog">
            <span class="gr-phase-pct" id="pp-${ph.id}">0%</span>
            <div class="gr-phase-track">
              <div class="gr-phase-fill" id="pf-${ph.id}"></div>
            </div>
          </div>
          <div class="gr-chevron">▾</div>
        </div>
      </div>
      <div class="gr-phase-bd">
        <div class="gr-phase-desc">${ph.desc}</div>
        <ul class="gr-tasks">${tasksHtml}</ul>
        <div class="gr-tips">${tipsHtml}</div>
      </div>
    `;
    root.appendChild(div);
  });
}

/* ══════════════════════════════════════════════════════════════
   TOGGLE PHASE
══════════════════════════════════════════════════════════════ */
function togglePhase(id){
  const el = document.getElementById('phase-'+id);
  if(el) el.classList.toggle('open');
}

/* ══════════════════════════════════════════════════════════════
   TOGGLE TASK
══════════════════════════════════════════════════════════════ */
function toggleTask(tid, phid){
  S[tid] = !S[tid];
  save(S);

  const taskEl = document.querySelector(`[data-tid="${tid}"]`);
  const ph = PHASES.find(p=>p.id===phid);
  if(!taskEl || !ph) return;

  taskEl.classList.toggle('done', !!S[tid]);
  const cb = taskEl.querySelector('.gr-cb');
  if(cb){
    cb.textContent = S[tid] ? '✓' : '';
  }
  updateProgress();
}

/* ══════════════════════════════════════════════════════════════
   UPDATE PROGRESS
══════════════════════════════════════════════════════════════ */
function updateProgress(){
  let total=0, done=0;
  PHASES.forEach(ph=>{
    let pt=0, pd=0;
    ph.tasks.forEach(t=>{ total++; pt++; if(S[t.id]){ done++; pd++; } });
    const ppct = pt ? Math.round(pd/pt*100) : 0;
    const pfill = document.getElementById('pf-'+ph.id);
    const ppctEl = document.getElementById('pp-'+ph.id);
    if(pfill) pfill.style.width = ppct+'%';
    if(ppctEl) ppctEl.textContent = ppct+'%';
  });
  const pct = total ? Math.round(done/total*100) : 0;
  const pctEl = document.getElementById('overall-pct');
  const fillEl = document.getElementById('overall-fill');
  const countEl = document.getElementById('overall-count');
  if(pctEl) pctEl.textContent = pct+'%';
  if(fillEl) fillEl.style.width = pct+'%';
  if(countEl) countEl.textContent = done+' / '+total+' tasks';
}

/* ══════════════════════════════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════════════════════════════ */
function updateCountdown(){
  const deadline = new Date('2026-08-31T00:00:00');
  const now = new Date();
  const diff = Math.ceil((deadline - now)/(1000*60*60*24));
  const el = document.getElementById('cd-num');
  if(el) el.textContent = diff > 0 ? diff : '0';
}

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
renderFCC();
renderPhases();
updateProgress();
updateCountdown();
setInterval(updateCountdown, 60000);
