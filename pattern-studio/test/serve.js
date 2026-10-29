// Local dev server: static public/ + the fabrics API function. `npm run dev` then open http://localhost:3131
const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');
const pub=path.join(__dirname,'..','public'); const fabrics=require('../api/fabrics.js');
const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
  const u=url.parse(req.url,true);
  if(u.pathname==='/api/fabrics'){ req.query=u.query; res.status=c=>{res.statusCode=c;return res}; res.json=o=>{res.setHeader('content-type','application/json');res.end(JSON.stringify(o))}; return fabrics(req,res); }
  let p=u.pathname==='/'?'/index.html':u.pathname; const f=path.join(pub,p);
  if(!fs.existsSync(f)){res.statusCode=404;return res.end('not found')}
  res.setHeader('content-type',types[path.extname(f)]||'application/octet-stream'); fs.createReadStream(f).pipe(res);
}).listen(3131,()=>console.log('Pattern Studio dev → http://localhost:3131'));
