/**
 * Renders the fictional Bluevane Heating & Cooling demonstration business
 * (mockups/content.mjs) through two completely different visual systems:
 *
 *   before.html — a believable 2004-era contractor site (fixed 760px,
 *                 Times/Arial, crowded two-column layout, buried proof)
 *   after.html  — a premium but believable modern HVAC homepage
 *                 (navy/cream/copper, mobile-first, proof beside the CTA)
 *
 * Same facts on both sides — only the hierarchy and design change.
 * Run: node build.mjs   then   node shoot.mjs
 */
import { writeFileSync } from "node:fs";
import { business as b } from "./content.mjs";

const servicesList = b.services.map((s) => s.name);

/* ---------------------------------------------------------------- */
/* BEFORE — 2004-era site. No viewport meta on purpose: on a phone   */
/* it renders as a shrunken desktop page with tiny navigation.       */
/* ---------------------------------------------------------------- */

const beforeHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>${b.name}, Inc. - ${b.area}'s Heating and Cooling Specialists</title>
<style>
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #cfe0f0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Ctext x='12' y='36' font-size='26' fill='%23b8cfe6'%3E%E2%9D%85%3C/text%3E%3Ctext x='52' y='76' font-size='18' fill='%23c2d6ea'%3E%E2%9D%85%3C/text%3E%3C/svg%3E");
  }
  #page { width: 760px; margin: 14px auto; background: #ffffff; border: 2px solid #4a6a9a; }
  #hdr {
    height: 96px;
    background: linear-gradient(180deg, #dce9f7 0%, #6f9bd1 30%, #24509b 55%, #6f9bd1 82%, #dce9f7 100%);
    background-size: 100% 96px;
    display: flex; align-items: center; padding: 0 14px; gap: 12px;
    border-bottom: 2px solid #1a3d78;
    image-rendering: pixelated;
  }
  #hdrlogo {
    width: 62px; height: 62px; background: #eef4fb; border: 1px solid #9fb6d6;
    text-align: center; line-height: 60px; font-size: 34px;
    text-shadow: 1px 1px 0 #888;
  }
  #hdrlogo .fl { color: #e25822; margin-right: -14px; }
  #hdrlogo .sn { color: #2b6cd4; font-size: 26px; }
  #hdrtitle { font-family: 'Times New Roman', Times, serif; color: #0b2a66; }
  #hdrtitle h1 { margin: 0; font-size: 34px; text-shadow: 1px 1px 0 #ffffff; }
  #hdrtitle .sub { font-size: 17px; font-weight: bold; color: #7a1010; }
  #nav { background: #2c56a4; padding: 4px 6px; text-align: center; border-bottom: 2px solid #16345e; }
  #nav a {
    display: inline-block; background: #d8e4f4; color: #123a7a; text-decoration: none;
    font-size: 11px; font-weight: bold; padding: 4px 14px; margin: 1px;
    border: 2px outset #f0f5fb;
  }
  #cols { display: table; width: 100%; border-collapse: collapse; }
  #main { display: table-cell; width: 63%; padding: 12px 14px; vertical-align: top; font-size: 12px; line-height: 1.45; color: #222; }
  #side { display: table-cell; width: 37%; padding: 12px; vertical-align: top; background: #eef3fa; border-left: 1px solid #b9c9de; font-size: 12px; }
  #main h2 { font-family: 'Times New Roman', Times, serif; color: #14337a; font-size: 19px; margin: 0 0 8px; border-bottom: 1px solid #b9c9de; padding-bottom: 4px; }
  #main h3 { color: #7a1010; font-size: 13px; margin: 14px 0 6px; }
  #techphoto { float: left; margin: 2px 10px 6px 0; border: 1px solid #666; padding: 2px; background: #fff; }
  #techphoto img { width: 148px; height: 111px; object-fit: cover; object-position: 78% 30%; display: block; image-rendering: pixelated; filter: contrast(1.12) saturate(1.25); }
  #techphoto .cap { font-size: 10px; text-align: center; color: #555; padding-top: 2px; }
  #main ul { margin: 6px 0 10px 20px; padding: 0; }
  #main li { margin-bottom: 3px; }
  .estlink { font-size: 11px; }
  a { color: #1a4bbd; }
  .sidebox { background: #ffffff; border: 1px solid #a9bcd8; margin-bottom: 10px; padding: 8px; text-align: center; }
  .sidebox h4 { margin: 0 0 6px; color: #14337a; font-size: 13px; border-bottom: 1px dotted #a9bcd8; padding-bottom: 4px; }
  .bigphone { color: #b00000; font-size: 20px; font-weight: bold; margin: 2px 0; }
  .hrs td { font-size: 11px; padding: 1px 4px; }
  .gallery { margin-top: 14px; border-top: 1px dashed #999; padding-top: 10px; }
  .thumb { display: inline-block; vertical-align: top; margin-right: 10px; }
  .thumb img { width: 120px; height: 90px; object-fit: cover; border: 1px solid #666; image-rendering: pixelated; filter: saturate(1.2); }
  .broken { width: 120px; height: 90px; border: 1px solid #999; background: #f4f4f4; font-size: 10px; color: #666; text-align: center; padding-top: 26px; box-sizing: border-box; }
  #ftr { border-top: 2px solid #2c56a4; background: #e6edf7; font-size: 10px; color: #444; text-align: center; padding: 8px; }
  #ftr a { font-size: 10px; }
</style>
</head>
<body>
<div id="page">
  <div id="hdr">
    <div id="hdrlogo"><span class="fl">&#9650;</span><span class="sn">&#10052;</span></div>
    <div id="hdrtitle">
      <h1>${b.name}, Inc.</h1>
      <div class="sub">Heating &amp; Air Conditioning Specialists</div>
    </div>
  </div>
  <div id="nav">
    <a href="#">HOME</a><a href="#">ABOUT US</a><a href="#">HEATING</a><a href="#">COOLING</a><a href="#">SPECIALS</a><a href="#">CONTACT</a>
  </div>
  <div id="cols">
    <div id="main">
      <h2>Welcome to ${b.name}</h2>
      <div id="techphoto">
        <img src="technician-small.jpg" alt="Our technician">
        <div class="cap">One of our technicians</div>
      </div>
      <p>Welcome to our website. Thank you for visiting ${b.name}, Inc. We are a full
      service heating and air conditioning company proudly serving the ${b.area} area and
      surrounding communities since ${b.since}. We understand that your home comfort is important
      all year round and that is why we offer a complete range of quality heating and cooling
      services for both residential and light commercial customers at affordable prices.</p>
      <p>From the coldest days of winter to the hottest days of summer you can count on
      ${b.shortName} to keep your systems running at peak performance. Our experienced technicians
      are trained on the latest equipment and technology. We service all makes and models and we
      stand behind all of our work. When you need comfort, quality and value, call
      ${b.name}, Inc. today. We look forward to hearing from you soon!</p>
      <h3>Our Services Include:</h3>
      <ul>
        ${servicesList.map((s) => `<li>${s}</li>`).join("\n        ")}
        <li>24 hour emergency service</li>
      </ul>
      <p class="estlink">For a free estimate please call us during regular business hours, send us a fax at
      ${b.fax}, or <a href="mailto:${b.email}">email us for an estimate</a>.</p>
      <div class="gallery">
        <h3 style="margin-top:0">Customer Project Photos</h3>
        <span class="thumb"><img src="technician-small.jpg" alt="install photo"></span>
        <span class="thumb"><div class="broken">cooling_install2.jpg<br>cannot be displayed</div></span>
      </div>
    </div>
    <div id="side">
      <div class="sidebox">
        <div class="bigphone">${b.phone}</div>
        <div style="font-size:11px; font-weight:bold;">24 Hour Emergency Service</div>
      </div>
      <div class="sidebox">
        <h4>Business Hours</h4>
        <table class="hrs" align="center">
          ${b.hours.map(([d, h]) => `<tr><td>${d}</td><td>${h}</td></tr>`).join("\n          ")}
        </table>
      </div>
      <div class="sidebox">
        <h4>${b.credentials.replace("and", "&amp;")}</h4>
        <div style="font-size:11px;">Serving ${b.area}<br>since ${b.since}!</div>
      </div>
      <div class="sidebox">
        <h4>Contact Us</h4>
        <div style="font-size:11px; line-height:1.7;">
          Phone: ${b.phone}<br>
          Fax: ${b.fax}<br>
          Email:<br><a href="mailto:${b.email}">${b.email}</a>
        </div>
      </div>
    </div>
  </div>
  <div id="ftr">
    &copy; ${b.since}-2008 ${b.name}, Inc. All Rights Reserved. &nbsp;|&nbsp; Last updated April 2008<br>
    <a href="#">Home</a> | <a href="#">About Us</a> | <a href="#">Heating</a> | <a href="#">Cooling</a> | <a href="#">Specials</a> | <a href="#">Contact</a><br>
    Best viewed at 1024 x 768 resolution
  </div>
</div>
</body>
</html>`;

/* ---------------------------------------------------------------- */
/* AFTER — modern premium HVAC homepage. Deliberately NOT styled     */
/* like rmvs.org: navy / cream / copper, serif display headline.     */
/* ---------------------------------------------------------------- */

const logoSvg = `<svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#12314e"/><path d="M20 7c3 4.4 6.8 7.4 6.8 12.4 0 4.6-3 7.9-6.8 7.9s-6.8-3.3-6.8-7.9C13.2 14.4 17 11.4 20 7z" fill="#d97b3f"/><g stroke="#e9f2fb" stroke-width="1.6" stroke-linecap="round"><line x1="20" y1="27" x2="20" y2="35"/><line x1="16.6" y1="29" x2="23.4" y2="33"/><line x1="23.4" y1="29" x2="16.6" y2="33"/></g></svg>`;

const check = `<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="none" stroke="#c96f2d" stroke-width="1.6"/><path d="M6 10.2l2.6 2.6L14 7.6" fill="none" stroke="#c96f2d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const svcIcons = [
  `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="#12314e" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.4 2"/></svg>`,
  `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="#12314e" stroke-width="1.7" stroke-linecap="round"><path d="M12 3c2.4 3.4 5.2 5.7 5.2 9.5A5.2 5.2 0 0 1 12 17.7a5.2 5.2 0 0 1-5.2-5.2C6.8 8.7 9.6 6.4 12 3z"/><path d="M12 21v-3.3"/></svg>`,
  `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="#12314e" stroke-width="1.7" stroke-linecap="round"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 12.5h8M8 16h5"/></svg>`,
  `<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="#12314e" stroke-width="1.7" stroke-linecap="round"><path d="M14.5 6.5a4.2 4.2 0 0 0-5.9 5.9L4 17v3h3l4.6-4.6a4.2 4.2 0 0 0 5.9-5.9l-2.6 2.6-2.4-2.4 2.6-2.6z"/></svg>`,
];

const afterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${b.name} — ${b.coreOffer} in ${b.area}</title>
<style>
  :root {
    --navy: #12314e; --navy-deep: #0c2337; --cream: #faf6ef; --white: #ffffff;
    --copper: #c96f2d; --copper-soft: #e8a34a; --ink: #1c2b3a; --ink-soft: #55677a;
    --line: #e5ddd0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Helvetica Neue", Arial, sans-serif; color: var(--ink); background: var(--cream); }
  .wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }
  .serif { font-family: Georgia, "Times New Roman", serif; }

  .util { background: var(--navy-deep); color: #cfdcea; font-size: 13px; }
  .util .wrap { display: flex; justify-content: space-between; align-items: center; height: 36px; }
  .util b { color: #fff; font-weight: 600; }
  .util a { color: var(--copper-soft); text-decoration: none; font-weight: 700; }

  header.site { background: var(--white); border-bottom: 1px solid var(--line); position: sticky; top: 0; }
  header.site .wrap { display: flex; align-items: center; height: 72px; gap: 28px; }
  .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--navy); }
  .brand .nm { font-weight: 700; font-size: 17px; line-height: 1.1; }
  .brand .nm small { display: block; font-weight: 500; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--copper); }
  nav.main { display: flex; gap: 26px; margin-left: auto; }
  nav.main a { color: var(--ink); text-decoration: none; font-size: 15px; font-weight: 500; }
  .hdr-phone { color: var(--navy); font-weight: 700; text-decoration: none; font-size: 15px; white-space: nowrap; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 8px; padding: 13px 22px; font-size: 15px; font-weight: 700; text-decoration: none; min-height: 44px; }
  .btn-copper { background: var(--copper); color: #fff; }
  .btn-outline { border: 1.5px solid var(--navy); color: var(--navy); background: transparent; }
  header.site .btn { padding: 10px 18px; }

  .hero { background: var(--cream); }
  .hero .wrap { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 48px; align-items: center; padding-top: 44px; padding-bottom: 44px; }
  .hero h1 { font-size: 52px; line-height: 1.06; color: var(--navy); letter-spacing: -0.01em; }
  .hero h1 .accent { color: var(--copper); }
  .hero .sub { margin-top: 18px; font-size: 17px; line-height: 1.65; color: var(--ink-soft); max-width: 46ch; }
  .hero .ctas { display: flex; gap: 14px; margin-top: 26px; flex-wrap: wrap; }
  .hero .meta { margin-top: 18px; font-size: 14px; color: var(--ink-soft); display: flex; align-items: center; gap: 8px; }
  .hero-photo { position: relative; }
  .hero-photo img { width: 100%; height: 430px; object-fit: cover; object-position: 62% 40%; border-radius: 14px; display: block; }
  .hero-badge { position: absolute; left: 22px; bottom: -20px; background: var(--navy); color: #fff; border-radius: 10px; padding: 14px 18px; display: flex; gap: 12px; align-items: center; box-shadow: 0 14px 34px -14px rgba(12,35,55,0.55); }
  .hero-badge b { display: block; font-size: 14px; }
  .hero-badge span { font-size: 12px; color: #b9c9da; }

  .trust { background: var(--white); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .trust .wrap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; padding-top: 26px; padding-bottom: 26px; }
  .trust-item { display: flex; gap: 12px; align-items: flex-start; }
  .trust-item b { display: block; font-size: 14.5px; color: var(--navy); margin-bottom: 2px; }
  .trust-item span { font-size: 13px; color: var(--ink-soft); line-height: 1.45; }

  .svcs { padding: 56px 0 64px; }
  .svcs .kicker { text-align: center; font-size: 12.5px; letter-spacing: 0.18em; font-weight: 700; color: var(--copper); text-transform: uppercase; }
  .svcs h2 { text-align: center; font-size: 34px; color: var(--navy); margin-top: 10px; }
  .svc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 34px; }
  .svc-card { background: var(--white); border: 1px solid var(--line); border-radius: 12px; padding: 24px 20px; }
  .svc-card .ic { width: 46px; height: 46px; border-radius: 10px; background: #f2e8d9; display: grid; place-items: center; margin-bottom: 14px; }
  .svc-card h3 { font-size: 17px; color: var(--navy); margin-bottom: 6px; }
  .svc-card p { font-size: 13.5px; line-height: 1.55; color: var(--ink-soft); }

  .proofrow { padding-bottom: 72px; }
  .proofrow .wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .proof-card { background: var(--white); border: 1px solid var(--line); border-radius: 12px; padding: 26px; }
  .proof-card h3 { color: var(--navy); font-size: 18px; margin-bottom: 8px; }
  .proof-card p { color: var(--ink-soft); font-size: 14.5px; line-height: 1.6; }
  .proof-card .lnk { display: inline-block; margin-top: 14px; color: var(--copper); font-weight: 700; text-decoration: none; font-size: 14px; }

  .mobilebar { display: none; }

  @media (max-width: 860px) {
    .wrap { padding: 0 18px; }
    .util .wrap { font-size: 12px; }
    .util .right { display: none; }
    header.site .wrap { height: 62px; gap: 14px; }
    nav.main, .hdr-phone { display: none; }
    header.site .btn { margin-left: auto; }
    .hero .wrap { grid-template-columns: 1fr; gap: 26px; padding-top: 30px; padding-bottom: 34px; }
    .hero h1 { font-size: 38px; }
    .hero .ctas .btn { flex: 1 1 100%; }
    .hero-photo img { height: 300px; }
    .trust .wrap { grid-template-columns: 1fr 1fr; gap: 16px; }
    .svc-grid { grid-template-columns: 1fr 1fr; }
    .proofrow .wrap { grid-template-columns: 1fr; }
    body { padding-bottom: 74px; }
    .mobilebar { display: flex; position: fixed; left: 0; right: 0; bottom: 0; background: var(--navy-deep); padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); gap: 12px; z-index: 50; }
    .mobilebar .btn { flex: 1; }
    .mobilebar .btn-call { background: #fff; color: var(--navy); }
  }
</style>
</head>
<body>
  <div class="util">
    <div class="wrap">
      <div>Same-day appointments · Serving ${b.area}</div>
      <div class="right">Call now: <a href="${b.phoneHref}">${b.phone}</a></div>
    </div>
  </div>

  <header class="site">
    <div class="wrap">
      <a class="brand" href="#">
        ${logoSvg}
        <span class="nm">${b.name}<small>${b.area} · since ${b.since}</small></span>
      </a>
      <nav class="main">
        <a href="#">Services</a><a href="#">Maintenance</a><a href="#">About</a><a href="#">Reviews</a>
      </nav>
      <a class="hdr-phone" href="${b.phoneHref}">${b.phone}</a>
      <a class="btn btn-copper" href="#">Request Service</a>
    </div>
  </header>

  <section class="hero">
    <div class="wrap">
      <div>
        <h1 class="serif">No heat? No AC?<br><span class="accent">Get same-day help.</span></h1>
        <p class="sub">Heating and air-conditioning repair, replacement, and seasonal
        maintenance from a licensed local team serving ${b.area}.</p>
        <div class="ctas">
          <a class="btn btn-copper" href="#">Request service</a>
          <a class="btn btn-outline" href="${b.phoneHref}">Call ${b.phone}</a>
        </div>
        <div class="meta">${check} Same-day appointments available · 24-hour emergency service</div>
      </div>
      <div class="hero-photo">
        <img src="technician.png" alt="Bluevane technician inspecting a residential AC condenser" width="1568" height="882">
        <div class="hero-badge">
          ${logoSvg}
          <span><b>${b.credentials.replace("and", "&amp;")}</b><span>Serving ${b.area} since ${b.since}</span></span>
        </div>
      </div>
    </div>
  </section>

  <section class="trust">
    <div class="wrap">
      <div class="trust-item">${check}<span><b>${b.credentials.replace("and", "&amp;")}</b><span>Background-checked local technicians.</span></span></div>
      <div class="trust-item">${check}<span><b>Upfront estimates</b><span>Honest pricing before any work starts.</span></span></div>
      <div class="trust-item">${check}<span><b>Same-day appointments</b><span>Fast help when you need it most.</span></span></div>
      <div class="trust-item">${check}<span><b>Serving Pittsburgh since ${b.since}</b><span>A local team neighbors rely on.</span></span></div>
    </div>
  </section>

  <section class="svcs">
    <div class="wrap">
      <div class="kicker">Our services</div>
      <h2 class="serif">Complete comfort, one local team.</h2>
      <div class="svc-grid">
        ${b.services
          .map(
            (s, i) => `<div class="svc-card"><div class="ic">${svcIcons[i]}</div><h3>${s.name}</h3><p>${s.blurb}</p></div>`,
          )
          .join("\n        ")}
      </div>
    </div>
  </section>

  <section class="proofrow">
    <div class="wrap">
      <div class="proof-card">
        <h3>Customer reviews</h3>
        <p>Read what homeowners across ${b.area} say about working with ${b.shortName} —
        from emergency repairs to full system installations.</p>
        <a class="lnk" href="#">Read customer reviews →</a>
      </div>
      <div class="proof-card">
        <h3>Our service area</h3>
        <p>We provide heating and cooling service throughout ${b.area} and
        surrounding communities, ${b.hours[0][1]} weekdays with 24-hour emergency coverage.</p>
        <a class="lnk" href="#">Check your neighborhood →</a>
      </div>
    </div>
  </section>

  <div class="mobilebar">
    <a class="btn btn-call" href="${b.phoneHref}">Call ${b.phone}</a>
    <a class="btn btn-copper" href="#">Request service</a>
  </div>
</body>
</html>`;

writeFileSync(new URL("./before.html", import.meta.url), beforeHtml);
writeFileSync(new URL("./after.html", import.meta.url), afterHtml);
console.log("wrote before.html and after.html");
