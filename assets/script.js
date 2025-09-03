document.getElementById('y').textContent = new Date().getFullYear();
document.getElementById('themeBtn').addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');
  document.getElementById('themeBtn').setAttribute('aria-pressed', String(isLight));
  if(isLight){
    document.documentElement.style.setProperty('--bg','#f7f8fb');
    document.documentElement.style.setProperty('--panel','#ffffff');
    document.documentElement.style.setProperty('--txt','#0e1116');
    document.documentElement.style.setProperty('--muted','#445063');
    document.documentElement.style.setProperty('--card','#ffffff');
  } else {
    document.documentElement.style.setProperty('--bg','#0e1116');
    document.documentElement.style.setProperty('--panel','#151a23');
    document.documentElement.style.setProperty('--txt','#e7e9ee');
    document.documentElement.style.setProperty('--muted','#a6adbb');
    document.documentElement.style.setProperty('--card','#111826');
  }
});
