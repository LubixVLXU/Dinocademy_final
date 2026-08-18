(function(){
  'use strict';
  if(document.body.dataset.page!=='home') return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=window.matchMedia&&window.matchMedia('(pointer:fine)').matches;
  function all(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}

  var reveals=all('[data-reveal]');
  if(reduce||!('IntersectionObserver' in window)){reveals.forEach(function(el){el.classList.add('is-visible');});}
  else{
    var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    reveals.forEach(function(el){io.observe(el);});
  }

  var specimen=document.getElementById('specimen-frame');
  if(specimen&&fine&&!reduce){
    specimen.addEventListener('pointermove',function(e){var r=specimen.getBoundingClientRect();var x=(e.clientX-r.left)/r.width-.5;var y=(e.clientY-r.top)/r.height-.5;specimen.style.setProperty('--ry',(x*5.5).toFixed(2)+'deg');specimen.style.setProperty('--rx',(-y*4.2).toFixed(2)+'deg');});
    specimen.addEventListener('pointerleave',function(){specimen.style.setProperty('--ry','0deg');specimen.style.setProperty('--rx','0deg');});
  }
  var factBtn=document.getElementById('specimen-fact-button'),fact=document.getElementById('specimen-fact');
  if(factBtn&&fact){factBtn.addEventListener('click',function(){var open=fact.classList.toggle('is-open');factBtn.setAttribute('aria-expanded',String(open));factBtn.textContent=open?'Ukryj notatkę':'Odsłoń notatkę';});}

  var evidence={
    bone:['01 / KOŚĆ','Jedna cecha rzadko wystarcza.','Kształt kości ma sens dopiero po porównaniu z innymi okazami, pozycją w szkielecie i kontekstem geologicznym.'],
    track:['02 / TROP','Zachowanie może przetrwać bez szkieletu.','Kierunek, rozstaw kroków i układ wielu tropów mogą zapisać ruch albo interakcję zwierząt, których kości nigdy nie odnajdziemy.'],
    rock:['03 / WARSTWA','Skamieniałość bez kontekstu traci część historii.','Położenie w sekwencji skał pozwala łączyć okaz z konkretnym środowiskiem i przedziałem czasu, zamiast traktować go jako oderwany obiekt.'],
    tree:['04 / DRZEWO','Pokrewieństwo nie jest rankingiem podobieństwa.','Analizuje się zestawy cech wspólnych i ich rozkład. Dlatego ptak może być bliżej spokrewniony z teropodem niż z innym latającym gadem.']
  };
  var readout=document.getElementById('evidence-readout');
  all('[data-evidence]').forEach(function(btn){btn.addEventListener('click',function(){all('[data-evidence]').forEach(function(x){x.classList.remove('is-active');});btn.classList.add('is-active');var d=evidence[btn.dataset.evidence];if(readout&&d)readout.innerHTML='<span>'+d[0]+'</span><h3>'+d[1]+'</h3><p>'+d[2]+'</p>';});});

  var periods={
    trias:['TRIAS / 252–201 mln lat temu','Pierwsze dinozaury pojawiają się w świecie nadal zdominowanym przez inne linie archozaurów.','Większość lądów pozostaje połączona w Pangeę. Wczesne dinozaury są tylko częścią znacznie większej historii odbudowy ekosystemów po wymieraniu permskim.'],
    jura:['JURA / 201–145 mln lat temu','Kontynenty zaczynają się rozsuwać, a dinozaury zajmują coraz więcej nisz lądowych.','Ogromne zauropody, zróżnicowane teropody i ptakopodobne formy pokazują, że „dinozaur” nie oznaczał jednego planu budowy ani jednego sposobu życia.'],
    kreda:['KREDA / 145–66 mln lat temu','Różnorodność dinozaurów rośnie razem z przebudową świata roślin i kontynentów.','Pod koniec kredy żyją tyranozaury, ceratopsy i wiele wyspecjalizowanych linii. Wymieranie K–Pg kończy erę dinozaurów nieptasich, ale ptaki przetrwają.']
  };
  var periodCopy=document.getElementById('period-copy'),periodStage=document.querySelector('.period-stage');
  all('.period-tab').forEach(function(btn){btn.addEventListener('click',function(){all('.period-tab').forEach(function(x){x.classList.remove('is-active');x.setAttribute('aria-selected','false');});btn.classList.add('is-active');btn.setAttribute('aria-selected','true');var d=periods[btn.dataset.period];if(periodCopy&&d){periodCopy.innerHTML='<span>'+d[0]+'</span><h3>'+d[1]+'</h3><p>'+d[2]+'</p>';if(periodStage&&!reduce){periodStage.classList.remove('is-changing');void periodStage.offsetWidth;periodStage.classList.add('is-changing');}}});});

  var result=document.getElementById('myth-result'),quiz=all('#myth-quiz [data-answer]');
  quiz.forEach(function(btn){btn.addEventListener('click',function(){quiz.forEach(function(x){x.classList.remove('correct','wrong');x.disabled=true;});var ok=btn.dataset.answer==='triceratops';btn.classList.add(ok?'correct':'wrong');if(result){result.innerHTML=ok?'<b>Tak — Triceratops to dinozaur.</b><span>Pteranodon był pterozaurem, Mosasaurus morskim łuskonośnym, a Dimetrodon synapsydem żyjącym długo przed pierwszymi dinozaurami.</span>':'<b>Nie tym razem.</b><span>Poprawna odpowiedź to Triceratops. Pozostałe trzy zwierzęta należały do innych linii kręgowców.</span>';}});});
})();
