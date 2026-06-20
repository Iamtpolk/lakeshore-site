/* Lakeshore TEAM (lakeshoreteam.com) — Homepage "Meet the Team" loader.
   Fetches team/sections/meet-the-team.html and injects it where the native .md-team block was
   (just before the footer, inside main.page-content).
   Load-correctness: the native .md-team block is hidden via render-blocking <head> CSS
   (body.home .md-team{display:none}); this loader swaps the new section in via a MutationObserver
   that disconnects once settled. No setInterval/timer chains. */
(function(){
  if(window.__lstTeamMeet) return; window.__lstTeamMeet = 1;

  /* homepage only */
  var path = location.pathname.replace(/\/+$/,'');
  if(path !== '') return;

  var BASE = 'https://iamtpolk.github.io/lakeshore-site/team/';

  /* fonts (Playfair Display + Inter) */
  if(!document.getElementById('lst-team-fonts')){
    var l = document.createElement('link');
    l.id = 'lst-team-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(l);
  }

  var HTML = null;
  fetch(BASE + 'sections/meet-the-team.html')
    .then(function(r){ return r.text(); })
    .then(function(t){ HTML = t; try{ if(inject()) mo.disconnect(); }catch(e){} });

  function inject(){
    if(document.getElementById('lst-team-root')) return true;       /* already placed */
    if(HTML === null) return false;                                 /* section not fetched yet */
    var pc = document.querySelector('main.page-content, .page-content');
    if(!pc) return false;
    var nt = pc.querySelector('.md-team');
    if(nt){ nt.style.display = 'none'; }                            /* backup hide of broken native block */
    var foot = pc.querySelector(':scope > .md-footer') || pc.querySelector('.md-footer') || document.querySelector('.md-footer');
    if(!foot) return false;                                         /* wait for footer so we land in final spot */
    var wrap = document.createElement('div');
    wrap.id = 'lst-team-root';
    wrap.innerHTML = HTML;
    pc.insertBefore(wrap, foot);                                    /* final position: where .md-team was, before footer */
    return true;
  }

  var mo = new MutationObserver(function(){ try{ if(inject()) mo.disconnect(); }catch(e){} });
  mo.observe(document.documentElement, {childList:true, subtree:true});
  if(document.readyState !== 'loading'){ try{ if(inject()) mo.disconnect(); }catch(e){} }
})();
