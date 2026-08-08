import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;

function telegramInitDataValid(initData){
  if(!BOT_TOKEN || !initData) return false;
  const params=new URLSearchParams(initData); const hash=params.get('hash'); if(!hash) return false; params.delete('hash');
  const dataCheck=[...params.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`${k}=${v}`).join('\n');
  const secret=crypto.createHmac('sha256','WebAppData').update(BOT_TOKEN).digest();
  const check=crypto.createHmac('sha256',secret).update(dataCheck).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(check),Buffer.from(hash));
}

app.post('/api/create-invoice',async(req,res)=>{
  try{
    if(!telegramInitDataValid(req.body.initData)) return res.status(401).json({error:'Invalid Telegram session'});
    const plan=req.body.plan==='pro'?{title:'Nol Vanneth Sales Pro',description:'Premium dashboard and reports',stars:150}:null;
    if(!plan) return res.status(400).json({error:'Unknown plan'});
    const response=await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({title:plan.title,description:plan.description,payload:`sales-pro-${Date.now()}`,currency:'XTR',prices:[{label:plan.title,amount:plan.stars}]})});
    const data=await response.json(); if(!data.ok) return res.status(502).json({error:data.description||'Telegram API error'});
    res.json({invoiceLink:data.result});
  }catch(e){res.status(500).json({error:e.message})}
});

app.get('/health',(req,res)=>res.json({ok:true,service:'Nol Vanneth Sales'}));
app.listen(PORT,()=>console.log(`Server listening on ${PORT}`));