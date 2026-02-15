const button = document.getElementById('btn');
const paragraph = document.getElementById('text');

button.addEventListener('click', () => {
  paragraph.textContent = 'Clicked!';
});
