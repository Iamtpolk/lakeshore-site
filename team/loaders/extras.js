/* Lakeshore TEAM (lakeshoreteam.com) — site-wide extras. Loaded by Lofty's site-wide Script.
   1) Accessibility: re-enable pinch-zoom — the template viewport caps zoom at maximum-scale=1 (fails WCAG 1.4.4).
   2) Team click-to-call/text button (fixed, bottom-left, charcoal + gold). Team-wide, not personal. */
(function(){
  'use strict';

  /* 1) Pinch-zoom fix — let users zoom up to the browser default. */
  try{
    var vp = document.querySelector('meta[name=viewport]');
    if(vp){ vp.setAttribute('content','width=device-width, initial-scale=1, viewport-fit=cover'); }
  }catch(e){}

  /* 2) Click-to-call / text button. */
  function addCall(){
    if(document.getElementById('lst-team-call')) return true;
    if(!document.body) return false;
    var a = document.createElement('a');
    a.id = 'lst-team-call';
    a.href = 'tel:+13373525238';
    a.setAttribute('aria-label','Call or text the Lakeshore Team at (337) 352-5238');
    a.innerHTML = '<span aria-hidden="true" style="font-size:1rem;line-height:1">☎</span>'
                + '<span style="white-space:nowrap">Call or Text</span>';
    a.style.cssText = [
      'position:fixed','left:18px','bottom:18px','z-index:2147482000',
      'display:inline-flex','align-items:center','gap:.5rem',
      'padding:.72rem 1.15rem','border-radius:999px',
      'font:700 .86rem/1 Inter,system-ui,Arial,sans-serif','letter-spacing:.02em',
      'color:#fff','text-decoration:none',
      'background:linear-gradient(135deg,#2b2a26 0%,#17150F 100%)',
      'border:1px solid rgba(177,154,85,.55)',
      'box-shadow:0 10px 26px rgba(0,0,0,.34)',
      'transition:transform .2s ease, box-shadow .2s ease'
    ].join(';');
    a.addEventListener('mouseenter', function(){ a.style.transform='translateY(-2px)'; a.style.boxShadow='0 16px 34px rgba(0,0,0,.42)'; });
    a.addEventListener('mouseleave', function(){ a.style.transform=''; a.style.boxShadow='0 10px 26px rgba(0,0,0,.34)'; });
    document.body.appendChild(a);
    return true;
  }
  if(document.readyState !== 'loading'){ addCall(); }
  else { document.addEventListener('DOMContentLoaded', addCall); }
})();
