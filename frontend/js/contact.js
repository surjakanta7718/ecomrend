
document.getElementById('f').onsubmit = async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const res = await fetch('/api/contact', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ name: fd.get('name'), email: fd.get('email'), message: fd.get('message') })
  });
  const j = await res.json();
  if (j.ok) alert('Message sent');
  else alert('Error');
}