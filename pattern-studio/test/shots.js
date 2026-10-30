/* Headless render test: boots the app, walks every tab, generates a pattern, nests, screenshots. */
const { chromium } = require('playwright'); const path=require('path'), fs=require('fs'), http=require('http');
const pub=path.join(__dirname,'..','public'); const out=path.join(__dirname,'shots'); fs.mkdirSync(out,{recursive:true});
const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json'};
const srv=http.createServer((q,r)=>{let p=q.url.split('?')[0]; if(p==='/')p='/index.html';
  if(p.startsWith('/api/render')){ r.setHeader('content-type','application/json'); return r.end(JSON.stringify({image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',model:'mock',usedFabricPhoto:false})); }
  if(p.startsWith('/api/fabrics')){ r.setHeader('content-type','application/json'); return r.end(JSON.stringify({products:[]})); }
  const f=path.join(pub,p); if(!fs.existsSync(f)){r.statusCode=404;return r.end('nf');} r.setHeader('content-type',types[path.extname(f)]||'text/plain'); r.end(fs.readFileSync(f));});
(async()=>{ await new Promise(r=>srv.listen(0,r)); const port=srv.address().port;
  const br=await chromium.launch(); const pg=await br.newPage({viewport:{width:1280,height:900}});
  const errors=[]; pg.on('pageerror',e=>errors.push('PAGEERROR '+e.message)); pg.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE '+m.text())});
  await pg.goto(`http://127.0.0.1:${port}/`,{waitUntil:'networkidle'}); await pg.waitForTimeout(1200);
  const shot=async n=>pg.screenshot({path:path.join(out,n+'.png'),fullPage:false});
  await shot('01-home');
  const report={};
  report.garments=await pg.$$eval('#bgrid .gc',a=>a.length);
  await pg.click('#bgrid .gc:nth-child(10)'); await pg.waitForTimeout(300);           // bodycon dress
  report.selected=await pg.$eval('#selBody',e=>e.textContent.trim());
  await pg.click('.btab:nth-of-type(2)'); await pg.waitForTimeout(300); await shot('02-design');
  report.styles=await pg.$$eval('#designGrid .dcard',a=>a.length);
  await pg.click('#designGrid .dcard:nth-child(2)'); await pg.waitForTimeout(300);
  await pg.click('.btab:nth-of-type(3)'); await pg.waitForTimeout(300); await shot('03-measure');
  report.fields=await pg.$$eval('#mfields .mi',a=>a.length);
  await pg.click('.btab:nth-of-type(4)'); await pg.waitForTimeout(300); await shot('04-fit');
  await pg.click('.btab:nth-of-type(5)'); await pg.waitForTimeout(600); await shot('05-fabric');
  report.sketchSvg=await pg.$eval('#sketchSvgHost',e=>e.innerHTML.length).catch(()=>0);
  await pg.click('#fabricGrid .fab-card:nth-child(3)'); await pg.waitForTimeout(300);
  report.renderPanel=!!(await pg.$('#psRenderBtn')); await pg.click('#psRenderBtn'); await pg.waitForTimeout(800); report.renderImg=!!(await pg.$('.ps-render-img')); await pg.$eval('#psRenderBox',e=>e.scrollIntoView()); await shot('05b-render');
  // generate via the sticky Next (pgF → generate)
  await pg.click('#bmfNavBar button:last-child'); await pg.waitForTimeout(2500); await shot('06-pattern');
  report.pieces=await pg.evaluate(()=>typeof S!=='undefined'?S.ps.length:-1);
  report.activePage=await pg.$eval('.bpage.show',e=>e.id);
  // auto arrange
  const nest=await pg.$('text=Auto Arrange'); if(nest){await nest.click(); await pg.waitForTimeout(500); const run=await pg.$('#bmfNestExplain button'); if(run){await run.click();} await pg.waitForTimeout(3000); await shot('07-nested');}
  report.piecesAfterNest=await pg.evaluate(()=>S.ps.length);
  await pg.$eval('#cwrap',e=>e.scrollIntoView({block:'center'})); await pg.waitForTimeout(300); await shot('07b-canvas');
  report.nestPanel=await pg.$eval('#nestPanel',e=>e.style.display!=='none'&&e.textContent.length>0).catch(()=>false);
  report.walk=[]; for (const n of ['08-pieces','09-yield','10-look','11-projects','12-print','13-guide']) { await pg.click('#bmfNavBar button:last-child'); await pg.waitForTimeout(400); report.walk.push(await pg.$eval('.bpage.show',e=>e.id)); await shot(n); }
  report.hiddenTabs=await pg.evaluate(()=>[...document.querySelectorAll('.btab')].filter(b=>getComputedStyle(b).display==='none').length);
  await pg.setViewportSize({width:390,height:844}); await pg.click('.btab:nth-of-type(1)'); await pg.waitForTimeout(400); await shot('14-mobile-home');
  await pg.click('.btab:nth-of-type(6)'); await pg.waitForTimeout(400); await shot('15-mobile-pattern');
  report.errors=errors.slice(0,12);
  console.log(JSON.stringify(report,null,1)); await br.close(); srv.close();
})().catch(e=>{console.error(e);process.exit(1)});
