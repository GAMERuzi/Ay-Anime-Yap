const voices = [];
for(let i=1;i<=50;i++){
  const gender = i<=25?'kiz':'erkek';
  voices.push({name:`${gender==='kiz'?'Kız':'Erkek'} Ses ${i}`, file:`assets/voices/${gender}${i}.mp3`});
}

window.addEventListener('DOMContentLoaded', ()=>{
  const select = document.getElementById('voiceSelect');
  voices.forEach(v=>{
    const o = document.createElement('option');
    o.value = v.file;
    o.textContent = v.name;
    select.appendChild(o);
  });
  document.getElementById('generateBtn').onclick = generateAnime;
});

function generateAnime(){
  const dur = document.getElementById('duration').value;
  const ev = document.getElementById('events').value.trim();
  const imgs = document.getElementById('images').files;
  const voiceFile = document.getElementById('voiceSelect').value;

  let missing = [];
  if(!dur) missing.push('Süre');
  if(!ev) missing.push('Olaylar');
  if(imgs.length===0) missing.push('Karakter resmi');
  if(!voiceFile) missing.push('Ses seçimi');
  if(missing.length){
    alert('Eksik alanlar:\n' + missing.join('\n'));
    return;
  }

  // Önizleme
  document.getElementById('form-section').classList.add('hidden');
  const preview = document.getElementById('preview-area');
  preview.innerHTML = `<p><em>${dur} dk</em> boyunca <strong>${imgs.length} karakter</strong> ve "<strong>${ev}</strong>" olayını oynatıyor...</p>`;
  document.getElementById('preview-section').classList.remove('hidden');

  const audio = new Audio(voiceFile);
  audio.play();
}
