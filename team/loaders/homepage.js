/* Lakeshore TEAM (lakeshoreteam.com) — Homepage builder.
   Injects, in .homes order (recolored charcoal+gold):
     before Featured Listings:  CTA trio -> Trust bar -> Reviews
     after  Sold Listings:      Playbooks
   (Meet the Team is injected separately by meet-the-team.js, before the footer.)
   Native blocks .md-team-desc and .md-cta are hidden (render-blocking <head> CSS does this too;
   this is a backup). MutationObserver disconnects once everything is settled — no timer chains. */
(function(){
  if(window.__lstHome) return; window.__lstHome = 1;

  /* ===== Site-wide extras — run on EVERY page (this file is loaded site-wide; the homepage-only
     guard is below). a) re-enable pinch-zoom (template viewport caps maximum-scale=1, fails WCAG 1.4.4);
     b) team click-to-call/text button (bottom-left, charcoal + gold). ===== */
  try{ var _vp=document.querySelector('meta[name=viewport]'); if(_vp){ _vp.setAttribute('content','width=device-width, initial-scale=1, viewport-fit=cover'); } }catch(e){}
  (function(){
    function addCall(){
      if(document.getElementById('lst-team-call')) return true;
      if(!document.body) return false;
      var a=document.createElement('a'); a.id='lst-team-call'; a.href='tel:+13373525238';
      a.setAttribute('aria-label','Call or text the Lakeshore Team at (337) 352-5238');
      a.innerHTML='<span aria-hidden="true" style="font-size:1rem;line-height:1">☎</span><span style="white-space:nowrap">Call or Text</span>';
      a.style.cssText='position:fixed;left:18px;bottom:18px;z-index:2147482000;display:inline-flex;align-items:center;gap:.5rem;padding:.72rem 1.15rem;border-radius:999px;font:700 .86rem/1 Inter,system-ui,Arial,sans-serif;letter-spacing:.02em;color:#fff;text-decoration:none;background:linear-gradient(135deg,#2b2a26 0%,#17150F 100%);border:1px solid rgba(177,154,85,.55);box-shadow:0 10px 26px rgba(0,0,0,.34);transition:transform .2s ease, box-shadow .2s ease';
      a.addEventListener('mouseenter',function(){a.style.transform='translateY(-2px)';a.style.boxShadow='0 16px 34px rgba(0,0,0,.42)';});
      a.addEventListener('mouseleave',function(){a.style.transform='';a.style.boxShadow='0 10px 26px rgba(0,0,0,.34)';});
      document.body.appendChild(a); return true;
    }
    if(document.readyState!=='loading'){ addCall(); } else { document.addEventListener('DOMContentLoaded', addCall); }
  })();

  var path = location.pathname.replace(/\/+$/,''); if(path !== '') return;  /* homepage only (sections below) */
  var BASE = 'https://iamtpolk.github.io/lakeshore-site/team/sections/';

  if(!document.getElementById('lst-team-fonts')){
    var l=document.createElement('link'); l.id='lst-team-fonts'; l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  var BEFORE = [
    {id:'lst-home-cta',   file:'home-cta.html'},
    {id:'lst-home-trust', file:'home-trustbar.html'},
    {id:'lst-home-rv',    file:'home-reviews.html'}
  ];
  var AFTER = {id:'lst-home-pb', file:'home-playbooks.html'};
  var ALL = BEFORE.concat([AFTER]);
  var html = {};

  var VER = Date.now();  /* cache-bust section fetches so edits appear immediately (no stale GitHub Pages cache) */
  ALL.forEach(function(s){
    fetch(BASE + s.file + '?v=' + VER).then(function(r){return r.text();}).then(function(t){
      html[s.id] = t; try{ if(place()) mo.disconnect(); }catch(e){}
    });
  });

  function el(id, h){ var d=document.createElement('div'); d.id=id; d.innerHTML=h; return d; }

  /* innerHTML does NOT execute <script> tags — re-create them so injected sections
     (e.g. the Playbooks tab switching + lead form) actually run. */
  function runScripts(container){
    [].forEach.call(container.querySelectorAll('script'), function(old){
      var s = document.createElement('script');
      [].forEach.call(old.attributes, function(a){ s.setAttribute(a.name, a.value); });
      if(old.src){ s.src = old.src; } else { s.textContent = old.textContent; }
      old.parentNode.replaceChild(s, old);
    });
  }

  /* Stat-bar count-up: animate each [data-to] number from 0 when it scrolls into view. */
  function setupCounts(){
    var nums = document.querySelectorAll('#lst-home-trust .num[data-to]');
    if(!nums.length) return;
    [].forEach.call(nums, function(node){
      if(node.dataset.cinit) return; node.dataset.cinit = '1';
      var to=parseFloat(node.dataset.to), dec=parseInt(node.dataset.dec||'0',10), pre=node.dataset.pre||'', suf=node.dataset.suf||'';
      node.textContent = pre + (0).toFixed(dec) + suf;          /* from-state (set below the fold, no visible flash) */
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(!e.isIntersecting) return;
          io.unobserve(node);
          var start=null, dur=1700;
          function tick(ts){ if(!start) start=ts; var p=Math.min((ts-start)/dur,1); var k=1-Math.pow(1-p,3);
            node.textContent = pre + (to*k).toFixed(dec) + suf;
            if(p<1) requestAnimationFrame(tick); else node.textContent = pre + to.toFixed(dec) + suf; }
          requestAnimationFrame(tick);
        });
      }, {threshold:0.6});
      io.observe(node);
    });
  }

  function place(){
    var pc = document.querySelector('main.page-content, .page-content'); if(!pc) return false;

    /* hide native clutter (backup to head CSS) */
    var desc = pc.querySelector('.md-team-desc'); if(desc) desc.style.display='none';
    pc.querySelectorAll(':scope > .md-cta').forEach(function(n){ n.style.display='none'; });

    var houses = pc.querySelectorAll(':scope > .md-house');
    var featured = houses[0];
    var sold = houses[houses.length-1];

    /* CTA -> Trust -> Reviews, immediately before Featured Listings.
       Insert only once ALL three are fetched, so DOM order matches array order
       regardless of which fetch finishes first. */
    var beforeReady = BEFORE.every(function(s){ return html[s.id]; });
    if(featured && beforeReady){
      BEFORE.forEach(function(s){
        if(!document.getElementById(s.id)){ var node=el(s.id, html[s.id]); pc.insertBefore(node, featured); runScripts(node); }
      });
    }
    /* Playbooks right after Sold Listings (lands between Sold and Meet the Team) */
    if(sold && html[AFTER.id] && !document.getElementById(AFTER.id)){
      var pbn=el(AFTER.id, html[AFTER.id]); sold.insertAdjacentElement('afterend', pbn); runScripts(pbn);
    }

    setupCounts();   /* arm the stat-bar count-up once the trust bar is in the DOM */

    return ALL.every(function(s){ return !!document.getElementById(s.id); });
  }

  var mo = new MutationObserver(function(){ try{ if(place()) mo.disconnect(); }catch(e){} });
  mo.observe(document.documentElement, {childList:true, subtree:true});
  if(document.readyState !== 'loading'){ try{ if(place()) mo.disconnect(); }catch(e){} }
})();
