const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function animCursor(){
  rx+=(mx-rx)*.14; ry+=(my-ry)*.14;
  cur.style.left=mx+'px'; cur.style.top=my+'px';
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a,button,.card,.btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='6px';cur.style.height='6px';ring.style.width='52px';ring.style.height='52px';});
  el.addEventListener('mouseleave',()=>{cur.style.width='12px';cur.style.height='12px';ring.style.width='36px';ring.style.height='36px';});
});

/* PARTICLES */
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let W,H,pts=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;}
resize(); window.addEventListener('resize',resize);
for(let i=0;i<55;i++) pts.push({x:Math.random()*window.screen.width,y:Math.random()*window.screen.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.4,a:Math.random()});
(function drawP(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=W; if(p.x>W)p.x=0;
    if(p.y<0)p.y=H; if(p.y>H)p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(0,255,136,${p.a*.5})`; ctx.fill();
  });
  pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
    const d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(0,255,136,${.18*(1-d/130)})`;ctx.lineWidth=.5;ctx.stroke();}
  }));
  requestAnimationFrame(drawP);
})();

/* NAV */
function toggleMenu(){document.getElementById('nav-links').classList.toggle('open');}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav-links').classList.remove('open')));

/* SCROLL EVENTS */
window.addEventListener('scroll',()=>{
  let c='';
  document.querySelectorAll('section[id],div[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-120)c=s.id;});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+c));
  const prog=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
  document.getElementById('read-progress').style.width=prog+'%';
  document.getElementById('scroll-top').classList.toggle('show',window.scrollY>400);
});

/* TYPING */
const phrases=['Electronics & Telecom Engineer','AI / ML Enthusiast','IoT & Embedded Systems Builder','Robotics Explorer','Web Developer'];
let pi=0,ci=0,del=false;
(function typeLoop(){
  const el=document.getElementById('typing');
  const cur3=phrases[pi];
  if(!del){el.textContent=cur3.slice(0,++ci);if(ci===cur3.length){del=true;setTimeout(typeLoop,1900);return;}}
  else{el.textContent=cur3.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;}}
  setTimeout(typeLoop,del?38:75);
})();

/* REACTION */
function startEffect(){const r=document.getElementById('reaction');r.classList.remove('active');void r.offsetWidth;r.classList.add('active');}

/* SCROLL REVEAL */
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* SKILL BARS */
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.skill-bar').forEach(b=>b.style.width=b.dataset.width+'%');skillObs.unobserve(e.target);}});
},{threshold:.3});
const sg=document.querySelector('.skills-grid');
if(sg)skillObs.observe(sg);

/* COUNTER */
function animCount(el,target){
  const dur=target>100?2000:900;
  const start=performance.now();
  (function step(now){
    const t=Math.min((now-start)/dur,1);
    const ease=1-Math.pow(1-t,3);
    el.textContent=Math.round(ease*target);
    if(t<1)requestAnimationFrame(step);
  })(start);
}
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.stat-num').forEach(n=>animCount(n,+n.dataset.target));cObs.unobserve(e.target);}});
},{threshold:.4});
const sb=document.querySelector('.stats-bar');
if(sb)cObs.observe(sb);

/* EXPAND */
function openExpand(img,title,desc){document.getElementById('expand-img').src=img;document.getElementById('expand-title').textContent=title;document.getElementById('expand-desc').textContent=desc;document.getElementById('expand-view').classList.add('open');}
function closeExpand(){document.getElementById('expand-view').classList.remove('open');}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeExpand();});