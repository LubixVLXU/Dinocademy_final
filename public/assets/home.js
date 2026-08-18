(function(){
  'use strict';
  if(document.body.dataset.page!=='home') return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=window.matchMedia&&window.matchMedia('(pointer:fine)').matches;
  function all(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}

  var reveal=all('[data-reveal]');
  if(reduce||!('IntersectionObserver' in window)){reveal.forEach(function(x){x.classList.add('is-visible');});}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{threshold:.13,rootMargin:'0px 0px -7%'});reveal.forEach(function(x){io.observe(x);});}

  var dust=document.getElementById('paleo-dust');
  if(dust&&!reduce){for(var i=0;i<28;i++){var d=document.createElement('i');d.className='dust';d.style.left=(Math.random()*100)+'%';d.style.top=(Math.random()*100)+'%';d.style.setProperty('--d',(8+Math.random()*12)+'s');d.style.setProperty('--o',(.15+Math.random()*.45).toFixed(2));d.style.animationDelay=(-Math.random()*12)+'s';dust.appendChild(d);}}

  var specimen=document.getElementById('specimen-card');
  if(specimen){specimen.addEventListener('click',function(){specimen.classList.toggle('is-open');});if(fine&&!reduce){specimen.addEventListener('mousemove',function(e){var r=specimen.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;specimen.style.setProperty('--ry',(x*8).toFixed(2)+'deg');specimen.style.setProperty('--rx',(-y*7).toFixed(2)+'deg');});specimen.addEventListener('mouseleave',function(){specimen.style.setProperty('--ry','0deg');specimen.style.setProperty('--rx','0deg');});}}

  all('[data-target]').forEach(function(el){var target=Number(el.dataset.target)||0;if(reduce){el.textContent=target;return;}var started=false;var o=new IntersectionObserver(function(es){if(!started&&es[0].isIntersecting){started=true;var t0=0;function tick(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/900),v=Math.round(target*(1-Math.pow(1-p,3)));el.textContent=v;if(p<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);o.disconnect();}},{threshold:.7});o.observe(el);});

  var eraData={
    trias:['TRIAS','Pangea nadal łączyła większość lądów.','Wczesne dinozaury dzieliły ekosystemy z wieloma innymi liniami archozaurów. Dominacja dinozaurów nie wydarzyła się natychmiast.'],
    jura:['JURA','Gigantyzm zauropodów osiągnął niezwykłą skalę.','W jurze pojawiły się także małe opierzone teropody i formy bliskie początkom ptaków. Pióra nie oznaczały jeszcze koniecznie aktywnego lotu.'],
    kreda:['KREDA','Kwitnące rośliny zmieniły lądowe ekosystemy.','W kredzie dinozaury osiągnęły ogromną różnorodność. Okres zakończył się 66 mln lat temu wymieraniem K–Pg, ale jedna linia dinozaurów — ptaki — przetrwała.']
  };
  var eraReveal=document.getElementById('era-reveal');
  all('.era-card').forEach(function(btn){btn.addEventListener('click',function(){all('.era-card').forEach(function(b){b.classList.remove('is-active');});btn.classList.add('is-active');var d=eraData[btn.dataset.era];if(eraReveal&&d){eraReveal.innerHTML='<span>'+d[0]+'</span><strong>'+d[1]+'</strong><p>'+d[2]+'</p>';}});});

  var digFact=document.getElementById('dig-fact');
  all('.fossil').forEach(function(btn){btn.addEventListener('click',function(){all('.fossil').forEach(function(b){b.classList.remove('is-active');});btn.classList.add('is-active');if(digFact){digFact.innerHTML='<b>Odkrycie: '+btn.textContent.trim()+'</b><p>'+btn.dataset.fact+'</p>';digFact.classList.add('is-open');}});});

  var quiz={pteranodon:['Nie.','Pteranodon był pterozaurem — bliskim krewnym dinozaurów, ale poza Dinosauria.'],triceratops:['Tak.','Triceratops był ceratopsem, czyli prawdziwym dinozaurem ptasiomiednicznym.'],mosasaurus:['Nie.','Mosasaurus był morskim łuskonośnym gadem, bliżej spokrewnionym z jaszczurkami i wężami niż z dinozaurami.'],dimetrodon:['Nie.','Dimetrodon był synapsydem i żył dziesiątki milionów lat przed pierwszymi dinozaurami.']};
  var result=document.getElementById('myth-result');
  all('#myth-quiz button').forEach(function(btn){btn.addEventListener('click',function(){all('#myth-quiz button').forEach(function(b){b.classList.remove('is-correct','is-wrong');});var ok=btn.dataset.answer==='triceratops';btn.classList.add(ok?'is-correct':'is-wrong');var d=quiz[btn.dataset.answer];if(result)result.innerHTML='<b>'+d[0]+'</b><p>'+d[1]+'</p>';});});
})();
