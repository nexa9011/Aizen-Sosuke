// View counter (uses localStorage as a simple 'view' store)
const countEl = document.getElementById('count');
const key = 'aizen_views_v1';

// increase only once per browser instance (can be adapted to server-side)
let views = parseInt(localStorage.getItem(key) || '0', 10);
views += 1;
localStorage.setItem(key, views);
countEl.textContent = views.toLocaleString();

// simple animation: pulse when incremented
countEl.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], {
  duration: 650,
  easing: 'cubic-bezier(.2,.8,.2,1)'
});

// audio autoplay attempt (many browsers require user gesture)
const audio = document.getElementById('bgmusic');

function tryPlayAudio(){
  audio.volume = 0.12;
  audio.play().catch(e=>{
    // If autoplay blocked, show a small toast to user to click to enable audio
    showAudioPrompt();
  });
}

function showAudioPrompt(){
  if(document.getElementById('audioPrompt')) return;
  const btn = document.createElement('button');
  btn.id = 'audioPrompt';
  btn.innerText = 'Enable music';
  btn.style.position='fixed';
  btn.style.left='50%';
  btn.style.bottom='24px';
  btn.style.transform='translateX(-50%)';
  btn.style.padding='10px 18px';
  btn.style.borderRadius='999px';
  btn.style.border='none';
  btn.style.background='linear-gradient(90deg, rgba(160,120,255,0.95), rgba(120,200,255,0.9))';
  btn.style.color='#04111b';
  btn.style.fontWeight='700';
  btn.style.zIndex='30';
  btn.onclick = () => { audio.play(); btn.remove(); };
  document.body.appendChild(btn);
}

// Give it a try
tryPlayAudio();

// center name accessible glitch layering
const name = document.querySelector('.name');
if(name){
  name.setAttribute('data-text', name.textContent);
}

// small mouse parallax
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  document.querySelector('.bg').style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
  document.querySelector('.fog').style.transform = `translate(${x * -0.6}px, ${y * -0.6}px)`;
});

// accessibility: let users press m to toggle music
document.addEventListener('keydown', (e) => {
  if(e.key.toLowerCase() === 'm'){
    if(audio.paused) audio.play(); else audio.pause();
  }
});
