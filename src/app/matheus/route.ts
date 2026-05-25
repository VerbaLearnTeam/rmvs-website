import { NextResponse } from "next/server";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ePrescience \u00d7 Mateus Mazzaferro</title>
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-icon.png">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
--purple-deep:#2d1b69;
--purple:#6c3ce0;
--purple-light:#9b6dff;
--orange:#f7931e;
--orange-light:#ffb347;
--peach:#ffd4a3;
--cream:#fff8f0;
--dark:#0d0a1a;
--text:#e8e0f0;
--text-muted:#a89bc2;
--grad-main:linear-gradient(135deg,#6c3ce0 0%,#9b6dff 30%,#f7931e 70%,#ffb347 100%);
--grad-card:linear-gradient(145deg,rgba(108,60,224,0.08),rgba(247,147,30,0.05));
}
html{scroll-behavior:smooth;overflow-x:hidden}
body{
font-family:'Plus Jakarta Sans',sans-serif;
background:var(--dark);
color:var(--text);
line-height:1.7;
overflow-x:hidden;
}
::selection{background:var(--purple);color:#fff}

body::after{
content:'';position:fixed;inset:0;z-index:9999;pointer-events:none;
background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
}

.hero{
min-height:100vh;
display:flex;flex-direction:column;align-items:center;justify-content:center;
position:relative;
padding:2rem;
text-align:center;
}
.hero::before{
content:'';position:absolute;top:-20%;left:-10%;
width:120%;height:140%;
background:
radial-gradient(ellipse 600px 400px at 20% 30%,rgba(108,60,224,0.25),transparent),
radial-gradient(ellipse 500px 500px at 80% 60%,rgba(247,147,30,0.15),transparent),
radial-gradient(ellipse 300px 300px at 50% 80%,rgba(155,109,255,0.1),transparent);
animation:heroShift 12s ease-in-out infinite alternate;
z-index:0;
}
@keyframes heroShift{
0%{transform:translate(0,0) scale(1)}
50%{transform:translate(-2%,3%) scale(1.02)}
100%{transform:translate(2%,-2%) scale(1)}
}

.hero-badge{
position:relative;z-index:1;
display:inline-flex;align-items:center;gap:.5rem;
padding:.5rem 1.2rem;
border-radius:100px;
background:rgba(108,60,224,0.15);
border:1px solid rgba(108,60,224,0.3);
font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;
color:var(--purple-light);
margin-bottom:2rem;
animation:fadeUp .8s ease both;
}
.hero-badge .dot{
width:8px;height:8px;border-radius:50%;
background:var(--orange);
animation:pulse 2s ease-in-out infinite;
}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}

.hero h1{
position:relative;z-index:1;
font-family:'DM Serif Display',serif;
font-size:clamp(2.5rem,6vw,5rem);
line-height:1.1;
margin-bottom:1.5rem;
animation:fadeUp .8s ease .1s both;
}
.hero h1 .grad{
background:var(--grad-main);
-webkit-background-clip:text;-webkit-text-fill-color:transparent;
background-clip:text;
}
.hero .subtitle{
position:relative;z-index:1;
font-size:clamp(1rem,2vw,1.25rem);
color:var(--text-muted);
max-width:600px;
animation:fadeUp .8s ease .2s both;
margin-bottom:2.5rem;
}
@keyframes fadeUp{
from{opacity:0;transform:translateY(30px)}
to{opacity:1;transform:translateY(0)}
}
.scroll-hint{
position:relative;z-index:1;
animation:fadeUp .8s ease .4s both;
cursor:pointer;
}
.scroll-hint .arrow{
display:inline-block;
width:24px;height:24px;
border-right:2px solid var(--purple-light);
border-bottom:2px solid var(--purple-light);
transform:rotate(45deg);
animation:bounce 2s ease-in-out infinite;
}
@keyframes bounce{0%,100%{transform:rotate(45deg) translateY(0)}50%{transform:rotate(45deg) translateY(8px)}}

.side-nav{
position:fixed;right:1.5rem;top:50%;transform:translateY(-50%);
z-index:100;display:flex;flex-direction:column;gap:.8rem;
}
.side-nav a{
width:10px;height:10px;border-radius:50%;
background:rgba(155,109,255,0.25);
border:1px solid rgba(155,109,255,0.3);
transition:all .3s;
}
.side-nav a.active,.side-nav a:hover{
background:var(--orange);
border-color:var(--orange);
transform:scale(1.4);
}
@media(max-width:768px){.side-nav{display:none}}

section{
padding:6rem 2rem;
max-width:900px;
margin:0 auto;
position:relative;
}
section h2{
font-family:'DM Serif Display',serif;
font-size:clamp(1.8rem,4vw,2.8rem);
margin-bottom:1rem;
}
section h2 .accent{color:var(--orange)}
.section-label{
display:inline-block;
font-family:'JetBrains Mono',monospace;
font-size:.7rem;letter-spacing:.15em;text-transform:uppercase;
color:var(--purple-light);
margin-bottom:1rem;
padding:.3rem .8rem;
border-radius:4px;
background:rgba(108,60,224,0.1);
border:1px solid rgba(108,60,224,0.2);
}

.story-grid{
display:grid;gap:1.5rem;
margin-top:2rem;
}
.story-card{
padding:2rem;
border-radius:16px;
background:rgba(255,255,255,0.02);
border:1px solid rgba(155,109,255,0.1);
transition:all .4s;
position:relative;
overflow:hidden;
}
.story-card::before{
content:'';position:absolute;top:0;left:0;right:0;height:2px;
background:var(--grad-main);
transform:scaleX(0);transform-origin:left;
transition:transform .5s;
}
.story-card:hover{
border-color:rgba(155,109,255,0.3);
background:rgba(255,255,255,0.04);
transform:translateY(-2px);
}
.story-card:hover::before{transform:scaleX(1)}
.story-card .num{
font-family:'JetBrains Mono',monospace;
font-size:.7rem;
color:var(--orange);
letter-spacing:.1em;
margin-bottom:.8rem;
display:block;
}
.story-card h3{
font-size:1.15rem;
font-weight:600;
margin-bottom:.6rem;
}
.story-card p{
color:var(--text-muted);
font-size:.95rem;
}

.format-demo{
margin-top:3rem;
background:rgba(108,60,224,0.05);
border:1px solid rgba(108,60,224,0.15);
border-radius:20px;
padding:2rem;
overflow:hidden;
}
.format-tabs{
display:flex;flex-wrap:wrap;gap:.5rem;
margin-bottom:1.5rem;
}
.format-tab{
padding:.5rem 1rem;
border-radius:100px;
border:1px solid rgba(155,109,255,0.2);
background:transparent;
color:var(--text-muted);
font-family:'Plus Jakarta Sans',sans-serif;
font-size:.85rem;
cursor:pointer;
transition:all .3s;
}
.format-tab:hover{border-color:var(--purple-light);color:var(--text)}
.format-tab.active{
background:var(--purple);
border-color:var(--purple);
color:#fff;
}
.format-content{
min-height:180px;
padding:1.5rem;
border-radius:12px;
background:rgba(0,0,0,0.3);
position:relative;
animation:contentFade .4s ease;
}
@keyframes contentFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.format-content h4{
font-size:1rem;margin-bottom:.8rem;
color:var(--orange-light);
}
.format-content p,.format-content li{
color:var(--text-muted);font-size:.9rem;
}
.format-content ul{list-style:none;padding:0}
.format-content li{padding:.3rem 0;padding-left:1.2rem;position:relative}
.format-content li::before{
content:'\\2192';position:absolute;left:0;color:var(--purple-light);
}
.conversion-arrow{
display:flex;align-items:center;justify-content:center;
gap:.8rem;
margin:1.5rem 0;
font-size:.8rem;
color:var(--text-muted);
}
.conversion-arrow .line{
flex:1;height:1px;
background:linear-gradient(90deg,transparent,var(--purple-light),transparent);
}
.conversion-arrow .icon{
font-size:1.2rem;
color:var(--orange);
animation:spin 3s linear infinite;
}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

.research-block{
margin-top:2rem;
display:grid;
grid-template-columns:1fr 1fr;
gap:1.5rem;
}
@media(max-width:600px){.research-block{grid-template-columns:1fr}}
.r-card{
padding:1.5rem;
border-radius:14px;
border:1px solid rgba(247,147,30,0.15);
background:rgba(247,147,30,0.03);
transition:all .3s;
}
.r-card:hover{
border-color:rgba(247,147,30,0.35);
transform:translateY(-2px);
}
.r-card .tag{
font-family:'JetBrains Mono',monospace;
font-size:.65rem;
text-transform:uppercase;
letter-spacing:.12em;
color:var(--orange);
margin-bottom:.8rem;
}
.r-card h4{font-size:1rem;margin-bottom:.5rem}
.r-card p{color:var(--text-muted);font-size:.85rem}

.tiers{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:1rem;
margin-top:2rem;
}
@media(max-width:700px){.tiers{grid-template-columns:repeat(2,1fr)}}
.tier{
padding:1.5rem 1rem;
border-radius:14px;
border:1px solid rgba(155,109,255,0.1);
background:rgba(255,255,255,0.015);
text-align:center;
transition:all .4s;
position:relative;
}
.tier:hover{
transform:translateY(-4px);
border-color:rgba(155,109,255,0.3);
}
.tier.featured{
border-color:var(--orange);
background:rgba(247,147,30,0.05);
}
.tier.featured::after{
content:'MOST POPULAR';
position:absolute;top:-10px;left:50%;transform:translateX(-50%);
font-size:.55rem;letter-spacing:.1em;
padding:.2rem .6rem;
background:var(--orange);
color:var(--dark);
border-radius:100px;
font-weight:700;
}
.tier .tier-name{
font-family:'JetBrains Mono',monospace;
font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;
color:var(--purple-light);
margin-bottom:.5rem;
}
.tier .price{
font-family:'DM Serif Display',serif;
font-size:1.8rem;
margin-bottom:.3rem;
}
.tier .price-sub{font-size:.75rem;color:var(--text-muted)}

.collab-options{
margin-top:2rem;
display:flex;flex-direction:column;gap:1rem;
}
.collab-opt{
display:flex;align-items:flex-start;gap:1.2rem;
padding:1.5rem;
border-radius:14px;
border:1px solid rgba(155,109,255,0.1);
background:rgba(255,255,255,0.015);
cursor:pointer;
transition:all .4s;
}
.collab-opt:hover{
border-color:var(--purple-light);
background:rgba(108,60,224,0.06);
transform:translateX(4px);
}
.collab-opt .c-icon{
width:48px;height:48px;min-width:48px;
border-radius:12px;
background:rgba(108,60,224,0.1);
display:flex;align-items:center;justify-content:center;
font-size:1.4rem;
}
.collab-opt h4{font-size:1rem;margin-bottom:.3rem}
.collab-opt p{color:var(--text-muted);font-size:.85rem}

.cta-section{
text-align:center;
padding:6rem 2rem 4rem;
max-width:700px;
margin:0 auto;
}
.cta-section h2{margin-bottom:1rem}
.cta-links{
display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;
margin-top:2rem;
}
.cta-btn{
display:inline-flex;align-items:center;gap:.5rem;
padding:.8rem 1.8rem;
border-radius:100px;
text-decoration:none;
font-size:.9rem;
font-weight:600;
transition:all .3s;
}
.cta-btn.primary{
background:var(--grad-main);
color:#fff;
}
.cta-btn.primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(108,60,224,0.3)}
.cta-btn.secondary{
border:1px solid rgba(155,109,255,0.3);
color:var(--text);
background:rgba(108,60,224,0.05);
}
.cta-btn.secondary:hover{border-color:var(--purple-light);background:rgba(108,60,224,0.1)}
.contact-info{
margin-top:2.5rem;
display:flex;flex-wrap:wrap;justify-content:center;gap:2rem;
font-size:.85rem;
color:var(--text-muted);
}
.contact-info a{color:var(--purple-light);text-decoration:none}
.contact-info a:hover{color:var(--orange)}

.divider{
width:60px;height:2px;
background:var(--grad-main);
margin:0 auto;
border-radius:2px;
}

.modules-ring{
display:flex;flex-wrap:wrap;justify-content:center;gap:.6rem;
margin:2rem 0;
}
.module-pill{
padding:.4rem 1rem;
border-radius:100px;
font-size:.78rem;
border:1px solid rgba(155,109,255,0.15);
color:var(--text-muted);
background:rgba(108,60,224,0.04);
transition:all .3s;
cursor:default;
}
.module-pill:hover{
border-color:var(--orange);
color:var(--orange-light);
transform:scale(1.05);
}

footer{
text-align:center;
padding:3rem 2rem;
font-size:.75rem;
color:rgba(168,155,194,0.5);
border-top:1px solid rgba(155,109,255,0.06);
}
footer a{color:var(--purple-light);text-decoration:none}

.reveal{opacity:0;transform:translateY(40px);transition:all .7s cubic-bezier(.22,1,.36,1)}
.reveal.visible{opacity:1;transform:translateY(0)}
</style>
</head>
<body>

<nav class="side-nav">
<a href="#hero" class="active" title="Top"></a>
<a href="#story" title="The Story"></a>
<a href="#platform" title="Platform"></a>
<a href="#research" title="Research"></a>
<a href="#connect" title="Connect"></a>
</nav>

<header class="hero" id="hero">
<img src="/images/paaru-backflip.png" alt="Paaru mascot" style="width:120px;height:auto;margin-bottom:1.5rem;position:relative;z-index:1;animation:fadeUp .8s ease both" />
<div class="hero-badge"><span class="dot"></span> A personal note for Mateus</div>
<h1>ePrescience <span class="grad">\u00d7 Mateus</span></h1>
<p class="subtitle">Where executive function research meets the learning OS built to solve task initiation \u2014 by students, for everyone.</p>
<div class="scroll-hint" onclick="document.getElementById('intro').scrollIntoView({behavior:'smooth'})">
<span class="arrow"></span>
</div>
</header>

<section id="intro" class="reveal">
<span class="section-label">// hello</span>
<h2>Good evening, <span class="accent">Mateus</span></h2>
<p style="margin-top:1rem;color:var(--text-muted)">
This is <strong style="color:var(--text)">Rory Monaghan</strong> \u2014 my good friend Luca Alvim's mom Isabella connected us. I'm a neuroscience/psychology student at Pitt and the founder of ePrescience. After reading about your work, I realized there's a deep overlap between what you're researching and what I've spent the last year of my life building. I put this page together so you could explore it at your own pace.
</p>
</section>

<div class="divider reveal"></div>

<section id="story" class="reveal">
<span class="section-label">// origin</span>
<h2>Why I <span class="accent">built</span> this</h2>

<div class="story-grid">
<div class="story-card reveal">
<span class="num">01 \u2014 THE PROBLEM</span>
<h3>Learning \u2260 Ability. Learning = Access to the Right Format.</h3>
<p>I was forced by my struggles with ADHD and dyslexia throughout my life to come up with creative solutions that allowed me to achieve what I knew, deep down, I was capable of. I learned to convert whatever a professor or Canvas page gave me \u2014 PowerPoint slides, dense text, handwritten notes, long lectures \u2014 into audiobooks, flashcards, quizzes, visual artifacts, whatever worked for my brain in that moment.</p>
</div>

<div class="story-card reveal">
<span class="num">02 \u2014 THE FRICTION</span>
<h3>5 Apps, 12 Steps, Zero Time Saved</h3>
<p>But I began accumulating subscriptions and wasting massive amounts of time toggling between platforms \u2014 destroying the time I'd gained. A good example: uploading a PowerPoint to ChatGPT, pasting into Google Docs, then exporting to Speechify \u2014 all just to make an audiobook for my walk to class. The overhead of format conversion was eating the benefit.</p>
</div>

<div class="story-card reveal">
<span class="num">03 \u2014 THE DECISION</span>
<h3>One Late Night in the Library</h3>
<p>I decided to dedicate nearly everything I had \u2014 time, money, every ounce of energy \u2014 to building something that would let me and others like me complete these bi-directional conversions within a single, seamlessly smooth learning operating system. Not to replace how students learn, but to ruthlessly eliminate every barrier to <em>beginning</em>.</p>
</div>
</div>
</section>

<section id="platform" class="reveal">
<span class="section-label">// the platform</span>
<h2>What ePrescience <span class="accent">does</span></h2>

<p style="color:var(--text-muted);margin-bottom:1.5rem">Wherever a bi-directional format conversion is possible, the user curates their own learning experience to whatever is optimal for that moment. An audiobook for walking to class. Handwritten notes converted to a quiz. A professor's intimidating problem set broken down into accessible flashcards that build base-level confidence before tackling the real thing.</p>

<div class="modules-ring">
<span class="module-pill">\ud83d\udcdd Notes & Ink</span>
<span class="module-pill">\ud83c\udccf Flashcards</span>
<span class="module-pill">\ud83c\udfa7 Audiobooks</span>
<span class="module-pill">\ud83e\uddee Problem Solver</span>
<span class="module-pill">\ud83c\udfae Learning Games</span>
<span class="module-pill">\ud83d\udcca Quizzes</span>
<span class="module-pill">\ud83d\udd25 Streaks</span>
<span class="module-pill">\ud83c\udfb5 Soundscapes</span>
<span class="module-pill">\ud83d\udcc5 Planners</span>
<span class="module-pill">\ud83d\udc3e Paaru AI Tutor</span>
<span class="module-pill">\ud83d\udcdc Transcripts</span>
<span class="module-pill">\ud83e\uddd8 Wellness</span>
</div>

<div class="format-demo reveal">
<p style="font-size:.85rem;color:var(--text-muted);margin-bottom:1rem">\u2193 <strong style="color:var(--text)">Tap a format to see how conversion works</strong></p>
<div class="format-tabs" id="formatTabs">
<button class="format-tab active" data-tab="lecture">\ud83d\udcc4 Lecture Slides</button>
<button class="format-tab" data-tab="audio">\ud83c\udfa7 Audiobook</button>
<button class="format-tab" data-tab="flash">\ud83c\udccf Flashcards</button>
<button class="format-tab" data-tab="quiz">\ud83d\udcca Quiz</button>
<button class="format-tab" data-tab="notes">\u270d\ufe0f Notes</button>
</div>
<div class="format-content" id="formatContent">
<h4>Professor's Lecture Slides \u2192 Everything</h4>
<p>Import a .pptx, PDF, or scan. ePrescience extracts the content and makes it available as any other format \u2014 one tap. No copy-pasting across five apps.</p>
<div class="conversion-arrow">
<span class="line"></span>
<span class="icon">\u27f3</span>
<span class="line"></span>
</div>
<ul>
<li>Slides \u2192 Audiobook for your commute</li>
<li>Slides \u2192 Flashcards with spaced repetition</li>
<li>Slides \u2192 Interactive quiz for active recall</li>
<li>Slides \u2192 Annotatable notes in your own hand</li>
</ul>
</div>
</div>

<div style="margin-top:3rem" class="reveal">
<span class="section-label">// pricing philosophy</span>
<h2 style="font-size:clamp(1.4rem,3vw,2rem)">Access > <span class="accent">Margins</span></h2>
<p style="color:var(--text-muted);margin:1rem 0">Anyone and everyone should be able to use this platform \u2014 a chance I wish I'd had much sooner.</p>
<div class="tiers">
<div class="tier">
<div class="tier-name">Free</div>
<div class="price">$0</div>
<div class="price-sub">Ad-supported</div>
</div>
<div class="tier">
<div class="tier-name">Good</div>
<div class="price">$4.99</div>
<div class="price-sub">/month</div>
</div>
<div class="tier featured">
<div class="tier-name">Better</div>
<div class="price">$9.99</div>
<div class="price-sub">/month</div>
</div>
<div class="tier">
<div class="tier-name">Best</div>
<div class="price">$14.99</div>
<div class="price-sub">/month</div>
</div>
</div>
</div>
</section>

<div class="divider reveal"></div>

<section id="research" class="reveal">
<span class="section-label">// why you</span>
<h2>Your Research <span class="accent">\u00d7 Our Mission</span></h2>
<p style="color:var(--text-muted);margin-bottom:.5rem">After reading about your work on EFFORT and executive function measurement, the overlap felt too specific to be coincidence. Here's what I see:</p>

<div class="research-block">
<div class="r-card reveal">
<div class="tag">Your Research</div>
<h4>EFFORT & EF Measurement</h4>
<p>Culturally adaptable, strength-based assessment of executive function behaviors \u2014 cognitive flexibility, working memory, inhibitory control \u2014 across diverse populations.</p>
</div>
<div class="r-card reveal">
<div class="tag">Our Platform</div>
<h4>Task Initiation as Design</h4>
<p>ePrescience operationalizes the same constructs: reducing cognitive load at the point of task initiation, supporting flexible format-switching, and building confidence before complexity.</p>
</div>
<div class="r-card reveal">
<div class="tag">Your Focus</div>
<h4>Underserved Communities</h4>
<p>Your work in the Brazilian Sert\u00e3o and with GEFI centers equity \u2014 ensuring measurement and intervention reach the children who need it most.</p>
</div>
<div class="r-card reveal">
<div class="tag">Our Commitment</div>
<h4>Access for Everyone</h4>
<p>A free tier, tiered pricing from $4.99, mental health integration, and a platform built by students around the world \u2014 because learning tools shouldn't have income prerequisites.</p>
</div>
</div>

<div style="margin-top:3rem" class="reveal">
<h3 style="margin-bottom:1rem">What collaboration could look like</h3>
<div class="collab-options">
<div class="collab-opt">
<div class="c-icon">\ud83d\udd2c</div>
<div>
<h4>Research Validation</h4>
<p>Ground ePrescience's learning psychology claims in published developmental science. Help us ensure our design decisions are backed by the literature your lab produces.</p>
</div>
</div>
<div class="collab-opt">
<div class="c-icon">\ud83d\udcca</div>
<div>
<h4>Research Platform</h4>
<p>Use ePrescience as a tool to study how format flexibility affects learning outcomes and task initiation across populations \u2014 publishable work for you, validation for us.</p>
</div>
</div>
<div class="collab-opt">
<div class="c-icon">\ud83d\udca1</div>
<div>
<h4>Trading Ideas</h4>
<p>No formal commitment needed. Just two people who care about how learning actually works, sharing perspectives from different angles \u2014 a builder and a researcher.</p>
</div>
</div>
</div>
</div>
</section>

<div class="divider reveal"></div>

<section class="cta-section" id="connect">
<span class="section-label reveal">// let's talk</span>
<h2 class="reveal">I'd love to <span class="accent">connect</span></h2>
<p class="reveal" style="color:var(--text-muted)">I'd be delighted to have a phone call or video chat at your convenience. No pressure on format \u2014 just genuinely think there's something worth exploring here.</p>

<div class="cta-links reveal">
<a href="https://apps.apple.com/us/app/eprescience/id6748284897" target="_blank" class="cta-btn primary">\uf8ff App Store</a>
<a href="https://app.epresciencedev.io/home" target="_blank" class="cta-btn secondary">\ud83c\udf10 Web App</a>
<a href="https://www.rmvs.org/" target="_blank" class="cta-btn secondary">\ud83c\udfd7\ufe0f RMVS</a>
<a href="https://www.linkedin.com/in/rory-monaghan-300439260/" target="_blank" class="cta-btn secondary">\ud83d\udcbc LinkedIn</a>
</div>

<div class="contact-info reveal">
<span>\ud83d\udcde <a href="tel:4127895708">412-789-5708</a></span>
<span>\u2709\ufe0f <a href="mailto:info@eprescience.com">info@eprescience.com</a></span>
<span>Built with care in Pittsburgh, PA</span>
</div>
</section>

<footer>
<p>Made for Mateus by Rory Monaghan \u00b7 <a href="https://eprescience.com">eprescience.com</a> \u00b7 2026</p>
</footer>

<script>
const tabs=document.querySelectorAll('.format-tab');
const content=document.getElementById('formatContent');
const data={
lecture:{
title:"Professor's Lecture Slides \\u2192 Everything",
desc:'Import a .pptx, PDF, or scan. ePrescience extracts the content and makes it available as any other format \\u2014 one tap.',
items:['Slides \\u2192 Audiobook for your commute','Slides \\u2192 Flashcards with spaced repetition','Slides \\u2192 Interactive quiz for active recall','Slides \\u2192 Annotatable notes in your own hand']
},
audio:{
title:'Audiobook \\u2192 Back to Study Materials',
desc:'Listened to something interesting on your walk? Pull it back into active study formats when you sit down.',
items:['Audiobook \\u2192 Key-concept flashcards','Audiobook \\u2192 Comprehension quiz','Audiobook \\u2192 Highlighted notes with timestamps','Audiobook \\u2192 Problem sets from the concepts covered']
},
flash:{
title:'Flashcards \\u2192 Deeper Engagement',
desc:'Cards you keep getting wrong? Convert them into formats that force deeper processing.',
items:['Weak cards \\u2192 Targeted quiz with explanations','Card set \\u2192 Audio review for passive reinforcement','Cards \\u2192 Expanded notes with context','Cards \\u2192 Gamified challenge with streaks']
},
quiz:{
title:'Quiz Results \\u2192 Targeted Review',
desc:'Your quiz performance reveals gaps. ePrescience routes you to the exact material, in the format that works.',
items:['Missed questions \\u2192 Focused flashcard deck','Low-score topics \\u2192 Audiobook deep-dive','Quiz analytics \\u2192 Updated study plan','Results \\u2192 Handwriting practice on weak concepts']
},
notes:{
title:"Handwritten Notes \\u2192 Active Recall",
desc:"Your handwritten iPad notes aren't locked in a notebook. They become the source for everything else.",
items:['Notes \\u2192 Auto-generated flashcards','Notes \\u2192 Quiz from your own summaries','Notes \\u2192 Audiobook narration of your writing','Notes \\u2192 Shareable study guide for classmates']
}
};
tabs.forEach(tab=>{
tab.addEventListener('click',()=>{
tabs.forEach(t=>t.classList.remove('active'));
tab.classList.add('active');
const d=data[tab.dataset.tab];
content.style.animation='none';
content.offsetHeight;
content.style.animation='contentFade .4s ease';
content.innerHTML=
'<h4>'+d.title+'</h4>'+
'<p>'+d.desc+'</p>'+
'<div class="conversion-arrow"><span class="line"></span><span class="icon">\\u27f3</span><span class="line"></span></div>'+
'<ul>'+d.items.map(i=>'<li>'+i+'</li>').join('')+'</ul>';
});
});

const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver((entries)=>{
entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
reveals.forEach(r=>obs.observe(r));

const navLinks=document.querySelectorAll('.side-nav a');
const secObs=new IntersectionObserver((entries)=>{
entries.forEach(e=>{
if(e.isIntersecting){
const id=e.target.id;
navLinks.forEach(l=>{
l.classList.toggle('active',l.getAttribute('href')==='#'+id);
});
}
});
},{threshold:0.3});
document.querySelectorAll('[id]').forEach(s=>secObs.observe(s));
</script>
</body>
</html>`;

export async function GET() {
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
