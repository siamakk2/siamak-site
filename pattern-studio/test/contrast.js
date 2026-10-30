// Contrast audit: walks every tab after generating a pattern and reports visible text with contrast < 3:1 against its effective background.
const { chromium } = require('playwright'); const path=require('path'), fs=require('fs'), http=require('http');
const pub=path.join(__dirname,'..','public');
const srv=http.createServer((q,r)=>{let p=q.url.split('?')[0]; if(p==='/')p='/index.html'; if(p.startsWith('/api/')){r.setHeader('content-type','application/json');return r.end('{"products":[],"image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}')} const f=path.join(pub,p); if(!fs.existsSync(f)){r.statusCode=404;return r.end()} r.setHeader('content-type',{'.html':'text/html','.css':'text/css','.js':'application/javascript'}[path.extname(f)]||'text/plain'); r.end(fs.readFileSync(f));});
const audit=()=>{function parse(c){const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return null;const a=m[1].split(',').map(Number);return {r:a[0],g:a[1],b:a[2],a:a.length>3?a[3]:1}}
 function lum({r,g,b}){const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(r)+.7152*f(g)+.0722*f(b)}
 function bgOf(el){let e=el;let acc=null;while(e&&e!==document.documentElement){const cs=getComputedStyle(e);const c=parse(cs.backgroundColor);if(c&&c.a>0){if(!acc)acc=c;else if(acc.a<1){acc={r:acc.r*acc.a+c.r*(1-acc.a),g:acc.g*acc.a+c.g*(1-acc.a),b:acc.b*acc.a+c.b*(1-acc.a),a:1}} if(acc.a>=1)return acc;} if(cs.backgroundImage&&cs.backgroundImage!=='none'&&/gradient/.test(cs.backgroundImage)) return acc||{r:30,g:26,b:40,a:1}; e=e.parentElement;} return acc||{r:11,g:10,b:16,a:1}}
 const out=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=walker.nextNode()){const t=n.textContent.trim();if(t.length<3)continue;const el=n.parentElement;if(!el)continue;const cs=getComputedStyle(el);if(cs.visibility==='hidden'||cs.display==='none')continue;const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;if(!el.closest('.bpage.show')&&!el.closest('#bmf-top,#bmf-tabs,#bmfNavBar'))continue;
  const fg=parse(cs.color);if(!fg||fg.a===0)continue;const bg=bgOf(el);const L1=lum(fg),L2=lum(bg);const ratio=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
  if(ratio<3)out.push({ratio:+ratio.toFixed(2),text:t.slice(0,40),fg:cs.color,bg:`rgb(${bg.r|0},${bg.g|0},${bg.b|0})`,cls:(el.className||'').toString().slice(0,30),style:(el.getAttribute('style')||'').slice(0,80)});}
 return out;};
(async()=>{ await new Promise(r=>srv.listen(0,r)); const port=srv.address().port; const br=await chromium.launch(); const pg=await br.newPage({viewport:{width:1280,height:900}});
 await pg.goto(`http://127.0.0.1:${port}/`,{waitUntil:'networkidle'}); await pg.waitForTimeout(600);
 await pg.click('#bgrid .gc:nth-child(3)'); await pg.click('.btab:nth-of-type(2)'); await pg.click('#designGrid .dcard:nth-child(1)'); await pg.click('.btab:nth-of-type(5)'); await pg.click('#bmfNavBar button:last-child'); await pg.waitForTimeout(1500);
 const all={}; const tabs=['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pg8','pgU','pgP','pgH'];
 for(let i=0;i<tabs.length;i++){ await pg.evaluate((i)=>{const t=document.querySelectorAll('.btab');showTab(t[i],['pg1','pg2','pg3','pg4','pgF','pg5','pg6','pg7','pg8','pgU','pgP','pgH'][i])},i); await pg.waitForTimeout(300); await pg.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true)); const res=await pg.evaluate(audit); if(res.length) all[tabs[i]]=res; }
 // size run modal + nest panel
 await pg.evaluate(()=>{window._gradeExplained=true; renderGradeModal();}); await pg.waitForTimeout(300); const g=await pg.evaluate(audit); if(g.length) all.gradeModal=g;
 console.log(JSON.stringify(all,null,1)); await br.close(); srv.close(); })().catch(e=>{console.error(e);process.exit(1)});
