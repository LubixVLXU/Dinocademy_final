(function(){
  'use strict';
  if(document.body.dataset.page!=='home') return;
  document.documentElement.classList.add('reveal-ready');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items=[].slice.call(document.querySelectorAll('[data-reveal]'));
  if(reduce||!('IntersectionObserver' in window)){items.forEach(function(x){x.classList.add('is-visible');});}
  else{var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -6% 0px'});items.forEach(function(x){io.observe(x);});setTimeout(function(){items.forEach(function(x){x.classList.add('is-visible');});},1200);}

  var evidence={
    bone:['Kość nie jest odpowiedzią sama w sobie.','Jej znaczenie wynika z anatomii, miejsca w szkielecie, porównania z innymi okazami i kontekstu geologicznego.'],
    track:['Trop zapisuje zachowanie, nie tylko obecność.','Rozstaw kroków, kierunek i układ wielu śladów mogą sugerować tempo ruchu albo interakcję zwierząt nawet wtedy, gdy nie zachowały się kości.'],
    rock:['Warstwa jest częścią dowodu.','Pozycja skamieniałości w sekwencji skał pomaga określić wiek, środowisko depozycji i relacje z innymi znaleziskami.']
  };
  var answer=document.getElementById('evidence-answer');
  document.querySelectorAll('[data-evidence]').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('[data-evidence]').forEach(function(b){b.classList.remove('is-active');});btn.classList.add('is-active');var d=evidence[btn.dataset.evidence];if(answer&&d)answer.innerHTML='<b>'+d[0]+'</b> '+d[1];});});

  var result=document.getElementById('myth-result');
  var quiz=[].slice.call(document.querySelectorAll('#myth-quiz [data-answer]'));
  quiz.forEach(function(btn){btn.addEventListener('click',function(){quiz.forEach(function(b){b.disabled=true;b.classList.remove('correct','wrong');});var ok=btn.dataset.answer==='triceratops';btn.classList.add(ok?'correct':'wrong');if(result)result.innerHTML=ok?'<b>Tak — Triceratops był dinozaurem.</b> Pteranodon był pterozaurem, Mosasaurus morskim łuskonośnym, a Dimetrodon synapsydem.':'<b>Nie tym razem.</b> Poprawna odpowiedź to Triceratops. Pozostałe zwierzęta należały do innych linii kręgowców.';});});
})();
