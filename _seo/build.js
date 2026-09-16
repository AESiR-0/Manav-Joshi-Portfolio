#!/usr/bin/env node
/* Builds the city landing pages under /host/<slug>/ and regenerates /sitemap.xml.
   Data: _seo/cities.json.  Run: node _seo/build.js  */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const D = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities.json'), 'utf8'));
const S = D.shared, CITIES = D.cities;
const ORIGIN = 'https://manavjoshi.com';
const strip = s => String(s).replace(/&amp;/g, '&').replace(/&rsquo;/g, '’').replace(/&ldquo;|&rdquo;/g, '"');
const wa = t => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}`;

const CSS = `
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--pad-x:clamp(24px,7vw,80px);--font:'Inter',-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif;
--ink:rgba(255,255,255,.82);--ink-dim:rgba(255,255,255,.55);--label:rgba(255,255,255,.38);--rule:rgba(255,255,255,.08)}
html{scroll-behavior:smooth}
body{background:#080808;color:var(--ink);font-family:var(--font);-webkit-font-smoothing:antialiased;line-height:1.62;font-size:clamp(15px,1.05vw,17px);font-weight:400}
a{color:inherit}
.wrap{max-width:660px;margin:0 auto;padding:clamp(28px,6vw,56px) var(--pad-x) clamp(80px,14vh,140px)}
.crumb{font-size:.72em;letter-spacing:.2em;text-transform:uppercase;color:var(--label);margin-bottom:clamp(48px,11vh,96px);display:flex;gap:10px;flex-wrap:wrap}
.crumb a{text-decoration:none;transition:color .2s}.crumb a:hover{color:#fff}
h1{font-size:clamp(28px,4.4vw,44px);font-weight:600;letter-spacing:-.022em;line-height:1.16;color:#fff;margin-bottom:clamp(18px,3vh,26px)}
.lede{font-size:clamp(16px,1.25vw,19px);color:var(--ink);line-height:1.7}
section{margin-top:clamp(46px,8vh,76px)}
.label{font-size:.66em;letter-spacing:.22em;text-transform:uppercase;color:var(--label);font-weight:500;display:block;margin-bottom:clamp(14px,2.2vh,20px)}
h2{font-size:clamp(18px,2vw,23px);font-weight:600;letter-spacing:-.012em;color:#fff;line-height:1.3;margin-bottom:clamp(12px,2vh,18px)}
ul{list-style:none}
ul.rule li{padding:13px 0;border-top:1px solid var(--rule);color:var(--ink)}
ul.rule li:last-child{border-bottom:1px solid var(--rule)}
.faq{border-top:1px solid var(--rule);padding:clamp(18px,3vh,24px) 0}
.faq:last-of-type{border-bottom:1px solid var(--rule)}
.faq h3{font-size:1em;font-weight:600;color:#fff;margin-bottom:8px;line-height:1.45}
.faq p{color:var(--ink-dim)}
blockquote{border-left:1px solid var(--rule);padding-left:clamp(16px,3vw,24px);margin-bottom:clamp(22px,4vh,32px);color:var(--ink)}
blockquote cite{display:block;margin-top:9px;font-style:normal;font-size:.8em;color:var(--label)}
p+p{margin-top:1em}
.cta{display:inline-block;margin-top:clamp(20px,3.5vh,30px);font-size:.78em;font-weight:500;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:999px;border:1px solid rgba(255,255,255,.85);color:#fff;transition:background .2s,color .2s}
.cta:hover{background:#fff;color:#080808}
.elsewhere{margin-top:clamp(56px,10vh,96px);padding-top:clamp(22px,4vh,30px);border-top:1px solid var(--rule);font-size:.86em;color:var(--ink-dim)}
.elsewhere a{color:var(--ink-dim);text-decoration:none;transition:color .2s}.elsewhere a:hover{color:#fff}
.elsewhere .grp{margin-top:12px}
footer{margin-top:clamp(40px,7vh,64px);font-size:.76em;color:var(--label)}
footer a{text-decoration:none}footer a:hover{color:#fff}
`.replace(/\n\s*/g, '');

function page(c) {
  const sibs = CITIES.filter(x => x.slug !== c.slug);
  const byState = {};
  sibs.forEach(x => (byState[x.state] = byState[x.state] || []).push(x));
  const url = `${ORIGIN}/host/${c.slug}/`;
  const ctaMsg = `Hi Manav, I'm looking for a host in ${c.city}.`;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': `${ORIGIN}/#manav`, name: S.name,
        jobTitle: 'Live Events Host, Anchor & Emcee', url: `${ORIGIN}/host.html`,
        description: 'Live events host and emcee with 250+ shows across 7 Indian states and 3 countries. Hosts in Gujarati, Hindi and English.',
        knowsLanguage: ['Gujarati', 'Hindi', 'English'],
        address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' },
        sameAs: ['https://www.instagram.com/manav.joshii/', 'https://www.linkedin.com/in/manav-joshi/', 'https://www.youtube.com/@manav.joshii', 'https://x.com/manavjoshii']
      },
      {
        '@type': 'ProfessionalService', '@id': `${url}#service`,
        name: `${S.name} — ${strip(c.title)}`, url,
        description: c.metaDesc, image: `${ORIGIN}/assets/host/og-image.jpg`,
        telephone: S.phone, email: S.email, priceRange: '$$$',
        provider: { '@id': `${ORIGIN}/#manav` },
        address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' },
        areaServed: [{ '@type': 'City', name: c.city }, { '@type': 'State', name: c.state }],
        knowsLanguage: ['Gujarati', 'Hindi', 'English'],
        makesOffer: c.occasions.map(o => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${o} in ${c.city}`, serviceType: o, areaServed: { '@type': 'City', name: c.city } } }))
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: c.faqs.map(f => ({ '@type': 'Question', name: strip(f.q), acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } }))
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#crumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Manav Joshi', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Host', item: `${ORIGIN}/host.html` },
          { '@type': 'ListItem', position: 3, name: strip(c.title), item: url }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${c.metaTitle}</title>
<meta name="description" content="${c.metaDesc}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:title" content="${c.metaTitle}">
<meta property="og:description" content="${c.metaDesc}">
<meta property="og:image" content="${ORIGIN}/assets/host/og-image.jpg">
<meta property="og:url" content="${url}">
<meta property="og:type" content="profile">
<meta name="geo.region" content="IN-${c.state === 'Gujarat' ? 'GJ' : c.state === 'Rajasthan' ? 'RJ' : 'MP'}">
<meta name="geo.placename" content="${c.city}">
<meta name="theme-color" content="#080808">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
<style>${CSS}</style>
</head>
<body>
<main class="wrap">
  <nav class="crumb"><a href="/">Manav Joshi</a> <span>/</span> <a href="/host.html">Host</a> <span>/</span> <span>${c.city}</span></nav>

  <h1>${c.title}</h1>
  <p class="lede">${c.lede}</p>
  <a class="cta" href="${wa(ctaMsg)}">Check my dates</a>

  <section>
    <span class="label">The short version</span>
    <ul class="rule">${S.proof.map(p => `<li>${p}</li>`).join('')}</ul>
  </section>

  <section>
    <span class="label">What I host in ${c.city}</span>
    <ul class="rule">${c.occasions.map(o => `<li>${o}</li>`).join('')}</ul>
  </section>

  <section>
    <h2>Languages</h2>
    <p>${c.langs}</p>
  </section>

  <section>
    <h2>${c.home ? 'Getting there' : `Travelling to ${c.city}`}</h2>
    <p>${c.logistics}</p>
  </section>

  <section>
    <span class="label">In their words</span>
    ${S.quotes.map(q => `<blockquote>&ldquo;${q.text}&rdquo;<cite>${q.who}</cite></blockquote>`).join('')}
  </section>

  <section>
    <span class="label">Questions people ask</span>
    ${c.faqs.map(f => `<div class="faq"><h3>${f.q}</h3><p>${f.a}</p></div>`).join('')}
  </section>

  <section>
    <h2>Book a date in ${c.city}</h2>
    <p>Send me the date, the city and what the evening is. I answer the same day.</p>
    <a class="cta" href="${wa(ctaMsg)}">Message on WhatsApp</a>
  </section>

  <div class="elsewhere">
    <span class="label">Also hosting in</span>
    ${Object.keys(byState).map(st => `<div class="grp">${st} &middot; ${byState[st].map(x => `<a href="/host/${x.slug}/">${x.city}</a>`).join(' &middot; ')}</div>`).join('')}
    <div class="grp">By event &middot; <a href="/host/weddings.html">Weddings</a> &middot; <a href="/host/corporate.html">Corporate</a> &middot; <a href="/host/concerts.html">Concerts</a> &middot; <a href="/host/shows.html">On camera</a></div>
  </div>

  <footer>Manav Joshi &middot; Ahmedabad &middot; <a href="mailto:${S.email}">${S.email}</a></footer>
</main>
</body>
</html>`;
}

// --- write city pages ---
CITIES.forEach(c => {
  const dir = path.join(ROOT, 'host', c.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(c));
  console.log('wrote host/' + c.slug + '/index.html');
});


// --- city hub ---
(function(){
  const byState = {};
  CITIES.forEach(x => (byState[x.state] = byState[x.state] || []).push(x));
  const url = `${ORIGIN}/host/cities/`;
  const graph = {'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':url+'#page',url,name:'Cities Manav Joshi hosts in',
     description:'Cities across Gujarat, Rajasthan and Madhya Pradesh where Manav Joshi takes wedding and corporate hosting bookings.',
     about:{'@id':`${ORIGIN}/#manav`}},
    {'@type':'Person','@id':`${ORIGIN}/#manav`,name:S.name,jobTitle:'Live Events Host, Anchor & Emcee',url:`${ORIGIN}/host.html`,
     knowsLanguage:['Gujarati','Hindi','English'],
     address:{'@type':'PostalAddress',addressLocality:'Ahmedabad',addressRegion:'Gujarat',addressCountry:'IN'},
     sameAs:['https://www.instagram.com/manav.joshii/','https://www.linkedin.com/in/manav-joshi/','https://www.youtube.com/@manav.joshii','https://x.com/manavjoshii']},
    {'@type':'ItemList','@id':url+'#list',itemListElement:CITIES.map((c,i)=>({'@type':'ListItem',position:i+1,name:`${strip(c.title)}`,url:`${ORIGIN}/host/${c.slug}/`}))}
  ]};
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Cities I host in — Gujarat, Rajasthan, Madhya Pradesh — Manav Joshi</title>
<meta name="description" content="Wedding anchor and corporate emcee taking bookings across Gujarat, Rajasthan and Madhya Pradesh. Based in Ahmedabad, travels for the full run.">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:title" content="Cities I host in — Manav Joshi">
<meta property="og:description" content="Wedding anchor and corporate emcee across Gujarat, Rajasthan and Madhya Pradesh.">
<meta property="og:image" content="${ORIGIN}/assets/host/og-image.jpg">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#080808">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
<style>${CSS}</style>
</head>
<body>
<main class="wrap">
  <nav class="crumb"><a href="/">Manav Joshi</a> <span>/</span> <a href="/host.html">Host</a> <span>/</span> <span>Cities</span></nav>
  <h1>Where I host</h1>
  <p class="lede">Based in Ahmedabad. Gujarat is home ground and most of the 250+ shows happened here. For Rajasthan and Madhya Pradesh I travel, and for a multi-day wedding I stay for the whole run rather than flying in per function &mdash; travel and stay billed at cost, never marked up.</p>
  <a class="cta" href="${wa("Hi Manav, I'm looking for a host. My event is in [city] on [date].")}">Check my dates</a>
  ${Object.keys(byState).map(st=>`<section><span class="label">${st}</span><ul class="rule">${byState[st].map(c=>`<li><a href="/host/${c.slug}/" style="text-decoration:none">${c.city} &mdash; <span style="color:var(--ink-dim)">${strip(c.title).replace(' in '+c.city,'')}</span></a></li>`).join('')}</ul></section>`).join('')}
  <section>
    <h2>Not on the list?</h2>
    <p>These are the cities I get asked for most. I have performed across 7 Indian states and 3 countries, so if your event is somewhere else, ask &mdash; the answer is usually yes.</p>
    <a class="cta" href="${wa("Hi Manav, do you travel to [city]?")}">Ask about your city</a>
  </section>
  <div class="elsewhere">
    <span class="label">By event</span>
    <div class="grp"><a href="/host/weddings.html">Weddings</a> &middot; <a href="/host/corporate.html">Corporate</a> &middot; <a href="/host/concerts.html">Concerts</a> &middot; <a href="/host/shows.html">On camera</a></div>
  </div>
  <footer>Manav Joshi &middot; Ahmedabad &middot; <a href="mailto:${S.email}">${S.email}</a></footer>
</main>
</body>
</html>`;
  const dir = path.join(ROOT,'host','cities');
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'),html);
  console.log('wrote host/cities/index.html');
})();

// --- sitemap ---
const today = new Date().toISOString().slice(0, 10);
const staticUrls = [
  ['/', '1.0'], ['/host.html', '0.9'],
  ['/host/weddings.html', '0.8'], ['/host/corporate.html', '0.8'],
  ['/host/concerts.html', '0.7'], ['/host/shows.html', '0.7'], ['/host/private.html', '0.6'],
  ['/founder.html', '0.5'], ['/bathroom-singer.html', '0.4'],
  ['/chemistrylab/', '0.5'], ['/smbc/', '0.5'], ['/mafia/', '0.4'], ['/supper/', '0.4'], ['/buildandbreak/', '0.4']
];
const cityUrls = [['/host/cities/','0.8'], ...CITIES.map(c => [`/host/${c.slug}/`, '0.8'])];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...cityUrls].map(([u, p]) =>
  `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
console.log('wrote sitemap.xml (' + (staticUrls.length + cityUrls.length) + ' urls)');
