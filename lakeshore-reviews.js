/* Lakeshore Team — Reviews section injector
   Host this ONE file publicly (e.g. GitHub Pages), then add the tiny loader
   (see instructions) to Lofty → Settings → Tools → Custom Style & Script → Script.
   It injects the dark/maroon reviews section on the homepage only, once.
   To edit reviews later: change the html below, re-upload, done. */
(function () {
  try {
    var p = (location.pathname || "").replace(/\/+$/, "");
    if (p !== "") return;                 // homepage only
  } catch (e) {}
  if (document.getElementById("lst-rv-root")) return;   // run once

  var css =
"@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');" +
".lst-rv{--bg:#191b1a;--card-a:#331715;--card-b:#1c0b0a;--text:#f3efe7;--muted:#b0a99d;--gold:#D8B877;--gold-soft:#c9a86a;--gold-deep:#8A6A2E;--deep:#5D0709;--olive:#7D6E4E;--rose:#e0a6a0;--line:rgba(216,184,119,.16);background:var(--bg);padding:88px 24px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:var(--text);box-sizing:border-box}" +
".lst-rv *{box-sizing:border-box}" +
".lst-rv__head{max-width:780px;margin:0 auto 54px;text-align:center}" +
".lst-rv__eyebrow{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-soft);margin-bottom:14px}" +
".lst-rv__title{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(28px,4vw,46px);line-height:1.12;margin:0 0 14px;color:var(--text)}" +
".lst-rv__sub{font-size:17px;line-height:1.6;color:var(--muted);margin:0}" +
".lst-rv__grid{max-width:1200px;margin:0 auto;display:flex;gap:22px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding:6px 2px 22px;align-items:flex-start;scrollbar-width:thin;scrollbar-color:rgba(216,184,119,.5) transparent}" +
".lst-rv__grid::-webkit-scrollbar{height:8px}.lst-rv__grid::-webkit-scrollbar-thumb{background:rgba(216,184,119,.5);border-radius:4px}.lst-rv__grid::-webkit-scrollbar-track{background:rgba(255,255,255,.06);border-radius:4px}" +
"@media (max-width:640px){.lst-rv{padding:64px 18px}.lst-rv__card{flex-basis:84vw!important}}" +
".lst-rv__card{flex:0 0 340px;display:flex;flex-direction:column;scroll-snap-align:start;background:linear-gradient(155deg,var(--card-a),var(--card-b));border:1px solid var(--line);border-radius:18px;padding:28px 26px 24px;margin:0;position:relative;box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 22px 34px -16px rgba(0,0,0,.75),0 8px 16px -8px rgba(0,0,0,.5);transition:transform .28s cubic-bezier(.2,.7,.2,1),box-shadow .28s ease,border-color .28s ease}" +
".lst-rv__card:hover{transform:translateY(-7px);border-color:rgba(216,184,119,.42);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 34px 52px -18px rgba(0,0,0,.85),0 12px 22px -8px rgba(0,0,0,.6)}" +
".lst-rv__card::before{content:'\\201C';position:absolute;top:6px;right:18px;font-family:'Playfair Display',Georgia,serif;font-size:66px;line-height:1;color:var(--gold);opacity:.14;pointer-events:none}" +
".lst-rv__stars{display:block;height:19px;width:107px;margin:0 0 14px;font-size:0;line-height:0;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.98 6.1 20.16l1.13-6.58L2.45 8.94l6.6-.96z' fill='%23D8B877'/%3E%3C/svg%3E\") left center repeat-x;background-size:21.4px 19px}" +
".lst-rv__quote{margin:0 0 18px;font-size:15.5px;line-height:1.64;color:#e7e2d7}" +
".lst-rv__person{display:flex;align-items:center;gap:12px;margin-top:auto}" +
".lst-rv__avatar{flex:0 0 auto;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;background:rgba(216,184,119,.15);color:#D8B877;border:1px solid rgba(216,184,119,.4);box-shadow:0 2px 6px rgba(0,0,0,.4)}" +
".lst-rv__meta{display:flex;flex-direction:column;line-height:1.35}" +
".lst-rv__name{font-weight:600;font-size:14.5px;color:var(--text)}" +
".lst-rv__loc{font-size:12.5px;color:var(--muted)}" +
".lst-rv__src{font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--gold-soft);font-weight:600;margin-top:1px}" +
".lst-rv__tag{display:inline-block;margin:1px 0;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--rose)}" +
".lst-rv__rated{font-size:13px;color:var(--muted);margin:0 0 10px}" +
".lst-rv__chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}" +
".lst-rv__chip{font-size:12px;font-weight:500;color:var(--gold);background:rgba(216,184,119,.10);border:1px solid rgba(216,184,119,.30);border-radius:999px;padding:5px 11px}" +
".lst-rv__foot{max-width:760px;margin:48px auto 0;text-align:center}" +
".lst-rv__foot-stars{display:block;height:24px;width:140px;margin:0 auto;font-size:0;line-height:0;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.98 6.1 20.16l1.13-6.58L2.45 8.94l6.6-.96z' fill='%23D8B877'/%3E%3C/svg%3E\") left center repeat-x;background-size:28px 24px}" +
".lst-rv__foot-text{font-size:15px;color:var(--muted);margin:10px 0 22px}" +
".lst-rv__cta{display:inline-block;background:var(--gold);color:#201c19;font-weight:600;font-size:15px;text-decoration:none;padding:14px 30px;border-radius:11px;box-shadow:0 10px 22px -8px rgba(216,184,119,.5);transition:background .2s ease,transform .2s ease,box-shadow .2s ease}" +
".lst-rv__cta:hover{background:#e6c98c;transform:translateY(-2px);box-shadow:0 16px 28px -8px rgba(216,184,119,.6)}" +
"#lst-rv-root.lst-rv{background:#191b1a!important}";

  var card = function (stars, body, avatarText, name, extra) {
    return '<figure class="lst-rv__card"><div class="lst-rv__stars" aria-label="5 out of 5 stars"></div>' +
      body +
      '<figcaption class="lst-rv__person"><span class="lst-rv__avatar">' + avatarText + '</span>' +
      '<span class="lst-rv__meta"><span class="lst-rv__name">' + name + '</span>' + (extra || '') +
      '</span></figcaption></figure>';
  };
  var q = function (t) { return '<blockquote class="lst-rv__quote">' + t + '</blockquote>'; };
  var loc = function (t) { return '<span class="lst-rv__loc">' + t + '</span>'; };
  var src = function (t) { return '<span class="lst-rv__src">' + t + '</span>'; };
  var chips = function (arr) {
    return '<p class="lst-rv__rated">Rated 5 stars for:</p><div class="lst-rv__chips">' +
      arr.map(function (c) { return '<span class="lst-rv__chip">' + c + '</span>'; }).join('') + '</div>';
  };
  var P = ['Responsiveness', 'Quality', 'Professionalism', 'Value'];

  var html =
    '<div class="lst-rv__head"><span class="lst-rv__eyebrow">5-Star Client Reviews</span>' +
    '<h2 class="lst-rv__title">What Acadiana Clients Say</h2>' +
    '<p class="lst-rv__sub">Real words from buyers and sellers across Lafayette, Lake Charles &amp; Southwest Louisiana.</p></div>' +
    '<div class="lst-rv__grid">' +
    card('', q("If you are looking for your \"run of the mill\" agent, this isn't it. If you want a normal amount of support, find someone else. But if you are looking for a truly awesome agent… lemme tell you about Tyler. We saw it all. Seriously. All of it. Confused seller agents? Inspections full of foundation issues? Dragons? Entitled and delusional sellers? Wicked over-pricing? Aliens? We saw almost all of those things. If I was Tyler, I would have walked away about a dozen times. But he didn't. He stuck with us and walked us through a house-buying experience so weird it could seriously be a movie. In all seriousness… we didn't see dragons. But I'm pretty sure Tyler would have had an answer for that too. Would recommend."), 'KN', 'Kyle &amp; Kirin Nelson', loc('Iowa, LA') + src('RateMyAgent')) +
    card('', q("Tyler has made the entire process of selling our home simple. I am a very OCD person and feel like I need to be on top of everything at all times, but it never failed — Tyler was always one step ahead of me. That eased my anxiety with the sale and took a huge weight off my shoulders. He is punctual, professional, and on top of everything. Tyler makes you feel more like family than just another client. No matter how many questions I asked daily (which was a lot), he always answered them and explained every detail. He made me feel as if I was the only person he was working with, when I know he had many other listings going. I would recommend him to anyone looking into selling or buying a home!"), 'KB', 'Kelsi Brooks', src('Google')) +
    card('', q("I am a Realtor and worked with Tyler Polk on a transaction in which he represented the buyers and I represented the sellers — so I'm familiar with his work in a different way than his clients are, and that's why this review should matter. As a seasoned agent, my opinion is that Tyler represented his client's interests first and foremost, and did so professionally. He was always responsive and focused on finding the best way to solve problems in a fair, client-focused manner. If I were a buyer or seller, I would not hesitate to hire Tyler as my agent."), 'SR', 'Sophia Rasile', '<span class="lst-rv__tag">Fellow Realtor®</span>' + src('Google')) +
    card('', q("When we first met Tyler, he didn't try to hide any details just to sell a house. He was very straightforward and we felt like he had our best interest in mind. He looked at as many houses as we wanted to see — some even two or three times — to make sure we had a good assessment. From now on, if anyone asks if I know a realtor, I am pointing them straight to Tyler."), 'DC', 'Derrek Comeaux', loc('Lake Charles, LA') + src('RateMyAgent')) +
    card('', q("Tyler is an amazing realtor, but more important, I now consider him a friend. He has an amazing personality and attitude. Even when I wanted to wash my hands of selling, he encouraged me that it was gonna work out. I will never use another realtor. Simply put — give Tyler a chance, he is amazing."), 'BB', 'Billy Wayne Beaudeaux', loc('Starks, LA') + src('Realtor.com')) +
    card('', q("Tyler was more than helpful in helping us purchase our home. He was extremely honest, upfront, and found the time to show us the homes we wanted to see around our busy work schedules. He was extremely communicative and easy to reach to answer any of our questions at all times. Tyler made the nightmare we had to endure with the seller a lot more enjoyable. Thank you for everything, Tyler."), 'CA', 'Craig Antilla', loc('Lake Charles, LA') + src('Realtor.com')) +
    card('', q("Was an advocate for me and my family — very responsive even through a difficult sale. He always answered my questions and dealt with my concerns no matter what time of day. He saw it all the way through with us!!! Highly recommend Tyler."), 'M', 'Michelle', loc('Sulphur, LA') + src('Realtor.com')) +
    card('', q("My family absolutely loved working with Tyler. He is clearly very passionate about his career as a realtor and it shows in the way he treats his clients. We highly recommend Tyler Polk for any buying or selling of your property! He is fun to work with, very laid back, and easy to communicate with."), 'MT', 'Malori Thibodeaux', loc('Sulphur, LA') + src('Realtor.com')) +
    card('', q("Tyler was more than an agent during my search to purchase my first home. He was an educator, a friend, and most of all led the way to the best deal for me!! Thanks again, Tyler!!!"), 'DB', 'Darrell Bowie', loc('Lake Charles, LA') + src('Realtor.com')) +
    card('', q("Tyler is very consistent with his work. He is determined to help you get what you're looking for and makes sure you're satisfied before the deal is sealed. Thank you for being that caring person in helping us find a \"Forever Home.\" You are awesome — and may God bless you."), 'KP', 'Karen Polk', src('Google')) +
    card('', q("10 out of 10 — recommend him to anyone. Super helpful and can answer any question you have. He's the best of the best, hands down."), 'P', 'Premo04', src('Google')) +
    card('', q("Very good communication led to a very simple and straightforward buying process."), 'GB', 'Grant Bailey', loc('Lake Charles, LA') + src('Realtor.com')) +
    card('', q("Tyler did an amazing job helping us purchase our home. Highly recommended."), 'RD', 'Ricky Dinger', loc('Iowa, LA') + src('Realtor.com')) +
    card('', q("Always available to answer any question or concern."), 'TK', 'Terry Kershaw', src('Google')) +
    card('', q("He's your guy!! Enough said!!"), 'ML', 'McKenna LeJeune', src('Google')) +
    card('', chips(P), 'RD', 'Randall Desormeaux', src('Google')) +
    card('', chips(P), 'HD', 'Haley Desormeaux', src('Google')) +
    card('', chips(P), 'JC', 'James Custer', src('Google')) +
    '</div>' +
    '<div class="lst-rv__foot"><div class="lst-rv__foot-stars" aria-hidden="true"></div>' +
    '<p class="lst-rv__foot-text">Consistently 5 stars across Google, Zillow, RateMyAgent &amp; Realtor.com.</p>' +
    '<a class="lst-rv__cta" href="/evaluation">Start your move with Tyler</a></div>';

  function run() {
    if (document.getElementById("lst-rv-root")) return;
    var st = document.createElement("style");
    st.id = "lst-rv-style";
    st.textContent = css;
    document.head.appendChild(st);

    var sec = document.createElement("section");
    sec.className = "lst-rv";
    sec.id = "lst-rv-root";
    sec.innerHTML = html;

    function findByText(re, maxLen) {
      var all = document.querySelectorAll("h1,h2,h3,a,button,p,span,div");
      for (var i = 0; i < all.length; i++) {
        var t = (all[i].textContent || "").trim();
        if (t && t.length < (maxLen || 80) && re.test(t)) return all[i];
      }
      return null;
    }
    function bigAncestor(el) {
      var n = el, w = document.documentElement.clientWidth * 0.9;
      for (var i = 0; i < 9 && n && n.parentElement; i++) {
        n = n.parentElement;
        if (n.getBoundingClientRect().width >= w) return n;
      }
      return el;
    }

    var done = false;
    var lux = findByText(/Luxury Real Estate in Acadiana/i, 80);
    if (lux) { var ls = bigAncestor(lux); ls.parentNode.insertBefore(sec, ls); done = true; }
    if (!done) {
      var ba = findByText(/Book Appointment/i, 40);
      if (ba) { var bs = bigAncestor(ba); bs.parentNode.insertBefore(sec, bs.nextSibling); done = true; }
    }
    if (!done) {
      var f = document.querySelector("footer");
      if (f) { f.parentNode.insertBefore(sec, f); done = true; }
    }
    if (!done) document.body.appendChild(sec);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(run, 400); });
  } else {
    setTimeout(run, 400);
  }
})();


/* =====================================================================
   Three-Doors CTA — photos behind, maroon tiles floating, dark scrim.
   Inserts ABOVE the reviews section, on the homepage only, once.
   ===================================================================== */
(function () {
  try { if ((location.pathname || "").replace(/\/+$/, "") !== "") return; } catch (e) {}

  var IMG = {
    sell: "https://d8j0ntlcm91z4.cloudfront.net/user_3AADhVAwuk2jsx8PvxfzLHVDquj/hf_20260608_215136_bdaffbeb-7df2-4f0e-ba07-b40b4688282e.png",
    buy:  "https://d8j0ntlcm91z4.cloudfront.net/user_3AADhVAwuk2jsx8PvxfzLHVDquj/hf_20260608_215118_1ea66de9-7bfe-40df-9a40-b4c23f6bc3a5.png",
    cash: "https://d8j0ntlcm91z4.cloudfront.net/user_3AADhVAwuk2jsx8PvxfzLHVDquj/hf_20260608_215120_49a54846-9445-4d0b-98cc-060f67c2c136.png"
  };

  var css =
"@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');" +
".lst-cta{box-sizing:border-box;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif}" +
".lst-cta *{box-sizing:border-box}" +
".lst-cta__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}" +
"@media (max-width:820px){.lst-cta__grid{grid-template-columns:1fr}}" +
".lst-cta__panel{position:relative;min-height:560px;display:flex;align-items:flex-end;background-size:cover;background-position:center;overflow:hidden}" +
"@media (max-width:820px){.lst-cta__panel{min-height:460px}}" +
".lst-cta__panel::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,16,15,.30),rgba(15,16,15,.74))}" +
".lst-cta__tile{position:relative;z-index:2;margin:28px;padding:30px 26px 26px;border-radius:16px;width:100%;display:flex;flex-direction:column;background:linear-gradient(155deg,#331715,#1c0b0a);border:1px solid rgba(216,184,119,.22);box-shadow:0 26px 44px -16px rgba(0,0,0,.78);transition:transform .25s ease,box-shadow .25s ease}" +
".lst-cta__panel:hover .lst-cta__tile{transform:translateY(-8px);box-shadow:0 40px 60px -18px rgba(0,0,0,.9)}" +
".lst-cta__icon{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;background:rgba(216,184,119,.15);color:#D8B877;border:1px solid rgba(216,184,119,.35)}" +
".lst-cta__icon svg{width:24px;height:24px}" +
".lst-cta__ch{font-family:'Playfair Display',Georgia,serif;font-size:23px;font-weight:600;margin:0 0 9px;color:#f3efe7}" +
".lst-cta__ct{font-size:14.5px;line-height:1.55;margin:0 0 22px;color:#cdc6ba}" +
".lst-cta__btn{margin-top:auto;display:inline-block;text-align:center;font-weight:600;font-size:14.5px;padding:13px 18px;border-radius:10px;text-decoration:none;background:#D8B877;color:#201c19}" +
".lst-cta__btn:hover{background:#e6c98c}";

  var doors = [
    {img:IMG.sell, icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z"/></svg>', h:"Thinking of Selling?", t:"Get a precise home value and a plan to sell for top dollar.", b:"What's My Home Worth?", u:"/evaluation"},
    {img:IMG.buy, icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.5 8.5 0 1 0-3.2 6.6l3.7 3.7 1.4-1.4-3.7-3.7A8.46 8.46 0 0 0 21 11.5zm-8.5 6a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z"/></svg>', h:"Looking to Buy?", t:"Search every Acadiana listing and tour homes with a local pro.", b:"Search Homes", u:"/listing"},
    {img:IMG.cash, icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2v8h6l-8 12v-8H5l8-12z"/></svg>', h:"Need to Sell Fast?", t:"Get a no-obligation cash offer in 24 hours — no repairs, no showings.", b:"Get My Cash Offer", u:"/cash-offer"}
  ];

  var panels = doors.map(function (d) {
    return '<div class="lst-cta__panel" style="background-image:url(\'' + d.img + '\')">' +
      '<div class="lst-cta__tile"><div class="lst-cta__icon">' + d.icon + '</div>' +
      '<h3 class="lst-cta__ch">' + d.h + '</h3><p class="lst-cta__ct">' + d.t + '</p>' +
      '<a class="lst-cta__btn" href="' + d.u + '">' + d.b + '</a></div></div>';
  }).join('');

  function run() {
    if (document.getElementById("lst-cta-root")) return;
    var st = document.createElement("style"); st.id = "lst-cta-style"; st.textContent = css; document.head.appendChild(st);
    var sec = document.createElement("section"); sec.className = "lst-cta"; sec.id = "lst-cta-root";
    sec.innerHTML = '<div class="lst-cta__grid">' + panels + '</div>';

    var rv = document.getElementById("lst-rv-root");
    if (rv) { rv.parentNode.insertBefore(sec, rv); return; }
    function findByText(re, max){var a=document.querySelectorAll("h1,h2,h3,p,span,div");for(var i=0;i<a.length;i++){var t=(a[i].textContent||"").trim();if(t&&t.length<(max||80)&&re.test(t))return a[i];}return null;}
    function big(el){var n=el,w=document.documentElement.clientWidth*0.9;for(var i=0;i<9&&n&&n.parentElement;i++){n=n.parentElement;if(n.getBoundingClientRect().width>=w)return n;}return el;}
    var lux=findByText(/Luxury Real Estate in Acadiana/i,80);
    if(lux){var ls=big(lux);ls.parentNode.insertBefore(sec,ls);return;}
    document.body.appendChild(sec);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(run, 550); });
  } else {
    setTimeout(run, 550);
  }
})();
