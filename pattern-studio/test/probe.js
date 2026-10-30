const { chromium } = require('playwright'); const path=require('path'), fs=require('fs'), http=require('http');
const pub=path.join(__dirname,'..','public');
const srv=http.createServer((q,r)=>{let p=q.url.split('?')[0]; if(p==='/')p='/index.html'; if(p.startsWith('/api/')){r.setHeader('content-type','application/json');return r.end('{"products":[],"image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="}')}
  const f=path.join(pub,p); if(!fs.existsSync(f)){r.statusCode=404;return r.end()} r.setHeader('content-type',{'.html':'text/html','.css':'text/css','.js':'application/javascript'}[path.extname(f)]||'text/plain'); r.end(fs.readFileSync(f));});
(async()=>{ await new Promise(r=>srv.listen(0,r)); const port=srv.address().port;
  const br=await chromium.launch(); const ctx=await br.newContext({viewport:{width:1280,height:900},acceptDownloads:true}); const pg=await ctx.newPage();
  const errors=[]; pg.on('pageerror',e=>errors.push(e.message)); const dls=[]; pg.on('download',d=>dls.push(d.suggestedFilename()));
  await pg.goto(`http://127.0.0.1:${port}/`,{waitUntil:'networkidle'}); await pg.waitForTimeout(800);
  await pg.click('#bgrid .gc:nth-child(3)'); await pg.click('.btab:nth-of-type(2)'); await pg.click('#designGrid .dcard:nth-child(1)');
  await pg.click('.btab:nth-of-type(5)'); await pg.click('#bmfNavBar button:last-child'); await pg.waitForTimeout(2000);
  const r={pieces:await pg.evaluate(()=>S.ps.length)};
  // downloads
  await pg.evaluate(()=>{document.querySelectorAll('details.pc-sec').forEach(d=>d.open=true)});
  for (const fn of ['saveDXF','saveSVG','saveCanvas']) { try { await pg.evaluate(f=>window[f](),fn); } catch(e){ r['err_'+fn]=e.message.slice(0,120);} await pg.waitForTimeout(700); }
  r.downloads=dls;
  // size run overlay → Not now
  await pg.evaluate(()=>openGrading()); await pg.waitForTimeout(300);
  r.overlayShown=await pg.evaluate(()=>!![...document.querySelectorAll('div')].find(d=>d.textContent.includes('Size Run — what is it?')&&d.style.position==='fixed'));
  r.notNowCount=await pg.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>b.textContent.trim()==='Not now').length); await pg.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Not now'); b.click();}); await pg.waitForTimeout(300); r.afterClickFixed=await pg.evaluate(()=>[...document.body.children].filter(d=>d.style.position==='fixed').map(d=>d.style.zIndex+'/'+d.textContent.slice(0,30)));
  r.overlayClosedByNotNow=await pg.evaluate(()=>![...document.querySelectorAll('div')].find(d=>d.textContent.includes('Size Run — what is it?')&&d.style.position==='fixed'));
  await pg.evaluate(()=>[...document.querySelectorAll('div')].filter(d=>d.style.position==='fixed'&&d.style.zIndex==='99999').forEach(d=>d.remove()));
  // pieces page contrast
  await pg.click('.btab:nth-of-type(7)'); await pg.waitForTimeout(400);
  r.pcStyles=await pg.evaluate(()=>{const c=document.querySelector('.pc'); if(!c) return 'no .pc'; const cs=getComputedStyle(c); const t=c.querySelector('.pc-nm')||c.querySelector('b,strong,div'); return {bg:cs.backgroundColor, name:t?getComputedStyle(t).color:null, html:c.outerHTML.slice(0,400)}});
  await pg.screenshot({path:path.join(__dirname,'shots','probe-pieces.png')});
  r.errors=errors; console.log(JSON.stringify(r,null,1)); await br.close(); srv.close();
})().catch(e=>{console.error(e);process.exit(1)});
